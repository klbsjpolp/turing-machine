import React from 'react';
import { GameState } from '@/lib/gameTypes';
import { Clock, Zap, Wrench } from 'lucide-react';
import { SequenceDisplay } from './SequenceDisplay';

interface GameHeaderProps {
  gameState: GameState;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold text-steampunk-gold mb-4 animate-nixie-glow">
        ⚙️ AUTOMATE DE DÉDUCTION ⚙️
      </h1>
      <p className="text-xl text-steampunk-steam mb-6 opacity-90">
        Déchiffrez la Combinaison Maîtresse de cette Merveille Mécanique
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <div className="paper-panel p-3">
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

        <div className="paper-panel p-3">
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
