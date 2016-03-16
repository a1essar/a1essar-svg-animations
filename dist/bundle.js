webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SvgAnimations = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jqueryMin = __webpack_require__(1);

	var _jqueryMin2 = _interopRequireDefault(_jqueryMin);

	var _snapSvgMin = __webpack_require__(3);

	var _snapSvgMin2 = _interopRequireDefault(_snapSvgMin);

	var _index = __webpack_require__(4);

	var _index2 = _interopRequireDefault(_index);

	var _bubble = __webpack_require__(5);

	var _cog = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var acceleration = (0, _index2.default)(.85, .15, .15, .85);
	mina.acceleration = function (n) {
	    return acceleration(n);
	};

	var SvgAnimations = exports.SvgAnimations = function () {
	    function SvgAnimations() {
	        _classCallCheck(this, SvgAnimations);
	    }

	    _createClass(SvgAnimations, [{
	        key: 'loadSprite',
	        value: function loadSprite() {
	            var _this = this;

	            return new Promise(function (resolve, reject) {
	                _snapSvgMin2.default.load('./assets/sprite.svg', function (svg) {
	                    _this.svg = svg;

	                    (0, _snapSvgMin2.default)('body').append(svg);

	                    resolve();
	                });
	            });
	        }
	    }, {
	        key: 'createCogAnimation',
	        value: function createCogAnimation() {
	            var canvas = (0, _snapSvgMin2.default)(140, 140);

	            new _cog.Cog(canvas, this.svg, {
	                x: 0,
	                y: 65,
	                width: 75,
	                height: 75,
	                startAngle: 0,
	                endAngle: 360
	            }).animate();

	            new _cog.Cog(canvas, this.svg, {
	                x: 65,
	                y: 40,
	                width: 75,
	                height: 75,
	                startAngle: 10,
	                endAngle: -350
	            }).animate();

	            new _bubble.Bubble(canvas, this.svg, {
	                x: 50,
	                y: 50,
	                width: 15,
	                height: 15,
	                delay: 3000
	            }).animate();

	            new _bubble.Bubble(canvas, this.svg, {
	                x: 35,
	                y: 45,
	                width: 18,
	                height: 18,
	                delay: 3500
	            }).animate();

	            new _bubble.Bubble(canvas, this.svg, {
	                x: 50,
	                y: 50,
	                width: 12,
	                height: 12,
	                delay: 4000
	            }).animate();

	            (0, _snapSvgMin2.default)('.js-cog-svg-icon').append(canvas);
	        }
	    }]);

	    return SvgAnimations;
	}();

	if (window) {
	    window.SvgAnimations = SvgAnimations;
	}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bubble = exports.Bubble = function () {
	    function Bubble(canvas, node, options) {
	        var _this = this;

	        _classCallCheck(this, Bubble);

	        this.options = options;

	        var viewBox = node.select('#bubble-symbol').node.viewBox.baseVal;
	        var bubbleGoup = node.select('#bubble-symbol g').clone();
	        var bubble = canvas.svg(options.x, options.y, options.width, options.height, viewBox.x, viewBox.y, viewBox.width, viewBox.height);
	        bubble.append(bubbleGoup);

	        this.bubblePaths = bubble.selectAll('.bubble-svg-icon path');
	        this.bubblePathsD = [];
	        this.bubblePathsD1 = ['M64,52.9V6.7', 'M64,75.5v45.8', 'M75.5,63.5h45.8', 'M6.6,63.5h46'];
	        this.bubblePathsD2 = ['M64,11.3V6.7', 'M64,116.7v4.6', 'M116.7,63.5h4.6', 'M6.6,63.5h4.6'];
	        this.bubblePathsD3 = [[0, -30], [0, 30], [30, 0], [-30, 0]];

	        this.bubblePaths.forEach(function (el) {
	            _this.bubblePathsD.push(el.attr('d'));
	        });
	    }

	    _createClass(Bubble, [{
	        key: 'reset',
	        value: function reset() {
	            var _this2 = this;

	            this.bubblePaths.attr({
	                opacity: 1,
	                transform: ''
	            });

	            this.bubblePaths.forEach(function (el, i) {
	                el.attr({
	                    d: _this2.bubblePathsD[i]
	                });
	            });

	            this.animate();
	        }
	    }, {
	        key: 'animate',
	        value: function animate() {
	            var _this3 = this;

	            this.bubblePaths.attr({
	                opacity: 0
	            });

	            var matrix = new Snap.Matrix();

	            setTimeout(function () {
	                _this3.animateStep1(matrix, function (matrix) {
	                    _this3.animateStep2(matrix, function () {
	                        setTimeout(function () {
	                            _this3.animateStep3(function () {
	                                setTimeout(function () {
	                                    _this3.reset();
	                                }, 3000);
	                            });
	                        }, 900);
	                    });
	                });
	            }, this.options.delay);
	        }
	    }, {
	        key: 'animateStep1',
	        value: function animateStep1(matrix, next) {
	            this.bubblePaths.animate({ opacity: 1 }, 200, mina.linear());

	            matrix.translate(-150, -150);

	            this.bubblePaths.animate({ transform: matrix }, 600, mina.easein, function () {
	                next(matrix);
	            });
	        }
	    }, {
	        key: 'animateStep2',
	        value: function animateStep2(matrix, next) {
	            matrix.translate(100, -200);

	            this.bubblePaths.animate({ transform: matrix }, 1000, mina.easeout);

	            next();
	        }
	    }, {
	        key: 'animateStep3',
	        value: function animateStep3(next) {
	            var _this4 = this;

	            this.bubblePaths.forEach(function (el, i) {
	                el.animate({ d: _this4.bubblePathsD1[i] }, 0, function () {
	                    el.animate({ d: _this4.bubblePathsD2[i] }, 400, mina.linear(), function () {
	                        var matrix = new Snap.Matrix();
	                        matrix.add(el.attr('transform').totalMatrix);
	                        matrix.translate(_this4.bubblePathsD3[i][0], _this4.bubblePathsD3[i][1]);
	                        el.animate({ transform: matrix, opacity: 0 }, 200);

	                        if (_this4.bubblePaths.length - 1 === i) {
	                            next();
	                        }
	                    });
	                });
	            });
	        }
	    }]);

	    return Bubble;
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cog = exports.Cog = function () {
	    function Cog(canvas, node, options) {
	        _classCallCheck(this, Cog);

	        this.options = options;

	        this.cogLink = node.select('#cog-svg-symbol').use();

	        this.cog = canvas.svg(options.x, options.y, options.width, options.height);
	        this.cog.append(this.cogLink);

	        this.cogBB = this.cog.getBBox();

	        this.reset();
	    }

	    _createClass(Cog, [{
	        key: 'reset',
	        value: function reset() {
	            this.cogLink.attr({
	                transform: 'r' + this.options.startAngle + ', ' + this.cogBB.cx + ', ' + this.cogBB.cy
	            });
	        }
	    }, {
	        key: 'animate',
	        value: function animate() {
	            var _this = this;

	            this.cogLink.animate({ transform: 'r' + this.options.endAngle + ', ' + this.cogBB.cx + ', ' + this.cogBB.cy }, 5000, mina.acceleration, function () {
	                _this.reset();
	                _this.animate();
	            });
	        }
	    }]);

	    return Cog;
	}();

/***/ }
]);