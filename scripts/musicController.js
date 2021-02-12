export  default  class MusicController{
    static theme ={
        0: 'loginStage.mp3',
        1: 'gachi.mp3',
        2: 'spank.mp3',
        3:'gameOverStage.mp3',
        4:'scoreStage.mp3',
        5:'levelupStage.mp3',
        6:'wiwi.mp3'
    };

    constructor(){
         this.audios = new Array(7 ).fill(new Audio());

        for(let i=0;i<this.audios.length;i++){
            this.audios[i] = new Audio();
            this.audios[i].src = './audio/'+MusicController.theme[i];
        }
        this.audios[1].autoplay = true;
    }

    startPlay(theme){
        this.audios[theme].play();
    }

    startAcinPlay(themeOld,themeNew){
        this.audios[themeNew].play();
        this.audios[themeOld].volume = 0.3;
        setTimeout(e=>{
            this.audios[themeOld].volume = 1;
        },this.audios[themeOld].duration*10);

    }
    startAutoPlay(theme){
        this.audios[theme].autoplay = true;
        this.audios[theme].play();
    }

    startPause(theme){
        this.audios[theme].pause();
    }

}