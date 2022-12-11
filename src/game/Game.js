import * as PIXI from 'pixijs';
import gsap from 'gsap';
import { Stair } from './Stair';
import { BuildMenu } from './BuildMenu';
import { Decorations } from './Decorations';
import { eventBus } from '../system/EventBus';
import gameConfig from './config.json';

const { screenWidth, screenHeight } = gameConfig;

export class Game {
    constructor() {
        this.container = new PIXI.Container();
        this.container.sortableChildren = true;
        this._stair = null;
        this._buildButton = null;
    }

    start() {
        this.renderBackground();
        this.renderStair();
        this.renderBuildButton();
        this.renderMenu();
        this.renderCallToActionButton();
        this.renderLogo();
        this.renderAustin();
        this.renderDecorations();

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
        this._stair.sprite.zIndex = 2;
        this.container.addChild(this._stair.sprite);
    }

    renderLogo() {
        const homescapesLogo = new PIXI.Sprite(PIXI.Assets.get('homescapes-logo'));
        homescapesLogo.x = 32;
        homescapesLogo.y = 5;
        homescapesLogo.zIndex = 5;
        this.container.addChild(homescapesLogo);
    }

    renderAustin() {
        const austin = new PIXI.Sprite(PIXI.Assets.get('austin'));
        austin.x = screenWidth / 2;
        austin.y = screenHeight / 2 - austin.height / 2 - 60;
        this.container.addChild(austin);
    }

    renderCallToActionButton() {
        const ctaButtonSprite = new PIXI.Sprite(PIXI.Assets.get('cta-button'));

        ctaButtonSprite.interactive = true;
        ctaButtonSprite.cursor = 'pointer';
        ctaButtonSprite.on('pointerdown', () => {
            window.open(
                'https://play.google.com/store/apps/details?id=com.playrix.homescapes&hl=en&gl=US'
            );
        });
        ctaButtonSprite.anchor.set(0.5, 0.5);

        ctaButtonSprite.zIndex = 5;

        ctaButtonSprite.x = screenWidth / 2;
        ctaButtonSprite.y = screenHeight - ctaButtonSprite.height / 2 - 10;

        gsap.to(ctaButtonSprite.scale, {
            ease: 'power2.out',
            x: 1.07,
            y: 1.07,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
        });

        this.container.addChild(ctaButtonSprite);
    }

    renderMenu() {
        const menuXPosition = screenWidth - 520;
        const menuYPosition = 60;
        this._menu = new BuildMenu(menuXPosition, menuYPosition);
        this._menu.container.zIndex = 4;
        this.container.addChild(this._menu.container);
    }

    renderDecorations() {
        const decorations = new Decorations(this.container);
        decorations.render();
    }

    renderBuildButton() {
        this._buildButton = new PIXI.Sprite(PIXI.Assets.get('hammer-button'));
        this._buildButton.x = screenWidth - this._stair.sprite.width / 2;
        this._buildButton.y = this._stair.sprite.height / 2 - this._buildButton.height + 100;
        this._buildButton.zIndex = 3;

        this._buildButton.interactive = true;
        this._buildButton.cursor = 'pointer';
        this._buildButton.on('pointerdown', () => {
            this.openMenu();
        });

        this.container.addChild(this._buildButton);
    }

    renderFinalModal() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000, 0.6);
        graphics.drawRect(0, 0, screenWidth, screenHeight);
        graphics.endFill();
        graphics.zIndex = 4;
        this.container.addChild(graphics);

        const finalModal = new PIXI.Sprite(PIXI.Assets.get('final-modal'));
        finalModal.anchor.set(0.5, 0.5);
        finalModal.x = screenWidth / 2;
        finalModal.y = screenHeight / 2 - 80;
        finalModal.zIndex = 5;
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
