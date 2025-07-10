import React from 'react';
import {Difficulty, GameState} from '@/lib/gameTypes';
import {Clock, Zap, Wrench, Star} from 'lucide-react';
import { SequenceDisplay } from './SequenceDisplay';

interface GameHeaderProps {
  gameState: GameState;
}

function getFillHeight(numerator: number, denominator: number): string {
  if (numerator === 0) return '0';
  if (numerator === denominator) return '100%';
  const percentage = Math.round((numerator / denominator) * 100);
  return `${percentage}%`;
}

function getDifficultyDisplay(difficulty: Difficulty) {
  switch (difficulty) {
    case 'easy': return 'Facile';
    case 'medium': return 'Moyen';
    case 'hard': return 'Difficile';
    case 'expert': return 'Expert';
  }
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold text-steampunk-gold mb-4">
        ⚙️ AUTOMATE DE DÉDUCTION ⚙️
      </h1>
      <p className="text-xl text-steampunk-steam mb-6 opacity-90">
        Déchiffrez la Combinaison Maîtresse de cette Merveille Mécanique
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <div className="paper-panel p-3 relative">
          <div className="flex items-center gap-3">
            <Star size={28} className="text-amber-900/70" />
            <div>
              <div className="text-sm opacity-75 font-semibold">Code de casse-tête</div>
              <div className="text-xl font-bold">
                {gameState.serialization}
              </div>
            </div>
          </div>
        </div>
        <div className="paper-panel p-3 relative">
          <div className="absolute bottom-0 right-0 w-full bg-steampunk-copper/30" style={{height: getFillHeight(gameState.difficultyScore, 100)}}></div>
          <div className="flex items-center gap-3">
            <Star size={28} className="text-amber-900/70" />
            <div>
              <div className="text-sm opacity-75 font-semibold">Difficulté</div>
              <div className="text-xl font-bold">
                {getDifficultyDisplay(gameState.difficulty)}
              </div>
            </div>
          </div>
        </div>
        <div className="paper-panel p-3 relative">
          <div className="absolute bottom-0 right-0 w-full bg-steampunk-copper/30" style={{height: getFillHeight(gameState.currentRound, gameState.maxRounds)}}></div>
          <div className="flex items-center gap-3">
            <Clock size={28} className="text-amber-900/70" />
            <div>
              <div className="text-sm opacity-75 font-semibold">Manche</div>
              <div className="text-2xl font-bold">
                {gameState.currentRound} / {gameState.maxRounds}
              </div>
            </div>
          </div>
        </div>

        <div className="paper-panel p-3 relative">
          <div className="absolute bottom-0 right-0 w-full bg-steampunk-copper/30" style={{height: getFillHeight(gameState.testsThisRound, gameState.maxTestsPerRound)}}></div>
          <div className="flex items-center gap-3">
            <Zap size={28} className="text-amber-900/70" />
            <div>
              <div className="text-sm opacity-75 font-semibold">Analyses</div>
              <div className="text-2xl font-bold">
                {gameState.testsThisRound} / {gameState.maxTestsPerRound}
              </div>
            </div>
          </div>
        </div>
        <div className="paper-panel p-3">
          <div className="flex items-center gap-3">
            <Wrench size={28} className="text-amber-900/70" />
            <div>
              <div className="text-sm opacity-75 font-semibold">Schéma Actuel</div>
              <div className="text-xl">
                <SequenceDisplay
                  saphir={gameState.currentTest.saphir}
                  topaze={gameState.currentTest.topaze}
                  amethyst={gameState.currentTest.amethyst}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
