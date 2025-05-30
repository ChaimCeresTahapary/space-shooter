export class Lives {
    constructor(startLives = 3) {
        this.lives = startLives;
        this.maxLives = startLives;
    }

    decrease(amount = 1) {
        this.lives -= amount;
        if (this.lives < 0) this.lives = 0;
    }

    increase(amount = 1) {
        this.lives += amount;
        if (this.lives > this.maxLives) this.lives = this.maxLives;
    }

    get() {
        return this.lives;
    }

    reset(startLives = 3) {
        this.lives = startLives;
        this.maxLives = startLives;
    }
}
