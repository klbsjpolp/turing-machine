import React, { useState, useRef, useEffect } from 'react';
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
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
  color,
  selectedDigit,
  onDigitSelect,
  disabled
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Duration of panel-shake animation
  };

  const handleUp = () => {
    const newDigit = (selectedDigit === 5 ? 1 : selectedDigit + 1) as Digit;
    onDigitSelect(color, newDigit);
    triggerAnimation();
  };

  const handleDown = () => {
    const newDigit = (selectedDigit === 1 ? 5 : selectedDigit - 1) as Digit;
    onDigitSelect(color, newDigit);
    triggerAnimation();
  };

  const colorConfig = {
    saphir: {
      name: 'Saphir',
      bgColor: 'bg-steampunk-saphir',
      borderColor: 'border-blue-400',
      textColor: 'text-amber-900/80'
    },
    topaze: {
      name: 'Topaze',
      bgColor: 'bg-steampunk-topaze',
      borderColor: 'border-yellow-400',
      textColor: 'text-amber-900/80'
    },
    amethyst: {
      name: 'Améthyste',
      bgColor: 'bg-steampunk-amethyst',
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
    <div className={`p-4 rounded-lg border-2 ${config.borderColor} ${config.bgColor} bg-opacity-20 backdrop-blur-sm ${isAnimating ? 'animate-panel-shake' : ''}`}>
      <h3 className={`text-lg font-bold ${config.textColor} mb-3 text-center`}>
        {config.name}
      </h3>
      
      <div className="flex justify-center items-end h-20 relative">
        {[1, 2, 3, 4, 5].map((digit) => {
          const isSelected = digit === selectedDigit;
          const isAnimating = digit === animatingDigit;
          
          return (
            <button
              key={digit}
              ref={el => digitRefs.current[digit - 1] = el}
              disabled={disabled}
              className={`digit-selector ${isSelected ? 'selected' : ''} ${isAnimating ? 'animating' : ''}`}
              onClick={() => handleDigitClick(digit)}
            >
              <span className="digit-value">{digit}</span>
              <div className="digit-rail"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
