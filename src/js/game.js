import '../css/style.css'
import { Engine, Vector, DisplayMode, SolverStrategy, Timer } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { Background } from './background.js';
import { Lives } from './lives.js';
import { UI } from './ui.js';
import { HealthPack } from './healthpack.js';
import { AlienEnemy } from './alienEnemy.js';
import { MineEnemy } from './mineEnemy.js'; // Import MineEnemy


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
        if (this.lives.get() <= 0) {
            setTimeout(() => window.location.reload(), 1000);
        }
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

        // Enemy spawn logic using Timer
        const laneCount = 5;
        const allLanePositions = Array.from({length: laneCount}, (_, i) => {
            return (i * (this.drawHeight - 40) / (laneCount - 1)) + 20;
        });
        const lanePositions = allLanePositions.slice(1, -1);

        const enemiesPerWave = 3; // aantal enemies per spawn

        const enemyTimer = new Timer({
            fcn: () => {
                // Shuffle lanes zodat je geen dubbele lane pakt
                const lanes = [...lanePositions].sort(() => 0.5 - Math.random());
                for (let i = 0; i < enemiesPerWave; i++) {
                    const y = lanes[i];
                    let enemy;
                    const rand = Math.random();
                    if (rand < 0.33) {
                        enemy = new Enemy(this.drawWidth, y, 80, 80, Resources.Fish.toSprite(), -150); // Fish
                    } else if (rand < 0.66) {
                        enemy = new AlienEnemy(this.drawWidth, y); // Alien
                    } else {
                        enemy = new MineEnemy(this.drawWidth, y); // Mine
                    }
                    this.add(enemy);
                }
            },
            interval: 2500,
            repeats: true
        });
        this.add(enemyTimer);
        enemyTimer.start();

        // Voeg healthpack toe op een random lane, bijvoorbeeld elke 10 seconden
        const healthPackTimer = new Timer({
            fcn: () => {
                const lanes = [...lanePositions];
                const shuffled = lanes.sort(() => 0.5 - Math.random());
                const y = shuffled[0];
                const healthPack = new HealthPack(this.drawWidth, y, this);
                this.add(healthPack);
            },
            interval: 10000, // elke 10 seconden
            repeats: true
        });
        this.add(healthPackTimer);
        healthPackTimer.start();

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
                if (
                    actor instanceof Enemy ||
                    actor instanceof AlienEnemy ||
                    actor instanceof MineEnemy
                ) {
                    if (actor.pos.x + actor.width < 0) {
                        actor.kill();
                    }
                }
            });
        });
    }
}

new Game()
