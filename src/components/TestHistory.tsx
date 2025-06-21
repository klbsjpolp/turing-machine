
import React from 'react';
import { Card } from '@/components/ui/card';
import { GameState } from '@/lib/gameTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle, FileText } from 'lucide-react';

interface TestHistoryProps {
  history: GameState['testHistory'];
}

export const TestHistory: React.FC<TestHistoryProps> = ({ history }) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-steampunk-bronze to-steampunk-darkBronze border-steampunk-copper border-2 shadow-2xl h-full">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-steampunk-gold" size={24} />
        <h2 className="text-2xl font-bold text-steampunk-steam">
          Journal de Bord
        </h2>
      </div>

      <ScrollArea className="h-96">
        {history.length === 0 ? (
          <div className="text-steampunk-steam opacity-60 text-center py-8">
            <p className="text-lg">Aucune analyse effectuée</p>
            <p className="text-sm mt-2">Sélectionnez une carte et lancez votre première analyse</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((entry, index) => (
              <div
                key={index}
                className="p-3 bg-black bg-opacity-30 rounded border border-steampunk-copper border-opacity-50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-steampunk-gold font-bold">
                    Manche {entry.round}
                  </span>
                  <div className="flex items-center gap-1">
                    {entry.result === 'success' ? (
                      <CheckCircle className="text-green-400 animate-nixie-glow" size={16} />
                    ) : (
                      <XCircle className="text-red-400 animate-nixie-glow" size={16} />
                    )}
                    <span className={`text-sm ${entry.result === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {entry.result === 'success' ? 'SUCCÈS' : 'ÉCHEC'}
                    </span>
                  </div>
                </div>
                
                <div className="text-steampunk-steam text-sm">
                  <div className="mb-1">
                    <span className="opacity-75">Schéma testé:</span>
                    <span className="font-mono ml-2 text-steampunk-gold">
                      {entry.test.saphir}-{entry.test.topaze}-{entry.test.amethyst}
                    </span>
                  </div>
                  <div>
                    <span className="opacity-75">Carte:</span>
                    <span className="ml-2 text-steampunk-brass">
                      {entry.cardId.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {history.length > 0 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-steampunk-brass to-steampunk-gold bg-opacity-20 rounded border border-steampunk-gold border-opacity-50">
          <div className="text-steampunk-steam text-sm text-center">
            <span className="font-bold">{history.length}</span> analyse{history.length > 1 ? 's' : ''} effectuée{history.length > 1 ? 's' : ''}
          </div>
        </div>
      )}
    </Card>
  );
};
