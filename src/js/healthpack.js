import { Actor, Vector, Color, Rectangle } from 'excalibur';
import { Resources } from './resources';
import { Player } from './player.js';

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
            sprite.width = 75;
            sprite.height = 75;
            this.graphics.use(sprite);
        } else {
            this.graphics.use(new Rectangle({ width: 80, height: 80, color: Color.Red }));
        }
        this.on('collisionstart', (event) => {
            const other = event.other?.owner;
            if (!this.isUsed && other instanceof Player) {
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
//here is the HealthPack class that can be used in your game. It creates a health pack that can be collected by the player to gain a life. The health pack moves left across the screen and disappears when it goes off-screen or when collected by the player. If you have any further questions or need additional features, feel free to ask!
// This class can be added to your game scene, and it will automatically handle collisions with the player.