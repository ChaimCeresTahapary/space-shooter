import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './player.js';

export class Enemy extends Actor {
    isDead = false;

    constructor(x, y, width = 40, height = 40, sprite = Resources.Fish.toSprite(), speed = -150) {
        super({ width, height });
        this.pos = new Vector(x, y);
        sprite.width = width;
        sprite.height = height;
        this.graphics.use(sprite);
        this.vel = new Vector(speed, 0);
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
        this.graphics.use(Resources.Ghost.toSprite());
        setTimeout(() => this.kill(), 200);
    }
}
