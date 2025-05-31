import { Actor, Label, Vector, FontUnit, Color, Font } from 'excalibur';
import { Resources } from './resources';

export class UI extends Actor {
    #maxLives;
    #currentHealth;
    #score;
    healthbarSegments = [];
    scoreText;

    constructor(maxLives = 5) {
        super();
        this.#maxLives = maxLives;
        this.#currentHealth = maxLives;
        this.#score = 0;
    }

    onInitialize(engine) {
        this.scoreText = new Label({
            text: 'Score: 0',
            pos: new Vector(20, 10),
            font: new Font({ family: 'Arial', size: 20, unit: FontUnit.Px, color: Color.White })
        });
        this.addChild(this.scoreText);

        const segmentWidth = 40, segmentHeight = 20, startX = 20, startY = 40;
        for (let i = 0; i < this.#maxLives; i++) {
            const segment = new Actor({
                x: startX + i * (segmentWidth + 4),
                y: startY,
                width: segmentWidth,
                height: segmentHeight,
                anchor: Vector.Zero
            });
            const sprite = Resources.Health?.toSprite?.();
            if (sprite) {
                sprite.width = segmentWidth;
                sprite.height = segmentHeight;
                segment.graphics.use(sprite);
            } else {
                segment.color = Color.Green;
            }
            this.addChild(segment);
            this.healthbarSegments.push(segment);
        }
    }

    setHealth(current, max) {
        this.#currentHealth = current;
        this.#maxLives = max;

        // Clamp current to max
        current = Math.max(0, Math.min(current, max));
        for (let i = 0; i < this.healthbarSegments.length; i++) {
            if (i < current) {
                this.healthbarSegments[i].visible = true;
                const sprite = Resources.Health?.toSprite?.();
                if (sprite) {
                    sprite.width = this.healthbarSegments[i].width;
                    sprite.height = this.healthbarSegments[i].height;
                    this.healthbarSegments[i].graphics.use(sprite);
                } else {
                    this.healthbarSegments[i].color = Color.Green;
                }
            } else {
                this.healthbarSegments[i].visible = true;
                this.healthbarSegments[i].graphics.use(null);
                this.healthbarSegments[i].color = Color.Gray;
            }
        }
    }

    updateScore(score) {
        this.#score = score;
        if (this.scoreText) this.scoreText.text = `Score: ${score}`;
    }

    getHealth() {
        return this.#currentHealth;
    }

    getMaxLives() {
        return this.#maxLives;
    }

    getScore() {
        return this.#score;
    }
}
