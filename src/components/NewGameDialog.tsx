import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Difficulty } from '@/lib/gameTypes';
import { deserializePuzzle } from '@/lib/utils';
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";

interface NewGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartGame: (difficulty: Difficulty | null, serialization: string | null) => void;
}

export function NewGameDialog({ open, onOpenChange, onStartGame }: NewGameDialogProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('expert');
  const [serialization, setSerialization] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = () => {
    // If serialization is provided, validate it
    if (serialization.trim()) {
      try {
        // Try to deserialize the puzzle
        deserializePuzzle(serialization.trim());
        // If successful, start the game with the serialization
        onStartGame(null, serialization.trim());
        // Reset the form
        setSerialization('');
        setError(null);
      } catch (err) {
        // If deserialization fails, show an error
        setError("Le code de casse-tête n'est pas valide.");
      }
    } else {
      // If no serialization is provided, start the game with the selected difficulty
      onStartGame(difficulty, null);
      // Reset the form
      setSerialization('');
      setError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="paper-panel">
        <DialogHeader>
          <DialogTitle className="paper-panel-title">Nouveau casse-tête</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Niveau de difficulté</label>
            <ToggleGroup type="single" value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)} className="flex gap-2 mb-2">
              <ToggleGroupItem value="easy" className="ink-button">Facile</ToggleGroupItem>
              <ToggleGroupItem value="medium" className="ink-button">Moyen</ToggleGroupItem>
              <ToggleGroupItem value="hard" className="ink-button">Difficile</ToggleGroupItem>
              <ToggleGroupItem value="expert" className="ink-button">Expert</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Ou entrez un code de casse-tête</label>
            <Input 
              value={serialization} 
              onChange={(e) => {
                setSerialization(e.target.value);
                setError(null); // Clear error when input changes
              }}
              placeholder="Code de casse-tête (optionnel)"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button onClick={handleStartGame} className="ink-button">
            Commencer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}