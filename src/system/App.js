import * as PIXI from 'pixijs';

export class App {
    run() {

        this.app = new PIXI.Application({
            width: 800,
            height: 600,
        });

        document.body.appendChild(this.app.view);
    }
}
