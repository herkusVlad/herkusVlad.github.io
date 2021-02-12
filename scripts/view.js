export default class View {
    static color = {
        '1': 'ocean.png',
        '2': 'blue.png',
        '3': 'yellow.png',
        '4': 'yellowNice.png',
        '5': 'green.png',
        '6': 'purple.png',
        '7': 'red.png'
    };
    static loaded = false;

    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.context = this.canvas.getContext('2d');

        //ширина границы
        this.playfieldBorderWidth = 0;

        //начало поля
        this.playfieldX = this.playfieldBorderWidth;
        this.playfieldY = this.playfieldBorderWidth;

        //ширина и высота игрового поля
        this.playfieldWidth = this.width * 2 / 3;
        this.playfieldHeight = this.height;

        //какие-то поля
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        //свойста блока
        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        //свойства панели
        this.panelX = this.playfieldWidth + 10;
        this.panelY = 4;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);
        this.image = [];
        for (let i = 0; i < 7; i++) {
            this.image[i] = new Image(113, 113);
            this.image[i].src = './img/' + View.color[(i + 1) + ''];
        }
    }

    renderMainScreen(state) {

        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    renderPanel({score, level, lines, nextFigure}) {
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '16px "Tetris"';
        this.context.fillText('Score: ' + score, this.panelX, this.panelY + 0);
        this.context.fillText('Level: ' + level, this.panelX, this.panelY + 24);
        this.context.fillText('Lines: ' + lines, this.panelX, this.panelY + 48);
        this.context.fillText('Next: ', this.panelX, this.panelY + 72);

        for (let i = 0; i < nextFigure.blocks.length; i++) {
            for (let j = 0; j < nextFigure.blocks[i].length; j++) {
                let block = nextFigure.blocks[i][j];

                if (block) {

                    this.context.drawImage(this.image[block - 1],
                        (this.panelX + (this.width - this.panelX) / 7) + (j * this.blockWidth),
                        (this.panelY + 72) + (i * this.blockHeight),
                        0 + this.blockWidth,
                        0 + this.blockHeight);
                }
            }
        }
    }

    renderPlayfield({playfield}) {

        for (let i = 0; i < playfield.length; i++) {
            for (let j = 0; j < playfield[i].length; j++) {
                const block = playfield[i][j];
                if (block) {
                    this.context.drawImage(this.image[block - 1], j * this.blockWidth, i * this.blockHeight, 0 + this.blockWidth, 0 + this.blockHeight);
                }
            }
        }
        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playfieldBorderWidth + 4;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }

    renderStartPanel() {
        this.context.fillStyle = 'white';
        this.context.font = '18px "Tetris"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press F to Start and pay respect', this.width / 2, this.height / 2);
    }

    renderPausePanel() {
        this.context.fillStyle = 'rgba(0,0,0,0.75)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = 'white';
        this.context.font = '18px "Tetris"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press F to Resume ', this.width / 2, this.height / 2);

    }

    renderGameOverPanel({score}) {
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '18px "Tetris"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);

        this.context.fillText('Score: ' + score, this.width / 2, this.height / 2);
        this.context.fillText('Press F to Restart for to pay respect', this.width / 2, this.height / 2 + 48);

    }
}