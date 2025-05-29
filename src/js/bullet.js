import { Actor, Vector, Color } from 'excalibur';

export class Bullet extends Actor {
    constructor(x, y) {
        super({ width: 10, height: 20, color: Color.Yellow });
        this.pos = new Vector(x, y);
        this.vel = new Vector(400, 0); // Move upward
    }
}