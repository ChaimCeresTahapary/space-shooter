import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Enemy extends Actor {
    constructor(x, y, player) {
        super({ width: 40, height: 40 });
        this.pos = new Vector(x, y);
        this.player = player;
        this.isDead = false;
        this.graphics.use(Resources.Fish.toSprite());
    }

    onPreUpdate(engine, delta) {
        if (!this.isDead) {
            // Only move left
            this.vel = new Vector(-100, 0); // Move left at 100 px/sec
        } else {
            this.vel = new Vector(0, 0);
        }
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            const other = event.other?.owner;
            // If collides with player, kill player and reset game
            if (other && other.constructor && other.constructor.name === 'Player') {
                other.kill();
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        });
    }

    die() {
        this.isDead = true;
        this.graphics.use(Resources.Bones.toSprite());
        setTimeout(() => this.kill(), 500); // Remove after 0.5s
    }
}
