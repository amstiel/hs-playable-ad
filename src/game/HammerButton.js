import * as PIXI from 'pixijs';
import gsap from 'gsap';

export class HammerButton {
    constructor(xPosition, yPosition, onClick) {
        this.sprite = new PIXI.Sprite(PIXI.Assets.get('hammer-button'));

        this.sprite.x = xPosition;
        this.sprite.y = yPosition;
        this.sprite.zIndex = 3;
        this.sprite.alpha = 0;

        this.sprite.interactive = true;
        this.sprite.cursor = 'pointer';
        this.sprite.on('pointerdown', () => {
            onClick();
        });

        this.initAnimation();
    }

    initAnimation() {
        gsap.to(this.sprite, {
            startAt: {
                y: this.sprite.y - 75,
                alpha: 0,
            },
            y: this.sprite.y,
            alpha: 1,
            duration: 0.15,
            delay: 2,
        });
    }

    hide() {
        this.sprite.visible = false;
    }
}
