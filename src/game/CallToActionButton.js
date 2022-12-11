import * as PIXI from 'pixijs';
import gsap from 'gsap';
import gameConfig from './config.json';

const { screenWidth, screenHeight } = gameConfig;

export class CallToActionButton {
    constructor() {
        this.sprite = new PIXI.Sprite(PIXI.Assets.get('cta-button'));

        this.sprite.interactive = true;
        this.sprite.cursor = 'pointer';
        this.sprite.on('pointerdown', () => {
            window.open(
                'https://play.google.com/store/apps/details?id=com.playrix.homescapes&hl=en&gl=US'
            );
        });
        this.sprite.anchor.set(0.5, 0.5);

        this.sprite.zIndex = 5;

        this.sprite.x = screenWidth / 2;
        this.sprite.y = screenHeight - this.sprite.height / 2 - 10;

        this.initAnimation();
    }

    initAnimation() {
        gsap.to(this.sprite.scale, {
            ease: 'power2.out',
            x: 1.07,
            y: 1.07,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
        });
    }
}
