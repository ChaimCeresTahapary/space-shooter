import { Actor, CollisionType, Color } from "excalibur";

export class platform extends Actor {
    constructor(x, y, width, height) {
        super({
            x, y,
            width: 3000,
            height: 50,
            color: Color.Yellow
        });
        
    }
    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed;

    }

}