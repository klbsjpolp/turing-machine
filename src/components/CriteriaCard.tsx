
import React from 'react';
import { Card } from '@/components/ui/card';
import { CriteriaCard } from '@/lib/gameTypes';
import { CheckCircle, XCircle, Circle } from 'lucide-react';

interface CriteriaCardComponentProps {
  card: CriteriaCard;
  isSelected: boolean;
  onSelect: () => void;
}

export const CriteriaCardComponent: React.FC<CriteriaCardComponentProps> = ({
  card,
  isSelected,
  onSelect
}) => {
  const getResultIcon = () => {
    if (card.testResult === 'success') {
      return <CheckCircle className="text-green-400 animate-nixie-glow" size={24} />;
    } else if (card.testResult === 'failure') {
      return <XCircle className="text-red-400 animate-nixie-glow" size={24} />;
    }
    return <Circle className="text-steampunk-steam opacity-30" size={24} />;
  };

  const getCategoryColor = () => {
    switch (card.category) {
      case 'single':
        return 'from-steampunk-saphir to-blue-600';
      case 'comparison':
        return 'from-steampunk-topaze to-yellow-600';
      case 'global':
        return 'from-steampunk-amethyst to-purple-600';
      case 'composite':
        return 'from-steampunk-brass to-steampunk-gold';
      default:
        return 'from-steampunk-copper to-steampunk-bronze';
    }
  };

  return (
    <Card
      onClick={onSelect}
      className={`
        p-4 cursor-pointer transition-all duration-300 transform
        ${isSelected 
          ? 'border-steampunk-gold border-2 shadow-2xl scale-105 animate-nixie-glow' 
          : 'border-steampunk-copper border hover:border-steampunk-brass hover:scale-102'
        }
        bg-gradient-to-br ${getCategoryColor()} bg-opacity-90 backdrop-blur-sm
        hover:shadow-xl
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-steampunk-steam truncate">
          {card.name}
        </h3>
        <div className="flex-shrink-0 ml-2">
          {getResultIcon()}
        </div>
      </div>

      <div className="space-y-2">
        <div className="p-2 bg-black bg-opacity-20 rounded border border-steampunk-steam border-opacity-30">
          <div className="text-sm text-steampunk-steam font-medium">
            A: {card.ruleA}
          </div>
        </div>
        
        <div className="text-center text-steampunk-steam opacity-60 text-xs">
          OU
        </div>
        
        <div className="p-2 bg-black bg-opacity-20 rounded border border-steampunk-steam border-opacity-30">
          <div className="text-sm text-steampunk-steam font-medium">
            B: {card.ruleB}
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 text-center">
          <div className="text-xs text-steampunk-gold font-bold animate-pulse">
            ⚡ CARTE SÉLECTIONNÉE ⚡
          </div>
        </div>
      )}
    </Card>
  );
};
