import * as PIXI from 'pixijs';

export class Game {
    container = null;

    constructor() {
        this.container = new PIXI.Container();
    }

    start() {
        this.renderBackground();
    }

    renderBackground() {
        const backgroundSprite = new PIXI.Sprite(PIXI.Assets.get('background'));
        this.container.addChild(backgroundSprite);
    }
}
