import * as PIXI from 'pixijs';
import { Stair } from './Stair';
import { BuildMenu } from './BuildMenu';
import gameConfig from './config.json';

const { screenWidth } = gameConfig;

export class Game {
    constructor() {
        this.container = new PIXI.Container();
        this._stair = null;
        this._buildButton = null;
    }

    start() {
        this.renderBackground();
        this.renderStair();
        this.renderBuildButton();
        this.renderMenu();
    }

    renderBackground() {
        const backgroundSprite = new PIXI.Sprite(PIXI.Assets.get('background'));
        this.container.addChild(backgroundSprite);
    }

    renderStair() {
        this._stair = new Stair(screenWidth);
        this.container.addChild(this._stair.sprite);
    }

    renderMenu() {
        const menuXPosition = screenWidth - 520;
        const menuYPosition = 60;
        this._menu = new BuildMenu(menuXPosition, menuYPosition);
        this.container.addChild(this._menu.container);
    }

    renderBuildButton() {
        this._buildButton = new PIXI.Sprite(PIXI.Assets.get('hammer-button'));
        this._buildButton.x = screenWidth - this._stair.sprite.width / 2;
        this._buildButton.y = this._stair.sprite.height / 2 - this._buildButton.height + 100;

        this._buildButton.interactive = true;
        this._buildButton.cursor = 'pointer';
        this._buildButton.on('pointerdown', () => {
            this.openMenu();
        });

        this.container.addChild(this._buildButton);
    }

    openMenu() {
        this._menu.show();
        this._buildButton.visible = false;
    }
}
