import { Enemy } from './enemy.js';
import { Resources } from './resources.js';

export class MineEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 60, 60, Resources.Mine.toSprite(), -100);
    }
}