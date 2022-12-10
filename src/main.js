import { App } from './system/App.js';
import { Game } from './game/Game.js';
import gameConfig from './game/config.json';

const app = new App();
const game = new Game();
app.run(game, gameConfig);
