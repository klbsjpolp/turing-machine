import React from 'react';
import { CriteriaCard } from '@/lib/gameTypes';
import { GitCommitHorizontal } from 'lucide-react';
import { formatRuleWithColors } from '@/lib/formatRules';

interface CriteriaCardSimpleComponentProps {
  card: CriteriaCard;
}

export const CriteriaCardSimpleComponent: React.FC<CriteriaCardSimpleComponentProps> = ({
  card,
}) => {
  return (
    <div className="punch-card-container">
      <div className="punch-card-backdrop-walls" />
      <div className="punch-card-backdrop-back" />
      <div className="punch-card-overflow-handler">
        <div
          className={'punch-card'}
        >
          <div className="punch-card-header">
            <h3 className="font-bold truncate">
              {formatRuleWithColors(card.name)}
            </h3>
          </div>

          <div className="punch-card-body">
            <div className="punch-row">
              <span>A:</span>
              <p className="inline">
                {formatRuleWithColors(card.ruleA)}
              </p>
            </div>

            <div className="punch-divider">
              <GitCommitHorizontal size={16} className="opacity-50" />
              <span>OU</span>
              <GitCommitHorizontal size={16} className="opacity-50" />
            </div>

            <div className="punch-row">
              <span>B:</span>
              <p className="inline">
                {formatRuleWithColors(card.ruleB)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
