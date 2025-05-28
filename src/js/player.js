import { Actor, CollisionType, Color } from "excalibur";

export class Player extends Actor {
    constructor (x,y){
        super({
            x, y,
            width: 200,
            height: 50,
            color: Color.Red
           
        });
        
    }
    onInitialize(engine) {
        this.body.collisionType = CollisionType.Active;
        this.body.bounciness = 1;
    }
}