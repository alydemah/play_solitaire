import type { Card, Suit, Rank } from '../types/game.types';

/** Available card suits */
const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
/** Available card ranks in order */
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/**
 * Creates a complete deck of 52 cards
 * @returns Array of Card objects
 */
export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        faceUp: false
      });
    });
  });
  
  return deck;
};

/**
 * Shuffles a deck of cards using Fisher-Yates algorithm
 * @param deck - Array of cards to shuffle
 * @returns Shuffled array of cards
 */
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Checks if a move between two cards is valid
 * @param sourceCard - Card being moved
 * @param targetCard - Card being moved onto
 * @returns boolean indicating if move is valid
 */
export const isValidMove = (sourceCard: Card, targetCard: Card): boolean => {
  const rankOrder = RANKS;
  const sourceIndex = rankOrder.indexOf(sourceCard.rank);
  const targetIndex = rankOrder.indexOf(targetCard.rank);
  
  // Check for alternating colors
  const isAlternatingColor = (
    (sourceCard.suit === 'hearts' || sourceCard.suit === 'diamonds') !==
    (targetCard.suit === 'hearts' || targetCard.suit === 'diamonds')
  );
  
  // Card must be one rank lower and opposite color
  return sourceIndex === targetIndex - 1 && isAlternatingColor;
};