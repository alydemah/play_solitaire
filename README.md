# Vue Solitaire

A modern implementation of the classic Solitaire card game built with Vue 3, TypeScript, and Tailwind CSS.

## 🎮 Game Rules

### Objective
The goal is to build up four foundation piles from Ace to King, one for each suit, while following the rules of card movement and placement.

### Setup
- Cards are dealt into seven tableau piles
- First card in each pile is face up, remaining cards are face down
- Remaining cards form the draw pile

### Card Movement Rules
1. **Foundation Piles**
   - Build up from Ace to King
   - Must be of the same suit
   - Can only place one card at a time

2. **Tableau Piles**
   - Build down in alternating colors
   - Can move multiple cards at once if they're in sequence
   - Empty spaces can only be filled with Kings

3. **Draw Pile**
   - Draw either 1 or 3 cards (based on settings)
   - Cards go to waste pile
   - When draw pile is empty, waste pile can be recycled

### Game Features
- Multiple difficulty levels
- Customizable draw count (1 or 3 cards)
- Timer option
- Sound effects
- Move counter
- Scoring system
- Undo functionality
- Hint system

## 🏗️ Project Structure

```
src/
├── components/
│   ├── card/
│   │   ├── CardPattern.vue    # Card pattern rendering
│   │   └── CardSvg.vue       # SVG-based card display
│   ├── piles/
│   │   ├── FoundationPiles.vue # Foundation pile management
│   │   ├── StockPile.vue      # Draw pile management
│   │   ├── TableauPiles.vue   # Main playing area
│   │   └── WastePile.vue      # Drawn cards pile
│   ├── Card.vue              # Individual card component
│   ├── GameBoard.vue         # Main game board
│   ├── GameHeader.vue        # Game controls and stats
│   └── StartScreen.vue       # Initial game setup
├── stores/
│   └── gameStore.ts          # Game state management
├── types/
│   └── game.types.ts         # TypeScript definitions
├── utils/
│   ├── cardPatterns/
│   │   ├── index.ts          # Pattern exports
│   │   ├── rankPatterns.ts   # Rank-specific patterns
│   │   └── suitPatterns.ts   # Suit-specific patterns
│   ├── cardUtils.ts          # Card manipulation
│   ├── dragDropHandlers.ts   # Drag and drop logic
│   ├── gameLogic.ts          # Game rules
│   ├── moveHandler.ts        # Move validation
│   └── moveValidation.ts     # Move rules
└── App.vue                   # Root component
```

## 🧱 Component Structure

### Core Components
1. **App.vue**
   - Root component
   - Manages game state
   - Handles game start/reset

2. **StartScreen.vue**
   - Initial game setup
   - Difficulty selection
   - Game options

3. **GameBoard.vue**
   - Main game layout
   - Pile arrangement
   - Card movement coordination

### Card Components
1. **Card.vue**
   - Individual card rendering
   - Drag and drop behavior
   - Card state management

2. **CardSvg.vue**
   - SVG-based card design
   - Suit and rank rendering
   - Card patterns

### Pile Components
1. **FoundationPiles.vue**
   - Foundation pile logic
   - Suit-based building
   - Victory condition checking

2. **TableauPiles.vue**
   - Main playing area
   - Cascading card layout
   - Multiple card movement

3. **StockPile.vue**
   - Draw pile management
   - Card recycling
   - Draw count handling

4. **WastePile.vue**
   - Drawn card display
   - Card availability
   - Waste to foundation moves

## 🛠️ Technical Stack

- **Vue 3** - Frontend framework
- **TypeScript** - Type safety
- **Pinia** - State management
- **Tailwind CSS** - Styling
- **Vue.Draggable** - Drag and drop
- **Howler.js** - Sound effects
- **Vue Motion** - Animations
- **Vite** - Build tool
- **Vitest** - Testing

## 🎯 Game Features

### Difficulty Levels
- **Easy**: More hints, unlimited undos
- **Medium**: Limited hints, limited undos
- **Hard**: No hints, no undos

### Scoring System
- Foundation moves: +10 points
- Waste to tableau: +5 points
- Tableau to tableau: +3 points
- Undo: -5 points
- Using hint: -10 points

### Additional Features
- Auto-complete detection
- Move validation
- Save/load game state
- Statistics tracking
- Achievement system

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 🧪 Testing

Run tests with:
```bash
npm run test
```

## 📝 License

MIT License - see LICENSE file for details