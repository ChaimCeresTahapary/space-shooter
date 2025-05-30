import { Actor, Vector, } from 'excalibur';
import { Resources } from './resources';

export class Bullet extends Actor {
    constructor(x, y, game) {
        super({ width: 50, height: 50 });
        this.pos = new Vector(x, y);
        this.vel = new Vector(400, 0); // Move right
        const sprite = Resources.Wrench.toSprite();
        sprite.width = 80;
        sprite.height = 80;
        this.graphics.use(sprite); // Use wrench.png for bullet
        this.game = game; // Reference to the game for score
    }
    onInitialize(engine) {
        this.on("collisionstart", (event) => {
            // Avoid dynamic import, check by name only
            const enemy = event.other?.owner;
            if (enemy && enemy.constructor && enemy.constructor.name === 'Enemy' && typeof enemy.die === 'function') {
                enemy.die();
                this.kill();
                if (this.game && typeof this.game.addScore === 'function') {
                    this.game.addScore(1); // Add 1 point per enemy
                }
            }
        });
    }
}