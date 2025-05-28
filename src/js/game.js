import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { platform } from './platform.js'    

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver:SolverStrategy.Realistic,
                gravity: new Vector(0,800)
            }
        });
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.add(new Player(300,200));

        this.add(new platform(200, 400));
}
}

new Game()
