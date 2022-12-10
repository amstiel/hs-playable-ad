import { App } from './system/App.js';
import { Game } from './game/Game.js';

const app = new App();
const game = new Game();
app.run(game);
