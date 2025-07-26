import React from 'react';
import { GameState, CriteriaCard, Combination, TestResult } from '@/lib/gameTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle } from 'lucide-react';
import { SequenceDisplay } from './SequenceDisplay';
import {formatRuleWithColors} from "@/lib/formatRules.tsx";

interface TestHistoryProps {
  history: GameState['testHistory'];
  criteriaCards: CriteriaCard[];
}

type NormalRound = {round: number, test: Combination, cards: {cardId: string, result: TestResult}[]};
type FailedSolutionRound = {round: number, test: Combination};
type Round = NormalRound | FailedSolutionRound;
//type guard for NormalRound
function isNormalRound(round: Round): round is NormalRound {
  return 'cards' in round;
}

export const TestHistory: React.FC<TestHistoryProps> = ({ history, criteriaCards }) => {
  // Regrouper les essais par round
  // Extract failed solutions from history
  history.filter(entry => entry.cardId === 'failed_solution');
// Process regular test entries
  const rounds = history
    .reduce((acc, entry) => {
      if (entry.cardId === 'failed_solution')
          acc.push({round: entry.round + 0.5, test: entry.test} as FailedSolutionRound);
      else {
        let round = acc.filter(isNormalRound).find(r => r.round === entry.round);
        if (!round) {
          acc.push(round = {round: entry.round, test: entry.test, cards: []});
        }
        round.cards.push({cardId: entry.cardId, result: entry.result});
      }
      return acc;
    }, [] as Round[])
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
            {/* Regular Test History Grid */}
            <div className="test-history-grid" style={{ gridTemplateColumns: `min-content repeat(${cardIds.length}, 1fr)` }}>
              <div className="test-history-corner"></div>
              {cardIds.map(cardId => (
                <div key={cardId} className="test-history-card-header">
                  <span className="vertical-text">{formatRuleWithColors(getCardName(cardId))}</span>
                </div>
              ))}
              {rounds.map((round) => {
                if (isNormalRound(round))
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
                else
                  return (
                    <React.Fragment key={round.round}>
                      <div className="test-history-round-label failed-solution">
                        <SequenceDisplay saphir={round.test.saphir} topaze={round.test.topaze} amethyst={round.test.amethyst} />
                      </div>
                      <div className="test-history-failed-solution-row">
                        <span className="text-red-700">Solution incorrecte</span>
                      </div>
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
