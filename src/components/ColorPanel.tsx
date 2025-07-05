import React, { useState, useRef } from 'react';
import { Color, Digit } from '@/lib/gameTypes';

// Mechanical sound effect
const playMechanicalSound = () => {
  const audio = new Audio('/sounds/mechanical-click.mp3');
  audio.volume = 0.3;
  audio.play().catch(e => console.log('Audio play failed:', e));
};

interface ColorPanelProps {
  color: Color;
  selectedDigit: Digit;
  onDigitSelect: (color: Color, digit: Digit) => void;
  disabled?: boolean;
  impossibleNumbers?: Set<Digit>;
  onToggleImpossible?: (color: Color, digit: Digit) => void;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
  color,
  selectedDigit,
  onDigitSelect,
  disabled,
  impossibleNumbers = new Set(),
  onToggleImpossible
}) => {
  const colorConfig = {
    saphir: {
      name: 'Saphir',
      bgColor: 'bg-steampunk-saphir/20',
      borderColor: 'border-blue-400',
      textColor: 'text-amber-900/80'
    },
    topaze: {
      name: 'Topaze',
      bgColor: 'bg-steampunk-topaze/20',
      borderColor: 'border-yellow-400',
      textColor: 'text-amber-900/80'
    },
    amethyst: {
      name: 'Améthyste',
      bgColor: 'bg-steampunk-amethyst/20',
      borderColor: 'border-purple-400',
      textColor: 'text-amber-900/80'
    }
  };

  const config = colorConfig[color];

  const digitRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [animatingDigit, setAnimatingDigit] = useState<number | null>(null);

  const handleDigitClick = (digit: number) => {
    if (digit !== selectedDigit) {
      playMechanicalSound();
      setAnimatingDigit(digit);
      setTimeout(() => {
        onDigitSelect(color, digit as Digit);
        setAnimatingDigit(null);
      }, 300);
    }
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${config.borderColor} ${config.bgColor} backdrop-blur-xs`}>
      <h3 className={`text-lg font-bold ${config.textColor} mb-3 text-center`}>
        {config.name}
      </h3>
      
      <div className="flex justify-center items-end relative">
        {[1, 2, 3, 4, 5].map((digit) => {
          const isSelected = digit === selectedDigit;
          const isAnimating = digit === animatingDigit;
          const isImpossible = impossibleNumbers.has(digit as Digit);

          return (
            <div key={digit} className="flex flex-col items-center mx-1">
              <button
                ref={el => digitRefs.current[digit - 1] = el}
                disabled={disabled || isImpossible}
                className={`digit-selector ${isSelected ? 'selected' : ''} ${isAnimating ? 'animating' : ''} ${isImpossible ? 'impossible' : ''}`}
                onClick={() => handleDigitClick(digit)}
                title={isImpossible ? "Chiffre marqué comme impossible" : undefined}
              >
                <span className="digit-value">{digit}</span>
                <div className="digit-rail"></div>
              </button>
                <button
                  type="button"
                  className={`toggle-impossible-btn text-red-700 bg-red-100 rounded-full mt-1 w-5 h-5 flex items-center justify-center text-xs border ${isImpossible ? 'border-red-700' : 'border-red-200 opacity-50'}`}
                  aria-label="Marquer comme impossible"
                  onClick={() => onToggleImpossible && onToggleImpossible(color, digit as Digit)}
                >
                  ✗
                </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
