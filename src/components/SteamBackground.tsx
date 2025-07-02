
import React, { useMemo } from 'react';

export const SteamBackground: React.FC = () => {
  // Generate stable random positions for particles
  const particles = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 20, // Start from bottom 20% of screen
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 2,
      size: 3 + Math.random() * 2, // Random size between 3-5
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-1">
      {/* Steam particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-steam-rise"
          style={{
            left: `${particle.left}%`,
            bottom: `${particle.bottom}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: '#e9e8e2', // steampunk-steam color
            opacity: 0.6,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
            boxShadow: '0 0 4px rgba(233, 232, 226, 0.3)',
          }}
        />
      ))}

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-linear-to-t from-steampunk-coal via-transparent to-steampunk-dark-bronze opacity-50" />
      <div className="absolute inset-0 bg-linear-to-r from-steampunk-dark-bronze via-transparent to-steampunk-dark-bronze opacity-30" />

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 20% 30%, white, transparent),
                           radial-gradient(1px 1px at 40% 70%, white, transparent),
                           radial-gradient(1px 1px at 60% 20%, white, transparent),
                           radial-gradient(1px 1px at 80% 80%, white, transparent)`,
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  );
};
