import * as PIXI from 'pixijs';
import gsap from 'gsap';
import gameConfig from './config.json';

const { screenWidth, screenHeight } = gameConfig;

export class FinalModal {
    constructor() {
        this.container = new PIXI.Container();
        this.container.zIndex = 4;
    }

    render() {
        this.renderOverlay();
        this.renderModal();
    }

    renderOverlay() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000, 0.6);
        graphics.drawRect(0, 0, screenWidth, screenHeight);
        graphics.endFill();
        this.container.addChild(graphics);
    }

    renderModal() {
        const finalModal = new PIXI.Sprite(PIXI.Assets.get('final-modal'));
        finalModal.anchor.set(0.5, 0.5);
        finalModal.x = screenWidth / 2;
        finalModal.y = screenHeight / 2 - 80;

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
}
