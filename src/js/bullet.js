import { Actor, Vector, } from 'excalibur';
import { Resources } from './resources';

export class Bullet extends Actor {
    constructor(x, y) {
        super({ width: 20, height: 20 });
        this.pos = new Vector(x, y);
        this.vel = new Vector(400, 0); // Move right
        this.graphics.use(Resources.Bubble.toSprite());
    }
    onInitialize(engine) {
        this.on("collisionstart", (event) => {
            // Try to get the Enemy actor from the collision event
            const enemy = event.other?.owner;
            // Check if it's an instance of Enemy (import Enemy for instanceof check)
            // Use dynamic import to avoid circular dependency
            import('./enemy.js').then(module => {
                if (enemy instanceof module.Enemy && typeof enemy.die === 'function') {
                    enemy.die();
                    this.kill();
                }
            });
        });
    }
}