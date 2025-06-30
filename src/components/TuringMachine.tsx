import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GameState, Digit, Color } from '@/lib/gameTypes';
import { initializeGame, performTest, nextRound, submitSolution, abandonGame, checkSolution } from '@/lib/gameLogic';
import { ColorPanel } from './ColorPanel';
import { CriteriaCardComponent } from './CriteriaCard';
import { GameHeader } from './GameHeader';
import { TestHistory } from './TestHistory';
import { SteamBackground } from './SteamBackground';
import { LightingOverlay, LightingEffect } from './LightingOverlay';
import { Cog, Settings } from 'lucide-react';
import {CriteriaCardSimpleComponent} from "@/components/CriteriaCardSimple.tsx";

export const TuringMachine: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame());
  const [analyzingCardId, setAnalyzingCardId] = useState<string | null>(null);
  const [solutionMode, setSolutionMode] = useState(false);
  const [lightingEffect, setLightingEffect] = useState<LightingEffect>('default');

  const triggerLightingEffect = (effect: LightingEffect, duration: number | null = 1000) => {
    setLightingEffect(effect);
    if (duration) {
      setTimeout(() => setLightingEffect('default'), duration);
    }
  };

  const handleDigitSelect = (color: Color, digit: Digit) => {
    // Don't allow changing the combination if it's locked
    if (gameState.combinationLocked) {
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      currentTest: {
        ...prev.currentTest,
        [color]: digit
      }
    }));
  };

  const handleCardAnalyze = (cardId: string) => {
    if (analyzingCardId || gameState.testsThisRound >= gameState.maxTestsPerRound) {
      return;
    }

    setAnalyzingCardId(cardId);
    console.log(`🔧 PUNCH! Inserting card ${cardId} for analysis...`);

    setTimeout(() => {
      const newGameState = performTest(gameState, {
        combination: gameState.currentTest,
        cardId: cardId,
      });
      setGameState(newGameState);

      const card = newGameState.criteriaCards.find((c) => c.id === cardId);
      if (card?.testResult === 'success') {
        console.log('✅ DING! Analysis successful!');
        triggerLightingEffect('success');
      } else {
        console.log('❌ BUZZ! Analysis failed!');
        triggerLightingEffect('failure');
      }
    }, 1000); // Corresponds to half animation duration
    setTimeout(() => {
      setAnalyzingCardId(null);
    }, 2000); // Corresponds to animation duration
  };

  const handleNextRound = () => {
    console.log('🔄 CLICK! Round completed...');
    setGameState(nextRound(gameState));
    triggerLightingEffect('next_round', 1500);
  };

  const handleSubmitSolution = () => {
    console.log(' WHOOSH! Solution submitted...');

    if (!checkSolution(gameState, gameState.currentTest)) {
      triggerLightingEffect('failure');
    }

    const newGameState = submitSolution(gameState, gameState.currentTest);
    setGameState(newGameState);
    setSolutionMode(false);
  };

  const handleNewGame = () => {
    console.log(' STEAM HISS! New puzzle generating...');
    setGameState(initializeGame());
    setAnalyzingCardId(null);
    setSolutionMode(false);
    setLightingEffect('default');
  };

  const handleAbandon = () => {
    console.log(' EMERGENCY STOP! Revealing solution...');
    setGameState(abandonGame(gameState));
    setLightingEffect('abandoned');
  };

  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      triggerLightingEffect('victory', 2500);
    } else if (gameState.gameStatus === 'lost') {
      setLightingEffect('defeat');
    }
  }, [gameState.gameStatus]);

  const canNextRound = gameState.testsThisRound > 0 && gameState.gameStatus === 'playing';

  return (
    <div className="min-h-screen bg-linear-to-b from-steampunk-coal to-steampunk-dark-bronze relative overflow-hidden">
      <SteamBackground />
      <LightingOverlay effect={lightingEffect} />
      
      {/* Decorative gears */}
      <div className="absolute top-4 left-4 text-steampunk-bronze animate-gear-rotate">
        <Cog size={32} />
      </div>
      <div className="absolute top-4 right-4 text-steampunk-copper animate-gear-rotate" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
        <Cog size={28} />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-steampunk-brass animate-gear-rotate" style={{ animationDuration: '25s' }}>
        <Cog size={24} />
      </div>

      <div className="relative p-6 border-8 border-double rounded-md shadow-inner shadow-black/50 bg-steampunk-coal bg-opacity-50 border-steampunk-bronze">
        {/* Decorative Rivets */}
        <div className="rivet top-2 left-2"></div>
        <div className="rivet top-2 right-2"></div>
        <div className="rivet bottom-2 left-2"></div>
        <div className="rivet bottom-2 right-2"></div>
        <div className="rivet top-1/2 left-2 -translate-y-1/2"></div>
        <div className="rivet top-1/2 right-2 -translate-y-1/2"></div>

        <div className="decorative-pipe pipe-1"></div>
        <div className="decorative-pipe pipe-2"></div>
        <Cog className="gear absolute top-4 right-4" size={40} />
        <Cog className="gear absolute top-4 left-4" size={40} />

        <div className="container mx-auto px-4 py-6 relative z-10">
          <GameHeader gameState={gameState} />

          {gameState.gameStatus === 'playing' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
              {/* Left Panel - Controls */}
              <div className="xl:col-span-1 space-y-6">
                <div className="paper-panel">
                  <h2 className="paper-panel-title">
                    Console de commande
                  </h2>
                  
                  {/* Color Panels */}
                  <div className="space-y-4">
                    <ColorPanel
                      color="saphir"
                      selectedDigit={gameState.currentTest.saphir}
                      onDigitSelect={handleDigitSelect}
                      disabled={gameState.combinationLocked}
                    />
                    <ColorPanel
                      color="topaze"
                      selectedDigit={gameState.currentTest.topaze}
                      onDigitSelect={handleDigitSelect}
                      disabled={gameState.combinationLocked}
                    />
                    <ColorPanel
                      color="amethyst"
                      selectedDigit={gameState.currentTest.amethyst}
                      onDigitSelect={handleDigitSelect}
                      disabled={gameState.combinationLocked}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="mt-6 space-y-3 border-t-2 border-dashed border-amber-800/30 pt-4">
                    <Button
                      onClick={handleNextRound}
                      disabled={!canNextRound}
                      className="ink-button"
                    >
                      Terminer la manche
                    </Button>

                    <Button
                      onClick={() => setSolutionMode(true)}
                      className="ink-button"
                    >
                      Proposer la solution
                    </Button>

                    <Button
                      onClick={handleAbandon}
                      className="ink-button destructive mt-4"
                    >
                      Arrêt d'urgence
                    </Button>
                  </div>
                </div>
              </div>

              {/* Center Panel - Criteria Cards */}
              <div className="xl:col-span-1 space-y-4">
                <h2 className="text-2xl font-bold text-steampunk-steam text-center mb-6">
                  Cartes Critères
                </h2>
                
                {gameState.criteriaCards.map((card) => (
                  <CriteriaCardComponent
                    key={card.id}
                    card={card}
                    isAnalyzing={analyzingCardId === card.id}
                    onAnalyze={() => handleCardAnalyze(card.id)}
                  />
                ))}
              </div>

              {/* Right Panel - History and Info */}
              <div className="xl:col-span-1">
                <TestHistory history={gameState.testHistory} criteriaCards={gameState.criteriaCards} />
              </div>
            </div>
          )}

          {/* Game Over States */}
          {gameState.gameStatus !== 'playing' && (
            <>
              {gameState.gameStatus === 'abandoned' || gameState.gameStatus === 'won' ? (
                <div className="mt-8">
                  <div className="text-center mb-8 paper-panel">
                    {gameState.gameStatus === 'won' ? (
                      <>
                        <h2 className="text-3xl font-bold mb-4 text-green-800">
                          VICTOIRE!
                        </h2>
                        <p className="text-lg mb-2">
                          Félicitations! Vous avez déchiffré l'Automate.
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-3xl font-bold mb-4 text-orange-600">
                          ARRÊT D'URGENCE
                        </h2>
                        <p className="text-lg mb-2">
                          La solution, les vérificateurs et le journal sont révélés.
                        </p>
                      </>
                    )}
                    <div className="mt-4 inline-block bg-black/5 p-4 rounded-lg border border-amber-900/30">
                      <p className="text-lg">Combinaison maîtresse:</p>
                      <p className="text-2xl font-bold text-amber-900">
                        {gameState.masterCombination.saphir}-{gameState.masterCombination.topaze}-{gameState.masterCombination.amethyst}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-steampunk-steam text-center mb-6">
                        Cartes critères
                      </h2>
                      {gameState.criteriaCards.map((card) => (
                        <CriteriaCardSimpleComponent
                          key={card.id}
                          card={card}
                        />
                      ))}
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-steampunk-steam text-center mb-6">
                        Journal de bord
                      </h2>
                      <TestHistory history={gameState.testHistory} criteriaCards={gameState.criteriaCards} />
                    </div>
                  </div>

                  <div className="text-center mt-12">
                    <Button
                      onClick={handleNewGame}
                      className="ink-button w-auto px-8"
                    >
                      <Settings className="mr-2" />
                      Nouveau casse-tête
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center">
                  <div className="paper-panel max-w-lg mx-auto">
                    {gameState.gameStatus === 'lost' && (
                      <div>
                        <h2 className="text-3xl font-bold mb-4 text-red-800">
                          SURCHARGE!
                        </h2>
                        <p className="text-lg mb-6">
                          L'Automate s'est protégé. La solution était:
                        </p>
                        <p className="text-xl font-bold mb-6">
                          {gameState.masterCombination.saphir}-{gameState.masterCombination.topaze}-{gameState.masterCombination.amethyst}
                        </p>
                      </div>
                    )}

                    <Button
                      onClick={handleNewGame}
                      className="ink-button mt-4"
                    >
                      <Settings className="mr-2" />
                      Nouveau casse-tête
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Solution Mode Modal */}
          {solutionMode && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="paper-panel max-w-md mx-4">
                <h2 className="paper-panel-title">
                  Proposer la combinaison
                </h2>
                
                <div className="space-y-4 mb-6">
                  <ColorPanel
                    color="saphir"
                    selectedDigit={gameState.currentTest.saphir}
                    onDigitSelect={handleDigitSelect}
                  />
                  <ColorPanel
                    color="topaze"
                    selectedDigit={gameState.currentTest.topaze}
                    onDigitSelect={handleDigitSelect}
                  />
                  <ColorPanel
                    color="amethyst"
                    selectedDigit={gameState.currentTest.amethyst}
                    onDigitSelect={handleDigitSelect}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleSubmitSolution}
                    className="ink-button flex-1"
                  >
                    Valider
                  </Button>
                  <Button
                    onClick={() => setSolutionMode(false)}
                    className="ink-button flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
