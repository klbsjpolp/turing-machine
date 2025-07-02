import React from 'react';

export type LightingEffect = 'default' | 'success' | 'failure' | 'victory' | 'defeat' | 'next_round' | 'abandoned';

interface LightingOverlayProps {
  effect: LightingEffect;
}

export const LightingOverlay: React.FC<LightingOverlayProps> = ({ effect }) => {
  const effectClasses: Record<LightingEffect, string> = {
    default: 'opacity-0',
    success: 'animate-flash-success bg-green-500',
    failure: 'animate-flash-failure bg-red-500',
    victory: 'animate-glow-victory bg-yellow-400',
    defeat: 'animate-flicker-defeat bg-red-700',
    next_round: 'animate-dim-pulse bg-blue-800',
    abandoned: 'opacity-40 bg-gray-800',
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 z-5 ${effectClasses[effect]}`}
      style={{ mixBlendMode: 'color-dodge' }}
    />
  );
};
