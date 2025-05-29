import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { platform } from './platform.js'    
import { Enemy } from './enemy.js';

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
        const player = new Player();
        this.add(player);
        // Spawn enemies every 2 seconds
        this.enemyInterval = setInterval(() => {
            // Spawn at random x at the top
            const x = Math.random() * this.drawWidth;
            const enemy = new Enemy(x, 0, player);
            this.add(enemy);
        }, 2000);
        // Remove or comment out the platform for now if not needed
        // this.add(new platform(200, 400));
    }
}

new Game()
