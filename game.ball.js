/**
 * @namespace
 */
var game = game || {};

/**
 * En esta clase se define las propiedades y acciones de la bola que sera lanzada sobre el tablero
 *
 * @param {CanvasRenderingcanvasContext2D} canvas - The 2D rendering canvasContext for the drawing
 * surface of a <canvas> element.
 *
 * @author Juan Cuartas
 * @class
 */
game.Ball = function(cell, canvasContext){
    // TODO: var, comentariar las variables
    _xs = 0;
    _ys = 0;
    _radio = 0;

    _move = true;

    _vel = 15;
    _dirX = _vel;
    _dirY = _vel;

    // Metodos publicos

    this.getX =  function () {
        return _xs;
    };

    this.getY =  function () {
        return _ys;
    };

    this.getRadio =  function () {
        return _radio;
    };

    this.paint = function (paint) {

        if(!paint) return;

        if ( _xs < ( canvasContext.canvas.width - 30) && _ys <= 30  ){
            _dirX = _vel; _dirY = 0; 
        }
        else if ( _ys <= ( canvasContext.canvas.height - 30 ) && _xs >= ( canvasContext.canvas.width - 30) ) { 
            _dirX = 0; _dirY = _vel; 
        }
        else if ( _ys > ( canvasContext.canvas.height - 30 )  && _xs > 30) { 
            _dirX = -_vel; _dirY = 0; 
        }
        else { 
            _dirX = 0; _dirY = -_vel; 
        }

        _xs += _dirX; 
        _ys += _dirY;

       _radio = cell.getWidth() * 0.30;

        canvasContext.save(); 
        canvasContext.beginPath();
        canvasContext.arc( _xs, _ys, _radio, 0, Math.PI*2, true);
        canvasContext.closePath();
        canvasContext.fillStyle = 'green';
        canvasContext.fill();
        canvasContext.restore();
    };
};