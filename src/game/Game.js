import * as PIXI from 'pixijs';
import { Stair } from './Stair.js';
import gameConfig from './config.json';

const { screenWidth, screenHeight } = gameConfig;

export class Game {
    container = null;
    stair = null;

    constructor() {
        this.container = new PIXI.Container();
    }

    start() {
        this.renderBackground();
        this.renderStair();
    }

    renderBackground() {
        const backgroundSprite = new PIXI.Sprite(PIXI.Assets.get('background'));
        this.container.addChild(backgroundSprite);
    }

    renderStair() {
        this.stair = new Stair(screenWidth);
        this.container.addChild(this.stair.sprite);
    }
}
