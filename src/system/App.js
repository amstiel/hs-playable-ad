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

        this.showLoadingPrompt(screenWidth / 2, screenHeight / 2);

        // Load assets
        // TODO: Split sprites by load priority & load some of them in background
        await this.loadAssets();

        // Start game
        this.app.stage.addChild(game.container);
        game.start();
    }

    async loadAssets() {
        await PIXI.Assets.init({ manifest: 'assets/manifest.json' });
        await PIXI.Assets.loadBundle(['common', 'menu', 'stairs', 'decorations']);
    }

    showLoadingPrompt(xPosition, yPosition) {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 56,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#a9f625', '#4ab416'],
            stroke: '#dddddd',
            strokeThickness: 2,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        const richText = new PIXI.Text('Loading...', style);
        richText.anchor.set(0.5, 0.5);
        richText.x = xPosition;
        richText.y = yPosition;

        this.app.stage.addChild(richText);
    }
}
