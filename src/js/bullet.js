import { Actor, Vector } from 'excalibur';
import { Resources } from './resources';
import { Enemy } from './enemy.js';

export class Bullet extends Actor {
    isDead = false;

    constructor(x, y, game) {
        super({ width: 50, height: 50 });
        this.pos = new Vector(x, y);
        this.vel = new Vector(400, 0);
        const sprite = Resources.Wrench.toSprite();
        sprite.width = 80;
        sprite.height = 80;
        this.graphics.use(sprite);
        this.game = game;
    }
    onInitialize(engine) {
        this.on("collisionstart", (event) => {
            if (this.isDead) return;
            const enemy = event.other?.owner;
            if (enemy instanceof Enemy && typeof enemy.die === 'function') {
                enemy.die();
                this.isDead = true;
                this.kill();
                if (this.game && typeof this.game.addScore === 'function') {
                    this.game.addScore(1);
                }
            }
        });
    }
}