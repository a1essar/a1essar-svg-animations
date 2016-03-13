import $ from '../bower_components/jquery/dist/jquery.min.js';
import Snap from '../bower_components/Snap.svg/dist/snap.svg-min.js';
import BezierEasing from '../bower_components/bezier-easing/index.js';
import {Bubble} from './bubble.es6';
import {Cog} from './cog.es6';

let acceleration = BezierEasing(.85,.15,.15,.85);
mina.acceleration = function (n) {
    return acceleration(n);
};

class SvgAnimations {
    constructor() {
        Snap.load('./assets/sprite.svg', (svg) => {
            Snap('body').append(svg);

            let canvas = Snap(140, 140);

            new Cog(canvas, svg, {
                x: 0,
                y: 65,
                width: 75,
                height: 75,
                startAngle: 0,
                endAngle: 360
            }).animate();

            new Cog(canvas, svg, {
                x: 65,
                y: 40,
                width: 75,
                height: 75,
                startAngle: 10,
                endAngle: -350
            }).animate();

            new Bubble(canvas, svg, {
                x: 50,
                y: 50,
                width: 15,
                height: 15,
                delay: 3000
            }).animate();

            new Bubble(canvas, svg, {
                x: 35,
                y: 45,
                width: 18,
                height: 18,
                delay: 3500
            }).animate();

            new Bubble(canvas, svg, {
                x: 50,
                y: 50,
                width: 12,
                height: 12,
                delay: 4000
            }).animate();

            Snap('.js-cog-svg-icon').append(canvas);
        });
    }
}

new SvgAnimations();
