import React from 'react';
import { GameState, CriteriaCard } from '@/lib/gameTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import { SequenceDisplay } from './SequenceDisplay';

interface TestHistoryProps {
  history: GameState['testHistory'];
  criteriaCards: CriteriaCard[];
}

export const TestHistory: React.FC<TestHistoryProps> = ({ history, criteriaCards }) => {
  const getCardName = (cardId: string) =>
    criteriaCards.find(card => card.id === cardId)?.name || cardId.replace(/_/g, ' ');

  return (
    <div className="paper-panel h-full flex flex-col">
      <div className="paper-panel-title">
        Journal de bord
      </div>

      <ScrollArea className="h-96 flex-grow pr-3">
        {history.length === 0 ? (
          <div className="opacity-60 text-center py-8">
            <p className="text-lg">Aucune analyse effectuée.</p>
            <p className="text-sm mt-2">Sélectionnez une carte et lancez votre première analyse</p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((entry, index) => (
              <div
                key={index}
                className="history-entry animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">
                    Manche {entry.round}
                  </span>
                  <div className="flex items-center gap-1">
                    {entry.result === 'success' ? (
                      <CheckCircle className="text-green-700" size={16} />
                    ) : (
                      <XCircle className="text-red-700" size={16} />
                    )}
                    <span className={`text-sm font-bold ${entry.result === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                      {entry.result === 'success' ? 'SUCCÈS' : 'ÉCHEC'}
                    </span>
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="mb-1 flex items-center">
                    <span className="opacity-75 mr-2">Schéma testé:</span>
                    <span className="font-bold">
                      <SequenceDisplay 
                        saphir={entry.test.saphir}
                        topaze={entry.test.topaze}
                        amethyst={entry.test.amethyst}
                        className="text-base"
                      />
                    </span>
                  </div>
                  <div>
                    <span className="opacity-75">Carte:</span>
                    <span className="ml-2 font-semibold">
                      {getCardName(entry.cardId)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {history.length > 0 && (
        <div className="mt-4 p-3 bg-linear-to-r from-steampunk-brass/20 to-steampunk-gold/20 rounded border border-steampunk-gold/50">
          <div className="text-steampunk-blue text-sm text-center">
            <span className="font-bold">{history.length}</span> analyse{history.length > 1 ? 's' : ''} effectuée{history.length > 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
};
