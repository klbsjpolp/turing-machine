import React from 'react';
import { CriteriaCard } from '@/lib/gameTypes';
import { CheckCircle, XCircle, Circle, GitCommitHorizontal } from 'lucide-react';
import { formatRuleWithColors } from '@/lib/formatRules';

interface CriteriaCardComponentProps {
  card: CriteriaCard;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

export const CriteriaCardComponent: React.FC<CriteriaCardComponentProps> = ({
  card,
  isAnalyzing,
  onAnalyze,
}) => {
  const getResultIcon = () => {
    if (card.testResult === 'success') {
      return <CheckCircle className="text-green-800" size={24} />;
    } else if (card.testResult === 'failure') {
      return <XCircle className="text-red-800" size={24} />;
    } else {
      return <Circle className="text-amber-900 opacity-50" size={24} />;
    }
  };

  const used = card.testResult !== null;

  return (
    <div className="punch-card-container">
      <div
        onClick={onAnalyze}
        className={`punch-card ${isAnalyzing ? 'analyzing' : ''} ${used ? 'used' : ''}`}
      >
        <div className="punch-card-header">
          <h3 className="font-bold truncate">
            {formatRuleWithColors(card.name)}
          </h3>
          <div className="punch-card-result">
            {getResultIcon()}
          </div>
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

        <div className="punch-card-footer">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>
      </div>
    </div>
  );
};
