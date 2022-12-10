import * as PIXI from 'pixijs';
import gsap from 'gsap';
import { Stair } from './Stair';
import { BuildMenu } from './BuildMenu';
import { eventBus } from '../system/EventBus';
import gameConfig from './config.json';

const { screenWidth, screenHeight } = gameConfig;

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

        eventBus.on('stair-variant-confirm', () => {
            this._menu.hide();
            this.renderFinalModal();
        });
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

    renderFinalModal() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000, 0.4);
        graphics.drawRect(0, 0, screenWidth, screenHeight);
        graphics.endFill();
        graphics.zIndex = 1;
        this.container.addChild(graphics);

        const finalModal = new PIXI.Sprite(PIXI.Assets.get('final-modal'));
        finalModal.anchor.set(0.5, 0.5);
        finalModal.x = screenWidth / 2;
        finalModal.y = screenHeight / 2 - 80;
        finalModal.zIndex = 2;
        gsap.to(finalModal.scale, {
            startAt: {
                x: 0.7,
                y: 0.7,
            },
            x: 1,
            y: 1,
            duration: 0.25,
        });
        this.container.addChild(finalModal);
    }

    openMenu() {
        this._menu.show();
        this._buildButton.visible = false;
    }
}
