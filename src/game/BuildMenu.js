import * as PIXI from 'pixijs';
import { BuildMenuButton } from './BuildMenuButton';
import { eventBus } from '../system/EventBus';

const menuButtonXOffset = 130;
const confirmationButtonDefaultXOffset = 20;

export class BuildMenu {
    constructor(xPosition, yPosition) {
        this._selectedStairVariant = null;
        this._menuButtons = [];
        this._confirmationButton = null;

        this.container = new PIXI.Container();
        this.container.visible = false;
        this.container.sortableChildren = true;

        this.container.x = xPosition;
        this.container.y = yPosition;

        this.renderStairVariants();
        this.renderConfirmationButton();

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

    renderConfirmationButton() {
        this._confirmationButton = PIXI.Sprite.from(PIXI.Assets.get('menu-ok'));
        this._confirmationButton.x = confirmationButtonDefaultXOffset;
        this._confirmationButton.y = 60;

        this._confirmationButton.anchor.set(0.5, 0);
        this._confirmationButton.visible = false;
        this._confirmationButton.interactive = true;
        this._confirmationButton.cursor = 'pointer';

        this.container.addChild(this._confirmationButton);
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

        this._confirmationButton.visible = true;
        this._confirmationButton.x =
            confirmationButtonDefaultXOffset + menuButtonXOffset * (variantIndex - 1);
    }
}
