import { Actor, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Background extends Actor {
    constructor() {
        super({
            x: 0,
            y: 0,
            width: 1280, // match game width
            height: 720,  // match game height
            anchor: new Vector(0, 0)
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
// This class creates a background that scrolls left across the screen. When it goes completely off-screen, it resets to the right side, creating a continuous scrolling effect. You can add this class to your game scene to enhance the visual experience. If you have any further questions or need additional features, feel free to ask!