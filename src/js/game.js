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
        this.add(new Player());
        // Remove or comment out the platform for now if not needed
        // this.add(new platform(200, 400));
    }
}

new Game()
