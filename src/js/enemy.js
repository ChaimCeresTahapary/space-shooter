import { Actor, Vector } from 'excalibur';
import { Resources } from './resources';
import { Player } from './player.js';

export class Enemy extends Actor {
    isDead = false;

    constructor(x, y) {
        super({ width: 40, height: 40 });
        this.pos = new Vector(x, y);
        this.graphics.use(Resources.Fish.toSprite());
        this.vel = new Vector(-100, 0); // Move left across the screen
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            const other = event.other?.owner;
            if (other instanceof Player && other.game && typeof other.game.loseLife === 'function') {
                other.game.loseLife(1);
            }
        });
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.graphics.use(Resources.Bones.toSprite());
        setTimeout(() => this.kill(), 500);
    }
}
