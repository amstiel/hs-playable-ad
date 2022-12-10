import * as PIXI from 'pixijs';

export class Stair {
    constructor(xPosition) {
        this.sprite = new PIXI.Sprite(PIXI.Assets.get('old-stair'));
        this.sprite.x = xPosition;
        this.sprite.y = this.sprite.height;
        this.sprite.anchor.set(1, 1);
    }
}
