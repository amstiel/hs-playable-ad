import * as PIXI from 'pixijs';

export class Game {
    container = null;

    constructor() {
        this.container = new PIXI.Container();
        this.start();
    }

    async start() {
        const backgroundTexture = await PIXI.Assets.load('src/assets/sprites/background.png');
        const backgroundSprite = new PIXI.Sprite(backgroundTexture);
        this.container.addChild(backgroundSprite);
    }
}
