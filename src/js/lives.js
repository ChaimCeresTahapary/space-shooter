export class Lives {
    lives;
    maxLives;

    constructor(startLives = 3) {
        this.lives = startLives;
        this.maxLives = startLives;
    }

    decrease(amount = 1) {
        this.lives = Math.max(0, this.lives - amount);
    }

    increase(amount = 1) {
        this.lives = Math.min(this.maxLives, this.lives + amount);
    }

    get() {
        return this.lives;
    }

    reset(startLives = 3) {
        this.lives = startLives;
        this.maxLives = startLives;
    }
}
