import Game from './game.js';
import View from './view.js';
import Controller from './controller.js';
import MusicController from './musicController.js';

const root = document.querySelector('#root_div');

const game = new Game();
const view = new View(root,480,540, 20,10);
const music = new MusicController();
const controller = new Controller(game,view,music);

window.game = game;
window.view = view;
window.controller = controller;
window.music = music;




