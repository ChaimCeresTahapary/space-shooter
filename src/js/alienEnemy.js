import { Enemy } from './enemy.js';
import { Resources } from './resources.js';
import { Player } from './player.js';

export class AlienEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 100, 100, Resources.Alien.toSprite(), -320);
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            const other = event.other?.owner;
            if (other instanceof Player) {
                if (other.game && typeof other.game.loseLife === 'function') {
                    other.game.loseLife(2);
                }
            }
        });
    }
}