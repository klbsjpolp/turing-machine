import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {Combination, CriteriaCard} from "./gameTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sérialisation d'un puzzle selon la documentation SERIALIZATION.md
export function serializePuzzle(
  solution: Combination,
  cards: CriteriaCard[]
): string {
  // TODO: Implémenter la sérialisation
  return ''
}

// Désérialisation d'une chaîne de puzzle en { solution, cards }
export function deserializePuzzle(serialized: string): { solution: Combination, cards: CriteriaCard[] } {
  //TODO: Implémenter la désérialisation
  return {} as unknown as { solution: Combination, cards: CriteriaCard[] };
}
