import { ScreenElement, Label, Vector, FontUnit, Color, Actor, Font } from 'excalibur';
import { Resources } from './resources';

export class UI extends ScreenElement {
    healthbarSegments = [];
    maxLives = 5;
    scoreText;

    constructor(maxLives = 5) {
        super();
        this.maxLives = maxLives;
    }

    onInitialize(engine) {
        this.scoreText = new Label({
            text: 'Score: 0',
            pos: new Vector(20, 10),
            font: new Font({ family: 'Arial', size: 20, unit: FontUnit.Px, color: Color.White })
        });
        this.addChild(this.scoreText);

        const segmentWidth = 40, segmentHeight = 20, startX = 20, startY = 40;
        for (let i = 0; i < this.maxLives; i++) {
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

    updateScore(score) {
        if (this.scoreText) this.scoreText.text = `Score: ${score}`;
    }

    setHealth(current, max) {
        for (let i = 0; i < this.healthbarSegments.length; i++) {
            this.healthbarSegments[i].visible = i < current;
        }
    }
}
