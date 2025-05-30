import { Actor, Vector } from 'excalibur';
import { Resources } from './resources';

export class HealthPack extends Actor {
    constructor(x, y, game, laneEnemies) {
        super({ width: 80, height: 80 });
        this.pos = new Vector(x, y);
        this.game = game;
        this.laneEnemies = laneEnemies;
        const sprite = Resources.Health.toSprite();
        sprite.width = 80;
        sprite.height = 80;
        this.graphics.use(sprite);
        this.isUsed = false;
    }

    onPreUpdate(engine, delta) {
        this.vel = new Vector(-100, 0);
        if (this.laneEnemies) {
            for (const enemy of this.laneEnemies) {
                if (enemy && !enemy.isDead && this.pos.distance(enemy.pos) < 80) {
                    this.pos.y += 50;
                }
            }
        }
        if (this.pos.x + 80 < 0) {
            this.kill();
        }
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            const other = event.other?.owner;
            if (!this.isUsed && other && other.constructor && other.constructor.name === 'Player') {
                this.isUsed = true;
                if (this.game && typeof this.game.gainLife === 'function') {
                    this.game.gainLife(1);
                }
                this.kill();
            }
        });
    }
}
