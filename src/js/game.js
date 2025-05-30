import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { platform } from './platform.js'    
import { Enemy } from './enemy.js';
import { Background } from './background.js';
import { Lives } from './lives.js';
import { UI } from './ui.js';

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
        this.score = 0;
        this.lives = new Lives(5);
        this.ui = new UI();
        this.start(ResourceLoader).then(() => this.startGame())
    }

    addScore(amount) {
        this.score += amount;
        if (this.ui) this.ui.updateScore(this.score);
    }

    loseLife(amount = 1) {
        this.lives.decrease(amount);
        if (this.ui) this.ui.setHealth(this.lives.get(), this.lives.maxLives);
    }

    gainLife(amount = 1) {
        this.lives.increase(amount);
        if (this.ui) this.ui.setHealth(this.lives.get(), this.lives.maxLives);
    }

    startGame() {
        // Add scrolling background
        const bg1 = new Background();
        const bg2 = new Background();
        bg2.pos.x = bg1.width; // Place second bg right after the first
        this.add(bg1);
        this.add(bg2);

        // Pass 'this' (the Game instance) to Player
        const player = new Player(this); // Pass Game instance to Player
        this.add(player);
        // Define lanes (remove top and bottom lane, use only middle 3 lanes)
        const laneCount = 5;
        // Calculate all 5 lane positions
        const allLanePositions = Array.from({length: laneCount}, (_, i) => {
            return (i * (this.drawHeight - 40) / (laneCount - 1)) + 20; // 20px padding top/bottom
        });
        // Use only the middle 3 lanes (remove first and last)
        const lanePositions = allLanePositions.slice(1, -1);
        this.enemyInterval = setInterval(() => {
            // Pick a random subset of lanes (1 to lanePositions.length enemies per spawn)
            const lanes = [...lanePositions];
            const enemiesToSpawn = Math.floor(Math.random() * lanes.length) + 1;
            const shuffled = lanes.sort(() => 0.5 - Math.random());
            for (let i = 0; i < enemiesToSpawn; i++) {
                const y = shuffled[i];
                const enemy = new Enemy(this.drawWidth, y, player);
                this.add(enemy);
            }
        }, 2000);
        // Remove or comment out the platform for now if not needed
        // this.add(new platform(200, 400));
        this.add(this.ui);
        // UI update loop
        this.on('preupdate', () => {
            if (this.ui) {
                this.ui.updateScore(this.score);
                this.ui.setHealth(this.lives.get(), this.lives.maxLives);
            }
        });
    }
}

new Game()
