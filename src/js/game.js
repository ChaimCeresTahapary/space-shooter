import '../css/style.css'
import { Engine, Vector, DisplayMode, SolverStrategy } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { Background } from './background.js';
import { Lives } from './lives.js';
import { UI } from './ui.js';

export class Game extends Engine {
    #score = 0;
    #isDead = false;

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver:SolverStrategy.Arcade,
                gravity: new Vector(0,800)
            }
        });
        this.lives = new Lives(5);
        this.ui = new UI(this.lives.maxLives);
        this.start(ResourceLoader).then(() => this.startGame())
    }

    addScore(amount) {
        this.#score += amount;
        this.ui.updateScore(this.#score);
    }

    loseLife(amount = 1) {
        this.lives.decrease(amount);
        this.ui.setHealth(this.lives.get(), this.lives.maxLives);
    }

    gainLife(amount = 1) {
        this.lives.increase(amount);
        this.ui.setHealth(this.lives.get(), this.lives.maxLives);
    }

    startGame() {
        // Add scrolling background
        const bg1 = new Background();
        const bg2 = new Background();
        bg2.pos.x = bg1.width; // Place second bg right after the first
        this.add(bg1);
        this.add(bg2);

        // Add player
        const player = new Player(this);
        this.add(player);

        // Add UI
        this.add(this.ui);

        // Enemy spawn logic (already restored)
        const laneCount = 5;
        const allLanePositions = Array.from({length: laneCount}, (_, i) => {
            return (i * (this.drawHeight - 40) / (laneCount - 1)) + 20;
        });
        const lanePositions = allLanePositions.slice(1, -1);
        // Reduce spawn frequency and number of enemies per spawn
        this.enemyInterval = setInterval(() => {
            const lanes = [...lanePositions];
            // Only spawn 1 enemy at a time
            const shuffled = lanes.sort(() => 0.5 - Math.random());
            const y = shuffled[0];
            const enemy = new Enemy(this.drawWidth, y, player);
            this.add(enemy);
        }, 2500); // Spawn every 2.5 seconds instead of 2

        // UI update loop for healthbar and score (only update if changed)
        let lastHealth = this.lives.get();
        let lastScore = this.#score;
        this.on('preupdate', (engine, delta) => {
            if (this.ui && this.lives) {
                const currentHealth = this.lives.get();
                if (currentHealth !== lastHealth) {
                    this.ui.setHealth(currentHealth, this.lives.maxLives);
                    lastHealth = currentHealth;
                }
                if (this.#score !== lastScore) {
                    this.ui.updateScore(this.#score);
                    lastScore = this.#score;
                }
            }
            // Remove off-screen enemies
            this.currentScene.actors.forEach(actor => {
                if (actor instanceof Enemy && actor.pos.x + actor.width < 0) {
                    actor.kill();
                }
            });
        });
    }
}

new Game()
