export default class game {
    static point = {
      '1' : 25,
      '2' : 100,
      '3' : 350,
      '4' : 750
    };


    constructor(musicController){
        this.music = musicController;
        //this.music.startAutoPlay(1);
        this.reset();
    }

    get level(){
        return Math.floor(this.lines * 0.1);
    }

    getState() {
        let playfield = this.createPlayfield();

        for (let i = 0; i < this.playfield.length; i++) {
            playfield[i] = [];
            for (let j = 0; j < this.playfield[i].length; j++) {
                playfield[i][j] = this.playfield[i][j];
            }
        }

        for (let i = 0; i < this.figure.blocks.length; i++) {
            for (let j = 0; j < this.figure.blocks[i].length; j++) {
                if (this.figure.blocks[i][j]) {
                    playfield[this.figure.y + i][this.figure.x + j] = this.figure.blocks[i][j];
                }
            }
        }

        return {
            score: this.score,
            level: this.level,
            lines: this.lines,
            nextFigure :this.nextFigure,
            playfield,
            isGameOver : this.topOut
        };
    }

    reset(){
        this.score = 0;
        this.lines = 0;
        this.topOut = false;

        this.playfield = this.createPlayfield();

        this.figure = this.createFigure();

        this.nextFigure = this.createFigure();
    }

    createPlayfield() {
        let playfield = [];
        for (let i = 0; i < 20; i++) {
            playfield[i] = new Array(10).fill(0);
        }
        return playfield;
    }

    createFigure() {
        let index = Math.floor(Math.random() * 7);
        let figure = {x: 0, y: 0, color: ''};
        switch (index) {
            case 0:
                figure.blocks = [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]

                ];

                break;
            case 1:
                figure.blocks = [
                    [0, 0, 0],
                    [2, 2, 2],
                    [2, 0, 0]
                ];

                break;
            case 2:
                figure.blocks = [
                    [0, 0, 0],
                    [3, 3, 3],
                    [0, 0, 3]
                ];

                break;
            case 3:
                figure.blocks = [
                    [0, 0, 0, 0],
                    [0, 4, 4, 0],
                    [0, 4, 4, 0],
                    [0, 0, 0, 0]
                ];

                break;
            case 4:
                figure.blocks = [
                    [0, 0, 0],
                    [0, 5, 5],
                    [5, 5, 0],
                ];

                break;
            case 5:
                figure.blocks = [
                    [0, 0, 0],
                    [0, 6, 0],
                    [6, 6, 6]
                ];

                break;
            case 6:
                figure.blocks = [
                    [0, 0, 0],
                    [7, 7, 0],
                    [0, 7, 7]
                ];

                break;
            default:
                throw new Error("Error figure");
        }
        figure.x = Math.floor((10 - figure.blocks[0].length)/2);
        figure.y = -1;
        return figure;
    }

    moveLeft() {
        this.figure.x -= 1;

        if (this.checkOutCoord()) {
            this.figure.x += 1;
        }

    }

    moveRight() {
        this.figure.x += 1;
        if (this.checkOutCoord()) {
            this.figure.x -= 1;
        }

    }

    moveDown() {
        if(!this.topOut){
            this.figure.y += 1;
            if (this.checkOutCoord()) {
                this.figure.y -= 1;
                this.lockFigure();
                this.updateScore(this.clearLine());
                this.updateFigure();
            }
            if(this.checkOutCoord()){
                this.topOut = true;
            }
        }

    }

    rotateFigure() {
        let tmpArr = [];
        let length = this.figure.blocks.length;

        for (let i = 0; i < length; i++) {
            tmpArr[i] = new Array(length).fill(0);
        }

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                tmpArr[j][i] = this.figure.blocks[length - 1 - i][j];
            }
        }
        let tmp = this.figure.blocks;
        this.figure.blocks = tmpArr;


        if (this.checkOutCoord()) {
            if (this.figure.x < 4) {
                if (this.figure.blocks.length===4){
                    this.figure.x++;
                    this.moveRight();
                    if (this.checkOutCoord()){
                        this.figure.blocks = tmp;
                    }
                }else{
                    this.moveRight();
                    if (this.checkOutCoord()){
                        this.figure.blocks = tmp;
                    }
                }
            } else {
                if (this.figure.blocks.length===4){
                    this.figure.x--;
                    this.moveLeft();
                    if (this.checkOutCoord()){
                        this.figure.blocks = tmp;
                    }
                }else{
                    this.moveLeft();
                    if (this.checkOutCoord()){
                        this.figure.blocks = tmp;
                    }
                }
            }
        }

    }

    checkOutCoord() {
        for (let i = 0; i < this.figure.blocks.length; i++) {
            for (let j = 0; j < this.figure.blocks[i].length; j++) {
                if (this.figure.blocks[i][j]>0 &&
                    ((this.playfield[this.figure.y + i] === undefined ||
                        this.playfield[this.figure.y + i][this.figure.x + j] === undefined) ||
                        this.playfield[this.figure.y + i][this.figure.x + j])
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    clearLine(){
        let rows = 20;
        let column = 10;

        let lines = [];
        for(let i=rows-1;i>=0;i--){
            let numberBlock = 0;

            for(let j=0;j< column;j++){
                if(this.playfield[i][j]>0){
                    numberBlock++;
                }
            }
            if(numberBlock === 0){
                break;
            }else if(numberBlock < column){
                continue;
            }else if(numberBlock === column){
                lines.unshift(i);
            }
        }
        for(let index of lines){
            this.playfield.splice(index,1);
            this.playfield.unshift(new Array(column).fill(0));
        }

        return lines.length;
    }

    updateScore(clearLines){
        if(clearLines){
            this.score+= game.point[clearLines] * (this.level + 1);
            this.lines +=clearLines;
        }
    }

    lockFigure() {
        for (let i = 0; i < this.figure.blocks.length; i++) {
            for (let j = 0; j < this.figure.blocks[i].length; j++) {
                if (this.figure.blocks[i][j]>0) {
                    this.playfield[this.figure.y + i][this.figure.x + j] = this.figure.blocks[i][j];
                }
            }
        }

    }

    updateFigure() {
        this.figure = this.nextFigure;
        this.nextFigure = this.createFigure();
    }
}