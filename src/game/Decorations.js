import * as PIXI from 'pixijs';
import gameConfig from './config.json';

const { screenWidth, screenHeight } = gameConfig;

export class Decorations {
    constructor(gameContainer) {
        this.container = gameContainer;
    }

    render() {
        this.renderSmallPlant();
        this.renderWidePlant();
        this.renderCoach();
        this.renderTable();
        this.renderGlobe();
        this.renderCroppedPlant();
    }

    renderSmallPlant() {
        const smallPlant = new PIXI.Sprite(PIXI.Assets.get('small-plant'));
        smallPlant.x = screenWidth - 240;
        smallPlant.y = 140;
        smallPlant.zIndex = 1;
        this.container.addChild(smallPlant);
    }

    renderWidePlant() {
        const widePlant = new PIXI.Sprite(PIXI.Assets.get('wide-plant'));
        widePlant.x = screenWidth - 240;
        widePlant.y = screenHeight - widePlant.height;
        widePlant.zIndex = 3;
        this.container.addChild(widePlant);
    }

    renderCoach() {
        const coach = new PIXI.Sprite(PIXI.Assets.get('coach'));
        coach.x = 130;
        coach.y = screenHeight - coach.height;
        coach.zIndex = 1;
        this.container.addChild(coach);
    }

    renderTable() {
        const table = new PIXI.Sprite(PIXI.Assets.get('table'));
        table.x = 200;
        table.y = 200;
        table.zIndex = 1;
        this.container.addChild(table);
    }

    renderGlobe() {
        const globe = new PIXI.Sprite(PIXI.Assets.get('globe'));
        globe.x = 100;
        globe.y = 100;
        globe.zIndex = 1;
        this.container.addChild(globe);
    }

    renderCroppedPlant() {
        const croppedPlant = new PIXI.Sprite(PIXI.Assets.get('small-plant'));
        croppedPlant.x = 420;
        croppedPlant.y = -40;
        croppedPlant.zIndex = 1;
        this.container.addChild(croppedPlant);
    }
}
