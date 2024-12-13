import type { GameState } from '../types/game.types';
import type { GameVariant } from '../types/variants.types';
import { VARIANT_CONFIGS } from '../types/variants.types';
import { BaseGame } from './base/BaseGame';
import { KlondikeGame } from './variants/KlondikeGame';
import { SpiderGame } from './variants/SpiderGame';
import { FreeCellGame } from './variants/FreeCellGame';
import { PyramidGame } from './variants/PyramidGame';
import { YukonGame } from './variants/YukonGame';
import { GolfGame } from './variants/GolfGame';
import { AccordionGame } from './variants/AccordionGame';
import { ClockGame } from './variants/ClockGame';


/**
 * Factory class to create appropriate game variant instance
 */
export class GameFactory {
  static createGame(variant: GameVariant, state: GameState): BaseGame {
    const config = VARIANT_CONFIGS[variant];
    
    switch (variant) {
      case 'klondike':
        return new KlondikeGame(state, config);
      case 'spider':
        return new SpiderGame(state, config);
      case 'freecell':
        return new FreeCellGame(state, config);
      case 'pyramid':
        return new PyramidGame(state, config);
      case 'yukon':
        return new YukonGame(state, config);
      case 'golf':
        return new GolfGame(state, config);
      case 'accordion':
        return new AccordionGame(state, config);
      case 'clock':
        return new ClockGame(state, config);
      default:
        throw new Error(`Unsupported game variant: ${variant}`);
    }
  }
}