import { App } from './system/App';
import { Game } from './game/Game';
import gameConfig from './game/config.json';

const app = new App();
const game = new Game();
app.run(game, gameConfig);
