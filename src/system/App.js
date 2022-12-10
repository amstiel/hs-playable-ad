import * as PIXI from 'pixijs';

export class App {
    game = null;

    run(game) {
        this.game = game;

        this.app = new PIXI.Application({
            width: 800,
            height: 600,
        });

        document.body.appendChild(this.app.view);

        this.app.stage.addChild(this.game.container);
        this.game.start();
    }
}
