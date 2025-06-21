
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameState, Combination, Digit, Color } from '@/lib/gameTypes';
import { initializeGame, performTest, nextRound, submitSolution, abandonGame } from '@/lib/gameLogic';
import { ColorPanel } from './ColorPanel';
import { CriteriaCardComponent } from './CriteriaCard';
import { GameHeader } from './GameHeader';
import { TestHistory } from './TestHistory';
import { SteamBackground } from './SteamBackground';
import { Cog, Zap, Settings } from 'lucide-react';

export const TuringMachine: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame());
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [leverAnimating, setLeverAnimating] = useState(false);
  const [solutionMode, setSolutionMode] = useState(false);

  const handleDigitSelect = (color: Color, digit: Digit) => {
    setGameState(prev => ({
      ...prev,
      currentTest: {
        ...prev.currentTest,
        [color]: digit
      }
    }));
  };

  const handleTestAnalyze = () => {
    if (!selectedCard || gameState.testsThisRound >= gameState.maxTestsPerRound) {
      return;
    }

    setLeverAnimating(true);
    
    // Play sound effect (simulated)
    console.log('🔧 CLANK! Mechanical lever engaged...');
    
    setTimeout(() => {
      const newGameState = performTest(gameState, {
        combination: gameState.currentTest,
        cardId: selectedCard
      });
      setGameState(newGameState);
      setLeverAnimating(false);
      
      // Play result sound
      const card = newGameState.criteriaCards.find(c => c.id === selectedCard);
      if (card?.testResult === 'success') {
        console.log('✅ DING! Analysis successful!');
      } else {
        console.log('❌ BUZZ! Analysis failed!');
      }
    }, 800);
  };

  const handleNextRound = () => {
    console.log('🔄 CLICK! Round completed...');
    setGameState(nextRound(gameState));
  };

  const handleSubmitSolution = () => {
    console.log('🎯 WHOOSH! Solution submitted...');
    const newGameState = submitSolution(gameState, gameState.currentTest);
    setGameState(newGameState);
    setSolutionMode(false);
  };

  const handleNewGame = () => {
    console.log('🔄 STEAM HISS! New puzzle generating...');
    setGameState(initializeGame());
    setSelectedCard(null);
    setSolutionMode(false);
  };

  const handleAbandon = () => {
    console.log('🚨 EMERGENCY STOP! Revealing solution...');
    setGameState(abandonGame(gameState));
  };

  const canTest = selectedCard && gameState.testsThisRound < gameState.maxTestsPerRound && gameState.gameStatus === 'playing';
  const canNextRound = gameState.testsThisRound > 0 && gameState.gameStatus === 'playing';

  return (
    <div className="min-h-screen bg-gradient-to-b from-steampunk-coal to-steampunk-darkBronze relative overflow-hidden">
      <SteamBackground />
      
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

      <div className="container mx-auto px-4 py-6 relative z-10">
        <GameHeader gameState={gameState} />

        {gameState.gameStatus === 'playing' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
            {/* Left Panel - Controls */}
            <div className="xl:col-span-1 space-y-6">
              <Card className="p-6 bg-gradient-to-br from-steampunk-bronze to-steampunk-darkBronze border-steampunk-copper border-2 shadow-2xl">
                <h2 className="text-2xl font-bold text-steampunk-steam mb-6 text-center">
                  Console de Commande
                </h2>
                
                {/* Color Panels */}
                <div className="space-y-4">
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

                {/* Control Buttons */}
                <div className="mt-8 space-y-4">
                  <Button
                    onClick={handleTestAnalyze}
                    disabled={!canTest || leverAnimating}
                    className={`w-full h-16 text-lg font-bold bg-gradient-to-r from-steampunk-brass to-steampunk-gold text-steampunk-coal border-2 border-steampunk-copper hover:shadow-lg transition-all duration-300 ${
                      leverAnimating ? 'animate-lever-pull' : ''
                    } ${canTest ? 'hover:scale-105' : ''}`}
                  >
                    <Zap className="mr-2" size={24} />
                    {leverAnimating ? 'Analyse en cours...' : 'Lancer l\'Analyse'}
                  </Button>

                  <Button
                    onClick={handleNextRound}
                    disabled={!canNextRound}
                    className="w-full h-12 bg-steampunk-copper text-steampunk-steam hover:bg-steampunk-bronze transition-all duration-300 hover:scale-105"
                  >
                    Terminer la Manche
                  </Button>

                  <Button
                    onClick={() => setSolutionMode(true)}
                    className="w-full h-12 bg-gradient-to-r from-steampunk-saphir to-steampunk-amethyst text-steampunk-steam hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Proposer la Solution
                  </Button>

                  <Button
                    onClick={handleAbandon}
                    variant="destructive"
                    className="w-full h-10 bg-red-800 hover:bg-red-700 transition-all duration-300"
                  >
                    Arrêt d'Urgence
                  </Button>
                </div>
              </Card>
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
                  isSelected={selectedCard === card.id}
                  onSelect={() => setSelectedCard(card.id)}
                />
              ))}
            </div>

            {/* Right Panel - History and Info */}
            <div className="xl:col-span-1">
              <TestHistory history={gameState.testHistory} />
            </div>
          </div>
        )}

        {/* Game Over States */}
        {gameState.gameStatus !== 'playing' && (
          <div className="mt-8 text-center">
            <Card className="p-8 bg-gradient-to-br from-steampunk-bronze to-steampunk-darkBronze border-steampunk-copper border-2 shadow-2xl max-w-md mx-auto">
              {gameState.gameStatus === 'won' && (
                <div className="text-steampunk-steam">
                  <h2 className="text-3xl font-bold mb-4 text-steampunk-gold animate-nixie-glow">
                    🏆 VICTOIRE! 🏆
                  </h2>
                  <p className="text-lg mb-6">
                    Félicitations, Maître-Machiniste! Vous avez déchiffré l'Automate de Déduction!
                  </p>
                  <p className="mb-6">
                    Combinaison Maîtresse: {gameState.masterCombination.saphir}-{gameState.masterCombination.topaze}-{gameState.masterCombination.amethyst}
                  </p>
                </div>
              )}

              {gameState.gameStatus === 'lost' && (
                <div className="text-steampunk-steam">
                  <h2 className="text-3xl font-bold mb-4 text-red-400">
                    ⚡ SURCHARGE! ⚡
                  </h2>
                  <p className="text-lg mb-6">
                    L'Automate s'est protégé. La solution était:
                  </p>
                  <p className="text-xl font-bold mb-6 text-steampunk-gold">
                    {gameState.masterCombination.saphir}-{gameState.masterCombination.topaze}-{gameState.masterCombination.amethyst}
                  </p>
                </div>
              )}

              {gameState.gameStatus === 'abandoned' && (
                <div className="text-steampunk-steam">
                  <h2 className="text-3xl font-bold mb-4 text-orange-400">
                    🚨 ARRÊT D'URGENCE 🚨
                  </h2>
                  <p className="text-lg mb-6">
                    Solution révélée:
                  </p>
                  <p className="text-xl font-bold mb-6 text-steampunk-gold">
                    {gameState.masterCombination.saphir}-{gameState.masterCombination.topaze}-{gameState.masterCombination.amethyst}
                  </p>
                </div>
              )}

              <Button
                onClick={handleNewGame}
                className="w-full h-12 bg-gradient-to-r from-steampunk-brass to-steampunk-gold text-steampunk-coal hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Settings className="mr-2" />
                Nouveau Casse-Tête
              </Button>
            </Card>
          </div>
        )}

        {/* Solution Mode Modal */}
        {solutionMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="p-8 bg-gradient-to-br from-steampunk-bronze to-steampunk-darkBronze border-steampunk-copper border-2 shadow-2xl max-w-md mx-4">
              <h2 className="text-2xl font-bold text-steampunk-steam mb-6 text-center">
                Proposer la Combinaison Maîtresse
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
                  className="flex-1 bg-gradient-to-r from-steampunk-saphir to-steampunk-amethyst text-steampunk-steam hover:shadow-lg transition-all duration-300"
                >
                  Valider
                </Button>
                <Button
                  onClick={() => setSolutionMode(false)}
                  variant="outline"
                  className="flex-1 border-steampunk-copper text-steampunk-steam hover:bg-steampunk-copper"
                >
                  Annuler
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
