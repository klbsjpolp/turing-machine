import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {Combination, CriteriaCard, Digit} from "./gameTypes";
import {AllPossibleCards} from "./criteriaLogic";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sérialisation d'un puzzle selon la documentation SERIALIZATION.md
export function serializePuzzle(
  solution: Combination,
  cards: CriteriaCard[]
): string {
  if (cards.length !== 5) {
    throw new Error("Serialization requires exactly 5 cards");
  }

  // Create a mapping of card IDs to their index in AllPossibleCards
  const cardIdToIndex = new Map<string, number>();
  AllPossibleCards.forEach((card, index) => {
    cardIdToIndex.set(card.id, index);
  });

  // Verify all cards exist in AllPossibleCards
  for (const card of cards) {
    if (!cardIdToIndex.has(card.id)) {
      throw new Error(`Unknown card ID: ${card.id}`);
    }
  }

  // Encode solution (3 digits, each 1-5)
  // We need 3 bits per digit (values 1-5 need 3 bits)
  let binaryData = '';

  // Add solution digits (3 bits each)
  binaryData += (solution.saphir - 1).toString(2).padStart(3, '0');
  binaryData += (solution.topaze - 1).toString(2).padStart(3, '0');
  binaryData += (solution.amethyst - 1).toString(2).padStart(3, '0');

  // Add card indices and success rules
  for (const card of cards) {
    const cardIndex = cardIdToIndex.get(card.id)!;
    // Card index (0-69) needs 7 bits
    binaryData += cardIndex.toString(2).padStart(7, '0');
    // Success rule (A=0, B=1) needs 1 bit
    binaryData += card.successRule === 'A' ? '0' : '1';
  }

  // Convert binary string to bytes
  const bytes = [];
  for (let i = 0; i < binaryData.length; i += 8) {
    const byte = binaryData.substr(i, 8).padEnd(8, '0');
    bytes.push(parseInt(byte, 2));
  }

  // Convert bytes to Uint8Array
  const uint8Array = new Uint8Array(bytes);

  // Apply a simple XOR obfuscation with a fixed key
  const key = [0x42, 0x54, 0x4D, 0x47]; // "BTMG" in ASCII
  for (let i = 0; i < uint8Array.length; i++) {
    uint8Array[i] = uint8Array[i] ^ key[i % key.length];
  }

  // Convert to Base64 URL-safe
  return btoa(String.fromCharCode.apply(null, Array.from(uint8Array)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Désérialisation d'une chaîne de puzzle en { solution, cards }
export function deserializePuzzle(serialized: string): { solution: Combination, cards: CriteriaCard[] } {
  try {
    // Convert from Base64 URL-safe to binary
    const base64Standard = serialized
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    // Decode Base64 to bytes
    const binaryString = atob(base64Standard);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Apply XOR deobfuscation with the same key
    const key = [0x42, 0x54, 0x4D, 0x47]; // "BTMG" in ASCII
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = bytes[i] ^ key[i % key.length];
    }

    // Convert bytes to binary string
    let binaryData = '';
    for (const byte of bytes) {
      binaryData += byte.toString(2).padStart(8, '0');
    }

    // Extract solution (first 9 bits: 3 bits per digit)
    const saphirBits = binaryData.substring(0, 3);
    const topazeBits = binaryData.substring(3, 6);
    const amethystBits = binaryData.substring(6, 9);

    const solution: Combination = {
      saphir: (parseInt(saphirBits, 2) + 1) as Digit,
      topaze: (parseInt(topazeBits, 2) + 1) as Digit,
      amethyst: (parseInt(amethystBits, 2) + 1) as Digit
    };

    // Extract card information (8 bits per card: 7 for index, 1 for rule)
    const cards: CriteriaCard[] = [];
    for (let i = 0; i < 5; i++) {
      const startPos = 9 + i * 8;
      const cardIndexBits = binaryData.substring(startPos, startPos + 7);
      const successRuleBit = binaryData.substring(startPos + 7, startPos + 8);

      const cardIndex = parseInt(cardIndexBits, 2);
      const successRule = successRuleBit === '0' ? 'A' : 'B';

      if (cardIndex >= AllPossibleCards.length) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(`Invalid card index: ${cardIndex}`);
      }

      const cardDef = AllPossibleCards[cardIndex];
      cards.push({
        ...cardDef,
        successRule,
        testResult: null
      });
    }

    return { solution, cards };
  } catch (error) {
    console.error("Error deserializing puzzle:", error);
    throw new Error("Invalid serialization format");
  }
}
