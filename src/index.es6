import $ from 'jquery';
import Snap from 'Snap.svg';
import BezierEasing from 'bezier-easing';
import {Bubble} from './bubble.es6';
import {Cog} from './cog.es6';

let acceleration = BezierEasing(.85,.15,.15,.85);
mina.acceleration = function (n) {
    return acceleration(n);
};

export class SvgAnimations {
    constructor() {

    }

    loadSprite() {
        return new Promise((resolve, reject) => {
            Snap.load('./assets/sprite.svg', (svg) => {
                this.svg = svg;

                Snap('body').append(svg);

                resolve();
            });
        });
    }

    createCogAnimation() {
        let canvas = Snap(140, 140);

        new Cog(canvas, this.svg, {
            x: 0,
            y: 65,
            width: 75,
            height: 75,
            startAngle: 0,
            endAngle: 360
        }).animate();

        new Cog(canvas, this.svg, {
            x: 65,
            y: 40,
            width: 75,
            height: 75,
            startAngle: 10,
            endAngle: -350
        }).animate();

        new Bubble(canvas, this.svg, {
            x: 50,
            y: 50,
            width: 15,
            height: 15,
            delay: 3000
        }).animate();

        new Bubble(canvas, this.svg, {
            x: 35,
            y: 45,
            width: 18,
            height: 18,
            delay: 3500
        }).animate();

        new Bubble(canvas, this.svg, {
            x: 50,
            y: 50,
            width: 12,
            height: 12,
            delay: 4000
        }).animate();

        Snap('.js-cog-svg-icon').append(canvas);
    }
}

if (window) {
    window.SvgAnimations = SvgAnimations;
}
