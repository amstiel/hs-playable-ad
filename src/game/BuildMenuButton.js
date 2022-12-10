import * as PIXI from 'pixijs';
import gsap from 'gsap';
import { eventBus } from '../system/EventBus';

export class BuildMenuButton {
    constructor(stairSprite, xPosition, yPosition, index) {
        this._stairSprite = stairSprite;
        this._variantNumber = index;
        this._isSelected = false;
        this._animation = {
            scale: null,
            opacity: null,
        };

        this.container = new PIXI.Container();
        this.container.pivot.set(50, 50);

        // Make menu button clickable
        this.container.interactive = true;
        this.container.cursor = 'pointer';
        this.container.on('pointerdown', () => this.onClick());

        // Hide menu button by default
        this.container.alpha = 0;
        this.container.x = xPosition;
        this.container.y = yPosition;

        // We create buttons only after menu assets are loaded,
        // so we can get textures from loaded cache
        this._defaultTexture = PIXI.Assets.get('menu-item');
        this._selectedTexture = PIXI.Assets.get('menu-choosed');

        this._buttonSprite = new PIXI.Sprite(this._defaultTexture);

        this._stairSprite.x = (this._buttonSprite.width - this._stairSprite.width) / 2;
        this._stairSprite.y = (this._buttonSprite.height - this._stairSprite.height) / 2 - 6;

        this.container.addChild(this._buttonSprite);
        this.container.addChild(stairSprite);

        this.initAnimation(index);
    }

    get isSelected() {
        return this._isSelected;
    }

    set isSelected(isSelected) {
        this._isSelected = isSelected;
        this._buttonSprite.texture = isSelected ? this._selectedTexture : this._defaultTexture;
    }

    onClick() {
        eventBus.emit('stair-variant-select', {
            selectedStairVariant: this._variantNumber,
        });
    }

    restartAnimation() {
        this._animation.scale.restart(true);
        this._animation.opacity.restart(true);
    }

    initAnimation(index) {
        this._animation.scale = gsap.to(this.container.scale, {
            ease: 'power2.out',
            startAt: {
                x: 0,
                y: 0,
            },
            x: 1,
            y: 1,
            duration: 0.5,
            delay: 0.25 * index,
        });

        this._animation.opacity = gsap.to(this.container, {
            ease: 'power2.out',
            startAt: {
                alpha: 0,
            },
            alpha: 1,
            duration: 0.5,
            delay: 0.25 * index,
        });
    }
}
