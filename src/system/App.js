import * as PIXI from 'pixijs';

export class App {
    async run(game, gameConfig) {
        const { screenWidth, screenHeight, backgroundColor } = gameConfig;

        // Init app
        this.app = new PIXI.Application({
            width: screenWidth,
            height: screenHeight,
            backgroundColor,
        });

        window.document.body.appendChild(this.app.view);

        // Load assets
        // TODO: Split sprites by load priority & load some of them in background
        await this.loadAssets();

        // Start game
        this.app.stage.addChild(game.container);
        game.start();
    }

    async loadAssets() {
        await PIXI.Assets.init({ manifest: '/src/assets/manifest.json' });
        await PIXI.Assets.loadBundle(['common', 'menu']);
    }
}
