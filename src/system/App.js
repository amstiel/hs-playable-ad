import * as PIXI from 'pixijs';

export class App {
    async run(game, gameConfig) {
        const { screenWidth, screenHeight, backgroundColor } = gameConfig;

        this.app = new PIXI.Application({
            width: screenWidth,
            height: screenHeight,
            backgroundColor,
        });
        document.body.appendChild(this.app.view);

        await this.loadAssets();

        this.app.stage.addChild(game.container);
        game.start();
    }

    async loadAssets() {
        await PIXI.Assets.init({ manifest: '/src/assets/manifest.json' });
        await PIXI.Assets.loadBundle('common');
    }
}
