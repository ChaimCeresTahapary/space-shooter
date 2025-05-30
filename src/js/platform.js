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
        // Add visible barriers to keep the player inside the map (for debugging)
        // Left barrier
        const leftBarrier = new Actor({
            x: 10,
            y: engine.drawHeight / 2,
            width: 20,
            height: engine.drawHeight,
            color: Color.Red
        });
        leftBarrier.body.collisionType = CollisionType.Fixed;
        engine.add(leftBarrier);
        // Right barrier
        const rightBarrier = new Actor({
            x: engine.drawWidth - 10,
            y: engine.drawHeight / 2,
            width: 20,
            height: engine.drawHeight,
            color: Color.Red
        });
        rightBarrier.body.collisionType = CollisionType.Fixed;
        engine.add(rightBarrier);
        // Top barrier
        const topBarrier = new Actor({
            x: engine.drawWidth / 2,
            y: 10,
            width: engine.drawWidth,
            height: 20,
            color: Color.Red
        });
        topBarrier.body.collisionType = CollisionType.Fixed;
        engine.add(topBarrier);
        // Bottom barrier
        const bottomBarrier = new Actor({
            x: engine.drawWidth / 2,
            y: engine.drawHeight - 10,
            width: engine.drawWidth,
            height: 20,
            color: Color.Red
        });
        bottomBarrier.body.collisionType = CollisionType.Fixed;
        engine.add(bottomBarrier);
    }

}