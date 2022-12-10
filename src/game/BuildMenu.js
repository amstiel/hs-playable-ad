import * as PIXI from 'pixijs';
import { BuildMenuButton } from './BuildMenuButton';
import { eventBus } from '../system/EventBus';

const menuButtonXOffset = 130;

export class BuildMenu {
    constructor(xPosition, yPosition) {
        this._selectedStairVariant = null;
        this._menuButtons = [];

        this.container = new PIXI.Container();
        this.container.visible = false;
        this.container.sortableChildren = true;

        this.container.x = xPosition;
        this.container.y = yPosition;

        this.renderStairVariants();

        eventBus.on('stair-variant-select', ({ detail }) => {
            this.selectStairVariant(detail.selectedStairVariant);
        });
    }

    renderStairVariants() {
        const stairVariants = [
            PIXI.Sprite.from(PIXI.Assets.get('menu-stair-1')),
            PIXI.Sprite.from(PIXI.Assets.get('menu-stair-2')),
            PIXI.Sprite.from(PIXI.Assets.get('menu-stair-3')),
        ];

        stairVariants.forEach((stairVariant, index) => {
            const menuButtonX = index * menuButtonXOffset;
            const menuButtonY = 0;

            this._menuButtons.push(
                new BuildMenuButton(stairVariant, menuButtonX, menuButtonY, index + 1)
            );
            this._menuButtons.map((menuButton) => this.container.addChild(menuButton.container));
        });
    }

    restartButtonsAnimation() {
        this._menuButtons.forEach((button) => button.restartAnimation());
    }

    show() {
        this.restartButtonsAnimation();
        this.container.visible = true;
    }

    hide() {
        this.container.visible = false;
    }

    selectStairVariant(variantIndex) {
        this._selectedStairVariant = variantIndex;

        this._menuButtons.forEach((menuButton) => {
            menuButton.isSelected = false;
        });

        this._menuButtons[variantIndex - 1].isSelected = true;
    }
}
