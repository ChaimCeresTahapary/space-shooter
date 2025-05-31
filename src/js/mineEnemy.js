import { Enemy } from './enemy.js';
import { Resources } from './resources.js';
import { Player } from './player.js';

export class MineEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 60, 60, Resources.Mine.toSprite(), -100);
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            const other = event.other?.owner;
            if (other instanceof Player) {
                // 2 levens eraf
                if (other.game && typeof other.game.loseLife === 'function') {
                    other.game.loseLife(3);
                }
                // Optioneel: snelheid verlagen
                other.vel.x *= 0.5;
                setTimeout(() => {
                    other.vel.x *= 2;
                }, 2000);
            }
        });
    }
}