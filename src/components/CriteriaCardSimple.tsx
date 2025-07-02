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
    <div className='punch-card'>
      <div className="punch-card-header">
        <h3 className="font-bold truncate">
          {formatRuleWithColors(card.name)}
        </h3>
        <div className="punch-card-result">
          {card.successRule}
        </div>
      </div>

      <div className="punch-card-body">
        <div className="punch-row">
          <span>A:</span>
          <p className={`inline ${card.successRule == 'A' ? '' : 'line-through'}`}>
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
          <p className={`inline ${card.successRule == 'B' ? '' : 'line-through'}`}>
            {formatRuleWithColors(card.ruleB)}
          </p>
        </div>
      </div>
    </div>
  );
};
