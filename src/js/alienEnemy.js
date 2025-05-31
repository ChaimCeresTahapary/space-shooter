import { Enemy } from './enemy.js';
import { Resources } from './resources.js';

export class AlienEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 100, 100, Resources.Alien.toSprite(), -120);
    }
}