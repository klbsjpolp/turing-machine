import React from 'react';

interface SequenceDisplayProps {
  saphir: number;
  topaze: number;
  amethyst: number;
  className?: string;
}

export const SequenceDisplay: React.FC<SequenceDisplayProps> = ({
  saphir,
  topaze,
  amethyst,
  className = ''
}) => {
  return (
    <span className={`font-bold ${className}`}>
      <span className="text-steampunk-saphir">{saphir}</span>
      <span>-</span>
      <span className="text-steampunk-topaze">{topaze}</span>
      <span>-</span>
      <span className="text-steampunk-amethyst">{amethyst}</span>
    </span>
  );
};
