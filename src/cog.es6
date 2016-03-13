export class Cog {
    constructor(canvas, node, options) {
        this.options = options;

        this.cogLink = node.select('#cog-svg-symbol').use();

        this.cog = canvas.svg(options.x, options.y, options.width, options.height);
        this.cog.append(this.cogLink);

        this.cogBB = this.cog.getBBox();

        this.reset();
    }

    reset() {
        this.cogLink.attr({
            transform: `r${this.options.startAngle}, ${this.cogBB.cx}, ${this.cogBB.cy}`
        });
    }

    animate() {
        this.cogLink.animate({ transform: `r${this.options.endAngle}, ${this.cogBB.cx}, ${this.cogBB.cy}`}, 5000, mina.acceleration, () => {
            this.reset();
            this.animate();
        });
    }
}
