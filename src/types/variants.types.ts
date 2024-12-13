/**
 * Types for different solitaire game variants
 */

export type GameVariant = 'klondike' | 'spider' | 'freecell' | 'pyramid' | 'yukon' | 'golf' | 'accordion' | 'clock';

export interface VariantConfig {
  name: string;
  description: string;
  deckCount: number;
  tableauCount: number;
  foundationCount: number;
  hasFreeCells: boolean;
  hasStockPile: boolean;
  hasWastePile: boolean;
  initialTableauCards: number[];
  rules: {
    allowEmptyFoundations: boolean;
    allowMoveSequences: boolean;
    requireAlternateColors: boolean;
    requireSameSuit: boolean;
    allowKingOnly: boolean;
    allowMultipleCards: boolean;
  };
}

export const VARIANT_CONFIGS: Record<GameVariant, VariantConfig> = {
  klondike: {
    name: 'Klondike',
    description: 'The classic solitaire game',
    deckCount: 1,
    tableauCount: 7,
    foundationCount: 4,
    hasFreeCells: false,
    hasStockPile: true,
    hasWastePile: true,
    initialTableauCards: [1, 2, 3, 4, 5, 6, 7],
    rules: {
      allowEmptyFoundations: true,
      allowMoveSequences: true,
      requireAlternateColors: true,
      requireSameSuit: false,
      allowKingOnly: true,
      allowMultipleCards: true
    }
  },
  spider: {
    name: 'Spider',
    description: 'Build eight foundation piles using multiple decks',
    deckCount: 2,
    tableauCount: 10,
    foundationCount: 8,
    hasFreeCells: false,
    hasStockPile: true,
    hasWastePile: false,
    initialTableauCards: Array(10).fill(6),
    rules: {
      allowEmptyFoundations: false,
      allowMoveSequences: true,
      requireAlternateColors: false,
      requireSameSuit: true,
      allowKingOnly: false,
      allowMultipleCards: true
    }
  },
  freecell: {
    name: 'FreeCell',
    description: 'Use free cells to strategically move cards',
    deckCount: 1,
    tableauCount: 8,
    foundationCount: 4,
    hasFreeCells: true,
    hasStockPile: false,
    hasWastePile: false,
    initialTableauCards: Array(4).fill(7).concat(Array(4).fill(6)),
    rules: {
      allowEmptyFoundations: true,
      allowMoveSequences: true,
      requireAlternateColors: true,
      requireSameSuit: false,
      allowKingOnly: false,
      allowMultipleCards: false
    }
  },
  pyramid: {
    name: 'Pyramid',
    description: 'Remove pairs of cards that sum to 13',
    deckCount: 1,
    tableauCount: 7,
    foundationCount: 0,
    hasFreeCells: false,
    hasStockPile: true,
    hasWastePile: true,
    initialTableauCards: [1, 2, 3, 4, 5, 6, 7],
    rules: {
      allowEmptyFoundations: false,
      allowMoveSequences: false,
      requireAlternateColors: false,
      requireSameSuit: false,
      allowKingOnly: false,
      allowMultipleCards: false
    }
  },
  yukon: {
    name: 'Yukon',
    description: 'Like Klondike but with all cards face up',
    deckCount: 1,
    tableauCount: 7,
    foundationCount: 4,
    hasFreeCells: false,
    hasStockPile: false,
    hasWastePile: false,
    initialTableauCards: [1, 6, 6, 6, 6, 6, 6],
    rules: {
      allowEmptyFoundations: true,
      allowMoveSequences: true,
      requireAlternateColors: true,
      requireSameSuit: false,
      allowKingOnly: true,
      allowMultipleCards: true
    }
  },
  golf: {
    name: 'Golf',
    description: 'Remove cards one rank up or down',
    deckCount: 1,
    tableauCount: 7,
    foundationCount: 1,
    hasFreeCells: false,
    hasStockPile: true,
    hasWastePile: true,
    initialTableauCards: Array(7).fill(5),
    rules: {
      allowEmptyFoundations: false,
      allowMoveSequences: false,
      requireAlternateColors: false,
      requireSameSuit: false,
      allowKingOnly: false,
      allowMultipleCards: false
    }
  },
  accordion: {
    name: 'Accordion',
    description: 'Collapse cards into a single pile',
    deckCount: 1,
    tableauCount: 1,
    foundationCount: 0,
    hasFreeCells: false,
    hasStockPile: false,
    hasWastePile: false,
    initialTableauCards: [52],
    rules: {
      allowEmptyFoundations: false,
      allowMoveSequences: false,
      requireAlternateColors: false,
      requireSameSuit: true,
      allowKingOnly: false,
      allowMultipleCards: false
    }
  },
  clock: {
    name: 'Clock',
    description: 'Place cards in clock positions',
    deckCount: 1,
    tableauCount: 12,
    foundationCount: 0,
    hasFreeCells: false,
    hasStockPile: false,
    hasWastePile: false,
    initialTableauCards: Array(12).fill(4),
    rules: {
      allowEmptyFoundations: false,
      allowMoveSequences: false,
      requireAlternateColors: false,
      requireSameSuit: false,
      allowKingOnly: false,
      allowMultipleCards: false
    }
  }
};