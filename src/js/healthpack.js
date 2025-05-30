import { Actor, Vector, Color, Rectangle } from 'excalibur';
import { Resources } from './resources';

export class HealthPack extends Actor {
    isUsed = false;

    constructor(x, y, game) {
        super({ width: 80, height: 80 });
        this.pos = new Vector(x, y);
        this.game = game;
    }

    onInitialize(engine) {
        let sprite = Resources.Health?.toSprite?.();
        if (sprite) {
            sprite.width = 80;
            sprite.height = 80;
            this.graphics.use(sprite);
        } else {
            this.graphics.use(new Rectangle({ width: 80, height: 80, color: Color.Red }));
        }
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

    onPreUpdate(engine, delta) {
        this.vel = new Vector(-100, 0);
        if (this.pos.x + 80 < 0) {
            this.kill();
        }
    }
}
