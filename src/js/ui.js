import { ScreenElement, Label, Vector, FontUnit, Color, Actor, Font } from 'excalibur';
import { Resources } from './resources';

export class UI extends ScreenElement {
    scoreText;
    healthbar;
    barBackground;
    maxLives = 5;

    onInitialize(engine) {
        // Score label
        this.scoreText = new Label({
            text: 'Score: 0',
            pos: new Vector(20, 10),
            font: new Font({
                family: 'Arial',
                size: 20,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.scoreText.z = 200;
        this.addChild(this.scoreText);

        // Healthbar background (drawn first, so it's behind the bar)
        this.barBackground = new Actor({ x: 20, y: 40, width: 200, height: 20, color: Color.fromRGB(255,255,255,0.7), anchor: Vector.Zero });
        this.barBackground.z = 100;
        this.addChild(this.barBackground);
        // Healthbar foreground
        this.healthbar = new Actor({ x: 20, y: 40, width: 200, height: 20, color: Color.Green, anchor: Vector.Zero });
        this.healthbar.z = 101;
        this.addChild(this.healthbar);
        this.healthbar.scale = new Vector(1, 1);
        this.healthbar.visible = true;
        this.barBackground.visible = true;
    }

    updateScore(score) {
        if (this.scoreText) this.scoreText.text = `Score: ${score}`;
    }

    setHealth(current, max) {
        if (!this.healthbar || !this.barBackground) return;
        let percent = Math.max(0, Math.min(1, current / max));
        this.healthbar.scale = new Vector(Math.max(percent, 0.01), 1);
        this.healthbar.visible = true;
        this.barBackground.visible = true;
        if (percent > 0.6) this.healthbar.color = Color.Green;
        else if (percent > 0.3) this.healthbar.color = Color.Yellow;
        else this.healthbar.color = Color.Red;
    }
}
