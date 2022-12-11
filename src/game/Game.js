import * as PIXI from 'pixijs';
import { Stair } from './Stair';
import { BuildMenu } from './BuildMenu';
import { Decorations } from './Decorations';
import { FinalModal } from './FinalModal';
import { CallToActionButton } from './CallToActionButton';
import { HammerButton } from './HammerButton';
import { eventBus } from '../system/EventBus';
import gameConfig from './config.json';

const { screenWidth, screenHeight } = gameConfig;

export class Game {
    constructor() {
        this.container = new PIXI.Container();
        this.container.sortableChildren = true;
        this._stair = null;
        this._hammerButton = null;
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
        const ctaButton = new CallToActionButton();
        this.container.addChild(ctaButton.sprite);
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
        this._hammerButton = new HammerButton(
            screenWidth - this._stair.sprite.width / 2,
            this._stair.sprite.height / 2 - 80,
            () => {
                this.openMenu();
            }
        );

        this.container.addChild(this._hammerButton.sprite);
    }

    renderFinalModal() {
        const finalModal = new FinalModal();
        finalModal.render();
        this.container.addChild(finalModal.container);
    }

    openMenu() {
        this._menu.show();
        this._hammerButton.hide();
    }
}
