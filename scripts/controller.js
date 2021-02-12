export default class Controller {
    static played = false;
    static playedWiWi = false;
    constructor(game, view, musicController) {
        this.game = game;
        this.view = view;
        this.music = musicController;
        this.intervalId = null;
        this.isPlayed = false;

        this.music.audios[1].autoplay = true;

        this.oldLines = 0;
        this.oldLevel = 0;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.view.renderStartPanel();
    }

    update(){

        if(this.music.audios[1].ended ){
            this.music.startAutoPlay(1);
            this.music.audios[1].autoplay = true;
        }
        if(this.oldLevel < game.getState().level){
            this.music.startAcinPlay(1,5);
            this.music.startPause(2);
            this.oldLevel = game.getState().level;
        }else if(this.oldLines<game.getState().lines){
            this.music.startAcinPlay(1,2);
            this.oldLines = game.getState().lines;
        }

        this.game.moveDown();
        this.updateView();
    }

    play(){
        this.isPlayed = true;
        this.startTimer();
        this.updateView();
    }

    pause(){
        this.isPlayed = false;
        this.stopTimer();
        this.updateView();
    }

    reset(){
        this.game.reset();
        this.play();
    }

    startTimer(){
        let speed = 1000* (1 - game.level*0.1);
        if(!this.intervalId){
            this.intervalId = setInterval(()=>{
                this.update();
            }, speed > 0 ? speed : 100);
        }
    }

    stopTimer(){
        if(this.intervalId){
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

    }

    updateView(){
        let state = this.game.getState();
        if(state.isGameOver){
            this.music.startPause(1);
            if(!Controller.played && this.music.audios[1].paused){
                Controller.played=true;
                this.music.startPlay(3);

                setTimeout(e=>{
                    this.music.startPlay(4);
                },this.music.audios[3].duration*1000);
            }
            this.view.renderGameOverPanel(state);
        }else if(this.isPlayed){
            this.view.renderMainScreen(state);
        }else{
            this.view.renderPausePanel();
        }

    }

    handleKeyUp(ev){
        switch (ev.key) {
            case ' ':
            case'ArrowDown':
               this.startTimer();
                break;
        }
    }
    handleKeyDown(ev) {
        switch (ev.key) {
            case 'F':
            case 'f':
                if(Controller.playedWiWi){
                    this.music.startPlay(6);
                }
                if(Controller.playedWiWi == false ){
                    Controller.playedWiWi = true;
                }

                this.music.startPause(4);
                Controller.played=false;
                if(!this.music.audios[1].ended){
                    this.music.startAutoPlay(1);
                    this.music.audios[1].autoplay = true;
                }
                if(this.game.getState().isGameOver){
                    this.music.startPause(4);
                    this.music.startAutoPlay(1);
                    this.reset();
                }else if(this.isPlayed){
                    this.view.renderMainScreen(game.getState());
                    this.pause();
                }else{
                    this.play();
                }
                break;
            case 'ArrowLeft':

                this.game.moveLeft();
                this.view.renderMainScreen(game.getState());
                break;
            case 'ArrowRight' :
                this.game.moveRight();
                this.view.renderMainScreen(game.getState());
                break;
            case 'ArrowUp':
                this.game.rotateFigure();
                this.view.renderMainScreen(game.getState());
                break;
            case ' ':
            case'ArrowDown':
                this.stopTimer();
                this.game.moveDown();
                this.view.renderMainScreen(game.getState());
                break;
        }
    }

}
