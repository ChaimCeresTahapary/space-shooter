import { Actor, Vector, Keys } from 'excalibur';
import { Bullet } from './bullet.js';
import { Resources } from './resources.js';

export class Player extends Actor {

    speed = 300;
    onEat = () => {} // default to empty function
    useWASD = false; // enable WASD movement for this shark

    constructor() {
        super({ width: Resources.Spaceship.width * 1, height: Resources.Spaceship.height * 1 }); // Make sprite 3x bigger

        this.graphics.use(Resources.Spaceship.toSprite());

        this.pos = new Vector(400, 400);
        this.vel = new Vector(0, 0);
    }

    handleCollision(event) {
        const other = event.other;
        // If player collides with enemy, player dies (optional)
        if (other.constructor.name === 'Enemy') {
            this.kill();
        }
        // If bullet collides with enemy, enemy dies
        if (other.constructor.name === 'Bullet') {
            // Do nothing for player
        }
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.handleCollision(event));
        this.lastShotTime = 0;
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
    let yspeed = 0;

    if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
      yspeed = -200;
    }

    if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
      yspeed = 200;
    }

    if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
      xspeed = 200
    }

    if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
      xspeed = -200
    }

    this.vel = new Vector(xspeed, yspeed);
    this.graphics.flipHorizontal = (this.vel.x < 0)

        // Shooting logic (spacebar)
        if (engine.input.keyboard.isHeld(Keys.Space)) {
            const now = Date.now();
            if (!this.lastShotTime || now - this.lastShotTime > 250) { // 250ms cooldown
                const bullet = new Bullet(this.pos.x + 40, this.pos.y - this.height / 3);
                engine.currentScene.add(bullet);
                this.lastShotTime = now;
            }
        }
    }

    
}