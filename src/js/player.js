import { Actor, Vector, Keys, CollisionType } from 'excalibur';
import { Bullet } from './Bullet.js';
import { Resources } from './resources.js';

export class Player extends Actor {
    #speed = 300;
    #lastShotTime = 0;
    #lives;
    #score;

    constructor(game) {
        super({ width: 182, height: 182 });
        const sprite = Resources.Biker.toSprite();
        sprite.width = 192;
        sprite.height = 192;
        this.graphics.use(sprite);
        this.pos = new Vector(400, 400);
        this.vel = Vector.Zero;
        this.#lives = 5;
        this.#score = 0;
        this.game = game;
        this.body.collisionType = CollisionType.Active;
        this.body.useGravity = false; // <-- Add this line
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.handleCollision(event));
    }

    handleCollision(event) {
        // Enemy collision handled in enemy.js
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0, yspeed = 0;
        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) yspeed = -200;
        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) yspeed = 200;
        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) xspeed = 200;
        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) xspeed = -200;
        this.vel = new Vector(xspeed, yspeed);
        this.graphics.flipHorizontal = (this.vel.x < 0);

        if (engine.input.keyboard.isHeld(Keys.Space)) {
            const now = Date.now();
            if (!this.#lastShotTime || now - this.#lastShotTime > 250) {
                const bullet = new Bullet(this.pos.x + 40, this.pos.y - this.height / 3, this.game);
                engine.currentScene.add(bullet);
                this.#lastShotTime = now;
            }
        }

        // Clamp position so player stays on screen
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 1.2;
        this.pos.x = Math.max(halfWidth, Math.min(engine.drawWidth - halfWidth, this.pos.x));
        this.pos.y = Math.max(halfHeight, Math.min(engine.drawHeight - halfHeight, this.pos.y));
    }

    getLives() {
        return this.#lives;
    }

    loseLife(amount = 1) {
        this.#lives -= amount;
        if (this.#lives < 0) this.#lives = 0;
    }

    addScore(points) {
        this.#score += points;
    }

    getScore() {
        return this.#score;
    }

    // ...andere player-methodes...
}