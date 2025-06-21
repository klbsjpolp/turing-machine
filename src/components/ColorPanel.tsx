
import React from 'react';
import { Button } from '@/components/ui/button';
import { Color, Digit } from '@/lib/gameTypes';

interface ColorPanelProps {
  color: Color;
  selectedDigit: Digit;
  onDigitSelect: (color: Color, digit: Digit) => void;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
  color,
  selectedDigit,
  onDigitSelect
}) => {
  const colorConfig = {
    saphir: {
      name: 'Saphir',
      bgColor: 'bg-steampunk-saphir',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-100'
    },
    topaze: {
      name: 'Topaze',
      bgColor: 'bg-steampunk-topaze',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-900'
    },
    amethyst: {
      name: 'Améthyste',
      bgColor: 'bg-steampunk-amethyst',
      borderColor: 'border-purple-400',
      textColor: 'text-purple-100'
    }
  };

  const config = colorConfig[color];
  const digits: Digit[] = [1, 2, 3, 4, 5];

  return (
    <div className={`p-4 rounded-lg border-2 ${config.borderColor} ${config.bgColor} bg-opacity-20 backdrop-blur-sm`}>
      <h3 className={`text-lg font-bold ${config.textColor} mb-3 text-center`}>
        {config.name}
      </h3>
      
      <div className="flex justify-center gap-2">
        {digits.map((digit) => (
          <Button
            key={digit}
            onClick={() => onDigitSelect(color, digit)}
            className={`
              w-12 h-12 rounded-full font-bold text-lg transition-all duration-200 
              ${selectedDigit === digit 
                ? `${config.bgColor} ${config.textColor} shadow-lg scale-110 animate-nixie-glow` 
                : 'bg-steampunk-copper text-steampunk-steam hover:bg-steampunk-bronze hover:scale-105'
              }
              border-2 ${config.borderColor}
              animate-button-press
            `}
          >
            {digit}
          </Button>
        ))}
      </div>
    </div>
  );
};
