export class Bubble {
    constructor(canvas, node, options) {
        this.options = options;

        let viewBox = node.select('#bubble-symbol').node.viewBox.baseVal;
        let bubbleGoup = node.select('#bubble-symbol g').clone();
        let bubble = canvas.svg(options.x, options.y, options.width, options.height, viewBox.x, viewBox.y, viewBox.width, viewBox.height);
        bubble.append(bubbleGoup);

        this.bubblePaths = bubble.selectAll('.bubble-svg-icon path');
        this.bubblePathsD = [];
        this.bubblePathsD1 = ['M64,52.9V6.7', 'M64,75.5v45.8', 'M75.5,63.5h45.8', 'M6.6,63.5h46'];
        this.bubblePathsD2 = ['M64,11.3V6.7', 'M64,116.7v4.6', 'M116.7,63.5h4.6', 'M6.6,63.5h4.6'];
        this.bubblePathsD3 = [[0, -30], [0, 30], [30, 0],[-30, 0]];

        this.bubblePaths.forEach((el) => {
            this.bubblePathsD.push(el.attr('d'));
        });
    }

    reset() {
        this.bubblePaths.attr({
            opacity: 1,
            transform: ''
        });

        this.bubblePaths.forEach((el, i) => {
            el.attr({
                d: this.bubblePathsD[i]
            });
        });

        this.animate();
    }

    animate() {
        this.bubblePaths.attr({
            opacity: 0
        });

        let matrix = new Snap.Matrix();

        setTimeout(() => {
            this.animateStep1(matrix, (matrix) => {
                this.animateStep2(matrix, () => {
                    setTimeout(() => {
                        this.animateStep3(() => {
                            setTimeout(() => {
                                this.reset();
                            }, 3000);
                        });
                    }, 900);
                });
            });
        }, this.options.delay);
    }

    animateStep1(matrix, next) {
        this.bubblePaths.animate({opacity: 1}, 200, mina.linear());

        matrix.translate(-150, -150);

        this.bubblePaths.animate({transform: matrix}, 600, mina.easein, () => {
            next(matrix);
        });
    }

    animateStep2(matrix, next) {
        matrix.translate(100, -200);

        this.bubblePaths.animate({transform: matrix}, 1000, mina.easeout);

        next();
    }

    animateStep3(next) {
        this.bubblePaths.forEach((el, i) => {
            el.animate({d: this.bubblePathsD1[i]}, 0, () => {
                el.animate({d: this.bubblePathsD2[i]}, 400, mina.linear(), () => {
                    let matrix = new Snap.Matrix();
                    matrix.add(el.attr('transform').totalMatrix);
                    matrix.translate(this.bubblePathsD3[i][0], this.bubblePathsD3[i][1]);
                    el.animate({transform: matrix, opacity: 0}, 200);

                    if (this.bubblePaths.length - 1 === i) {
                        next();
                    }
                });
            });
        });
    }
}
