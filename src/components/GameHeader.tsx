
import React from 'react';
import { Card } from '@/components/ui/card';
import { GameState } from '@/lib/gameTypes';
import { Clock, Zap, Wrench } from 'lucide-react';

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

      <div className="flex justify-center gap-6 flex-wrap">
        <Card className="p-4 bg-gradient-to-r from-steampunk-bronze to-steampunk-copper border-steampunk-brass border-2 shadow-lg">
          <div className="flex items-center gap-2 text-steampunk-steam">
            <Clock size={24} className="text-steampunk-gold" />
            <div>
              <div className="text-sm opacity-75">Manche</div>
              <div className="text-2xl font-bold animate-nixie-glow">
                {gameState.currentRound} / {gameState.maxRounds}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-steampunk-bronze to-steampunk-copper border-steampunk-brass border-2 shadow-lg">
          <div className="flex items-center gap-2 text-steampunk-steam">
            <Zap size={24} className="text-steampunk-gold" />
            <div>
              <div className="text-sm opacity-75">Analyses</div>
              <div className="text-2xl font-bold animate-nixie-glow">
                {gameState.testsThisRound} / {gameState.maxTestsPerRound}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-steampunk-bronze to-steampunk-copper border-steampunk-brass border-2 shadow-lg">
          <div className="flex items-center gap-2 text-steampunk-steam">
            <Wrench size={24} className="text-steampunk-gold" />
            <div>
              <div className="text-sm opacity-75">Schéma Actuel</div>
              <div className="text-xl font-bold animate-nixie-glow">
                {gameState.currentTest.saphir}-{gameState.currentTest.topaze}-{gameState.currentTest.amethyst}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
