
import React from 'react';

export const SteamBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Steam particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-steampunk-steam opacity-30 rounded-full animate-steam-rise"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-steampunk-coal via-transparent to-steampunk-darkBronze opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-steampunk-darkBronze via-transparent to-steampunk-darkBronze opacity-30" />
      
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
