import * as PIXI from 'pixijs';
import { Stair } from './Stair.js';
import gameConfig from './config.json';

const { screenWidth, screenHeight } = gameConfig;

export class Game {
    container = null;
    stair = null;
    buildButton = null;

    constructor() {
        this.container = new PIXI.Container();
    }

    start() {
        this.renderBackground();
        this.renderStair();
        this.renderBuildButton();
    }

    renderBackground() {
        const backgroundSprite = new PIXI.Sprite(PIXI.Assets.get('background'));
        this.container.addChild(backgroundSprite);
    }

    renderStair() {
        this.stair = new Stair(screenWidth);
        this.container.addChild(this.stair.sprite);
    }

    renderBuildButton() {
        this.buildButton = new PIXI.Sprite(PIXI.Assets.get('hammer-button'));
        this.buildButton.x = screenWidth - this.stair.sprite.width / 2;
        this.buildButton.y = this.stair.sprite.height / 2 - this.buildButton.height;

        this.buildButton.interactive = true;
        this.buildButton.cursor = "pointer";
        this.buildButton.on('pointerdown', () => {
            console.log('build');
        });

        this.container.addChild(this.buildButton);
    }
}
