import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Enemy extends Actor {
    isDead = false;

    constructor(x, y, player) {
        super({ width: 40, height: 40 });
        this.pos = new Vector(x, y);
        this.player = player;
        this.graphics.use(Resources.Fish.toSprite());
    }

    onPreUpdate(engine, delta) {
        this.vel = this.isDead ? Vector.Zero : new Vector(-100, 0);
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            const other = event.other?.owner;
            // Only affect Player class
            if (other instanceof import('./player.js').Player) {
                if (other.game && typeof other.game.loseLife === 'function') {
                    other.game.loseLife(1);
                    // Game.js loseLife updates UI
                    if (other.game.lives.get() <= 0) {
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    } else {
                        // Respawn player at starting position
                        other.pos = new Vector(400, 400);
                        other.vel = Vector.Zero;
                    }
                }
            }
        });
    }

    die() {
        this.isDead = true;
        this.graphics.use(Resources.Bones.toSprite());
        setTimeout(() => this.kill(), 500);
    }
}
