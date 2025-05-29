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
        if (this.player && !this.isDead) {
            // Move towards the player
            const direction = this.player.pos.sub(this.pos).normalize();
            this.vel = direction.scale(100); // Adjust speed as needed
        } else {
            this.vel = new Vector(0, 0);
        }
    }

    die() {
        this.isDead = true;
        this.graphics.use(Resources.Bones.toSprite());
        setTimeout(() => this.kill(), 500); // Remove after 0.5s
    }
}
