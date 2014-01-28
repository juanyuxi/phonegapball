/**
 * @namespace
 */
var game = game || {};

/**
 * Defines an curve inside a cell.
 *
 * @param {game.Cell} cell - reference to the cell containing the curve.
 * @param {CanvasRenderingcanvasContext2D} canvasContext - The 2D rendering context for the
 *     drawing surface of the <canvas> element.
 * TODO: coment orientation
 *
 * @author Jose Carrascal
 * @class
 */
game.Curve = function (cell, canvasContext, orientation) {

    // PRIVATE ATTRIBUTES:
    // --------------------------------------------------------------------------------
    
    /**
     * Initial position of this cell in the X axis.
     */
    var _x1 = 0;
    
    /**
     * Initial position of this cell in the Y axis.
     */
    var _y1 = 0;
    
    /**
     * Middle position of this cell in the X axis.
     */
    var _x2 = 0;
    
    /**
     * Middle position of this cell in the Y axis.
     */
    var _y2 = 0;    

    /**
     * Final position of this cell in the X axis.
     */
    var _x3 = 0;
    
    /**
     * Final position of this cell in the Y axis.
     */
    var _y3 = 0;


    /**
     * Orien of this cell in the Y axis.
     */
    var _orientation = null;   

    // PRIVATE METHODS:
    // --------------------------------------------------------------------------------

    /**
     * Set the coordenates to the two points to draw the curve
     */
    var _setCoordenates = function ( x1, y1, x2, y2, x3, y3 ) {

         _x1 = x1;
         _y1 = y1;
         _x2 = x2;
         _y2 = y2;
         _x3 = x3;
         _y3 = y3;         
    }
	
	// PUBLIC METHODS:
	// --------------------------------------------------------------------------------

    this.getOrientation = function () {
        return _orientation;
    }

    /**
    * Paints this cell and all its elements.
    */
    this.paint = function () {
        

        var position = cell.getPosition();
        var radio =  cell.getWidth() * 0.35;
        _orientation = orientation;

        canvasContext.save();
        canvasContext.beginPath();
            
        switch ( orientation ) {

        case game.Orientation.TOP_LEFT : { _setCoordenates( position.x1, position.y2, position.x1, position.y1, position.x2, position.y1 );   break; }
        case game.Orientation.TOP_RIGHT : { _setCoordenates( position.x1, position.y1, position.x2, position.y1, position.x2, position.y2 );   break; }
        case game.Orientation.BOTTOM_LEFT : { _setCoordenates( position.x2, position.y2, position.x1, position.y2, position.x1, position.y1 );   break; }
        case game.Orientation.BOTTOM_RIGHT : { _setCoordenates( position.x2, position.y1, position.x2, position.y2, position.x1, position.y2 );   break; }        

        }

        canvasContext.moveTo( _x1, _y1 );
        canvasContext.lineTo( _x2, _y2 );
        canvasContext.lineTo( _x3, _y3 );
        canvasContext.bezierCurveTo( _x3, _y3, _x2 , _y2 , _x1 , _y1 );
      
        canvasContext.fillStyle = 'red';
        canvasContext.fill();
        canvasContext.closePath();
        canvasContext.restore();        

    };    

};