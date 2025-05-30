export class UI {
    constructor() {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }

    update(score, lives) {
        this.container.innerText = `${score}  ${lives}`;
    }
}
