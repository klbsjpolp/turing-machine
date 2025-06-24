import React from 'react';

const getColorClass = (color: string) => {
  switch(color) {
    case 'saphir':
      return 'text-steampunk-saphir';
    case 'topaze':
      return 'text-steampunk-topaze';
    case 'amethyste':
      return 'text-steampunk-amethyst';
    default:
      return '';
  }
};

type ColoredTextProps = {
  text: string;
  color: 'saphir' | 'topaze' | 'amethyste';
  key: number;
};

export const formatRuleWithColors = (rule: string): React.ReactNode[] => {
  // Return empty array for empty or undefined rules
  if (!rule) return [];
  
  // Split the rule into parts, keeping the delimiters
  const parts = rule.split(/(Saphir|Topaze|Améthyste)/g);
  
  return parts
    .filter(part => part !== '') // Remove empty strings
    .map((part, index) => {
      switch(part) {
        case 'Saphir':
          return <span key={index} className={getColorClass("saphir")}>{part}</span>;
        case 'Topaze':
          return <span key={index} className={getColorClass("topaze")}>{part}</span>;
        case 'Améthyste':
          return <span key={index} className={getColorClass("amethyste")}>{part}</span>;
        default:
          return <React.Fragment key={index}>{part}</React.Fragment>;
      }
    });
};
