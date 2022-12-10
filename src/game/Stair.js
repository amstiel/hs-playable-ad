import * as PIXI from 'pixijs';
import gsap from 'gsap';
import { eventBus } from '../system/EventBus';

const animationOffsetY = 100;

export class Stair {
    constructor(xPosition) {
        this._positionAnimation = null;
        this._opacityAnimation = null;

        this.sprite = new PIXI.Sprite(PIXI.Assets.get('old-stair'));
        const yPosition = this.sprite.height + 50;
        this.sprite.x = xPosition;
        this.sprite.y = yPosition;
        this.sprite.zIndex = 2;
        this.sprite.anchor.set(1, 1);

        this.initAnimation(yPosition);

        eventBus.on('stair-variant-select', (event) => {
            this.changeStairVariant(event.detail.selectedStairVariant);
        });
    }

    initAnimation(yPosition) {
        this._positionAnimation = gsap.to(this.sprite, {
            ease: 'bounce',
            y: yPosition,
            startAt: {
                y: yPosition - animationOffsetY,
            },
            paused: true,
            duration: 0.5,
        });

        this._opacityAnimation = gsap.to(this.sprite, {
            startAt: {
                alpha: 0,
            },
            alpha: 1,
            paused: true,
            duration: 0.4,
        });
    }

    restartAnimation() {
        this._opacityAnimation.restart();
        this._positionAnimation.restart();
    }

    changeStairVariant(variantNumber) {
        this.sprite.texture = PIXI.Assets.get(`stair-variant-${variantNumber}`);
        this.restartAnimation();
    }
}
