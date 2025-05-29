import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Background extends Actor {
    constructor() {
        super({
            x: 0,
            y: 0,
            width: 1280, // match game width
            height: 720,  // match game height
            anchor: { x: 0, y: 0 }
        });
        // Stretch the sprite to fit the screen
        const sprite = Resources.Achtergrond.toSprite();
        sprite.width = 1280;
        sprite.height = 720;
        this.graphics.use(sprite);
        this.vel = new Vector(-100, 0); // Move left at 100 px/sec
    }

    onPreUpdate(engine, delta) {
        // If the background is completely out of view, reset to right
        if (this.pos.x + this.width <= 0) {
            this.pos.x = engine.drawWidth;
        }
    }
}
