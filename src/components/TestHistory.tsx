import React from 'react';
import { GameState, CriteriaCard, Combination, TestResult } from '@/lib/gameTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle } from 'lucide-react';
import { SequenceDisplay } from './SequenceDisplay';

interface TestHistoryProps {
  history: GameState['testHistory'];
  criteriaCards: CriteriaCard[];
}

export const TestHistory: React.FC<TestHistoryProps> = ({ history, criteriaCards }) => {
  // Regrouper les essais par round
  type HistoryEntry = {
    round: number;
    test: Combination;
    cardId: string;
    result: TestResult;
    cardResults?: Record<string, TestResult | boolean>;
    cards?: Record<string, TestResult | boolean>;
    combination?: Combination;
    combinaison?: Combination;
    sequence?: Combination;
    input?: Combination;
    try?: Combination;
    values?: Combination;
  };
  const rounds = history.reduce((acc, entry) => {
      let round = acc.find(r => r.round === entry.round);
      if (!round) {
          acc.push(round = {round: entry.round, test: entry.test, cards: []});
      }
      round.cards.push({cardId: entry.cardId, result: entry.result});
      return acc;
  }, [] as {round: number, test: Combination, cards: {cardId: string, result: TestResult}[]}[])
      .sort((a, b) => a.round - b.round);
  // Liste des IDs de cartes dans l'ordre d'affichage
  const cardIds = criteriaCards.map(card => card.id);
  // Afficher le nom de la carte
  const getCardName = (cardId: string) =>
    criteriaCards.find(card => card.id === cardId)?.name || cardId.replace(/_/g, ' ');

  return (
    <div className="paper-panel h-full flex flex-col">
      <div className="paper-panel-title">Journal de bord</div>
      <ScrollArea className="h-96 flex-grow pr-3">
        {history.length === 0 ? (
          <div className="opacity-60 text-center py-8">
            <p className="text-lg">Aucune analyse effectuée.</p>
            <p className="text-sm mt-2">Sélectionnez une carte et lancez votre première analyse</p>
          </div>
        ) : (
          <div className="test-history-grid-container">
            <div className="test-history-grid" style={{ gridTemplateColumns: `min-content repeat(${cardIds.length}, 1fr)` }}>
              <div className="test-history-corner"></div>
              {cardIds.map(cardId => (
                <div key={cardId} className="test-history-card-header">
                  <span className="vertical-text">{getCardName(cardId)}</span>
                </div>
              ))}
              {rounds.map((round) => {
                return (
                  <React.Fragment key={round.round}>
                    <div className="test-history-round-label">
                      <SequenceDisplay saphir={round.test.saphir} topaze={round.test.topaze} amethyst={round.test.amethyst} />
                    </div>
                    {cardIds.map(cardId => {
                      const result= round.cards.find(card => card.cardId === cardId)?.result;
                      return (
                        <div key={cardId} className="test-history-cell">
                          {result === 'success' ? (
                            <CheckCircle className="text-green-700" size={22} />
                          ) : (result === 'failure') ? (
                            <XCircle className="text-red-700" size={22} />
                          ) : null}
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
