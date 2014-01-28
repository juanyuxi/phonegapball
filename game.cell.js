/**
 * @namespace
 */
var game = game || {};

/**
 * Defines all attributes and methods for a cell in the game board.
 *
 * @param {CanvasRenderingContext2D} canvasContext - The 2D rendering context for the
 *     drawing surface of the <canvas> element.
 *
 * @requires game.enums.js
 * @requires game.obstacle.js
 *
 * @author Juan Cuartas
 * @class
 */
game.Cell = function (canvasContext) {
	
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
	 * Final position of this cell in the X axis.
	 */
	var _x2 = 0;
	
    /**
	 * Final position of this cell in the Y axis.
	 */
	var _y2 = 0;

	/**
	 * Reference to the neighbor cell at the top.
	 * @type {game.Cell}
	 */
	var _topCell = null;

	/**
	 * Reference to the neighbor cell at the right.
	 * @type {game.Cell}
	 */
	var _rightCell = null;

	/**
	 * Reference to the neighbor cell at the bottom.
	 * @type {game.Cell}
	 */
	var _bottomCell = null;

	/**
	 * Reference to the neighbor cell at the left.
	 * @type {game.Cell}
	 */
	var _leftCell = null;

	/**
	 * List of elements in this cell. Each element in the list implements the
	 * paint() method.
	 */
	var _elements = [];

	// PUBLIC METHODS:
	// --------------------------------------------------------------------------------

    /**
     * Gets the position of this cell.
     *
     * @return {{x1:number, x2:number, y1:number, y2:number}} Cell's position.
     */
    this.getPosition = function () {
        return {
            x1: _x1,
            y1: _y1,
            x2: _x2,
            y2: _y2,
        }
    };


    this.getElements = function () {
        if(_elements.length > 0){
        	return _elements[0];
        }
        else{
        	return null;
        }
    };
    

	/**
	 * Gets the width of this cell.
	 *
	 * @return {number} Cell's width.
	 */
	this.getWidth = function () {
	    return _x2 - _x1;    
	    
    };

    /**
	 * Gets the height of this cell.
	 *
	 * @return {number} Cell's height.
	 */
	this.getHeight = function () {
	   return _y2 - _y1;
	   
    };

    /**
	 * Gets the center position of this cell in the X axis.
	 *
	 * @return {number} Center position of this cell in the X axis.
	 */
	this.getCenterX = function () {
        return _x1 + (this.getWidth() / 2);
    };

    /**
	 * Gets the center position of this cell in the Y axis.
	 *
	 * @return {number} Center position of this cell in the Y axis.
	 */
	this.getCenterY = function () {
        return _y1 + (this.getHeight() / 2);
    };

    /**
     * Indicates whether the (x,y) point is inside this cell.
     *
     * @param {number} x - Point position on the X axis.
     * @param {number} y - Point position on the Y axis
     *
     * @return {boolean} True if the (x,y) point is inside this cell.
     */
	this.contains = function (x, y) {
        return (x >= _x1 && x <= _x2) && (y >= _y1 && y <= _y2);
	};


	this.hasElement = function(){
	    if(_elements.length > 0){
	        return true;
	    }else{
	        return false;
	    }    
	};


    /**
	 * Moves this cell to another position.
	 *
	 * @param {number} x1 - Initial position of this cell in the X axis.
     * @param {number} y1 - Initial position of this cell in the Y axis.
     * @param {number} x2 - Final position of this cell in the X axis.
     * @param {number} y2 - Final position of this cell in the Y axis.
	 */
	this.move = function (x1, y1, x2, y2) {
		_x1 = x1;
		_y1 = y1;
		_x2 = x2;
		_y2 = y2;
	};

	/**
	 * Moves this cell to the right of the given cell.
	 *
	 * @param {game.Cell} cell - Cell to be moved.
	 */
	this.moveToRightOf = function (cell) {
        var pos = cell.getPosition();
		this.move(pos.x2, pos.y1, pos.x2 + cell.getWidth(), pos.y2);
    };

    /**
	 * Moves this cell to the bottom of the given cell.
	 *
	 * @param {game.Cell} cell - Cell to be moved.
	 */
	this.moveToBottomOf = function (cell) {
        var pos = cell.getPosition();
        this.move(pos.x1, pos.y2, pos.x2, pos.y2 + cell.getHeight());
    };

    /**
	 * Sets all neighbors for this cell.
	 *
	 * @return {game.Cell} topCell - Reference to the neighbor cell at the top.
	 * @return {game.Cell} rightCell - Reference to the neighbor cell at the right.
	 * @return {game.Cell} bottomCell - Reference to the neighbor cell at the bottom.
	 * @return {game.Cell} leftCell - Reference to the neighbor cell at the left.
	 */
	this.setNeighbors = function (topCell, rightCell, bottomCell, leftCell) {
        _topCell = topCell;
        _rightCell = rightCell;
        _bottomCell = bottomCell;
        _leftCell = leftCell;
    };

    /**
     * Paints this cell and all its elements.
     */
	this.paint = function (draggingCurve) {
	    if ((draggingCurve !== true)) {	        
	    }
	    
        canvasContext.lineWidth = game.Settings.CELL_LINE_WITH;
	    canvasContext.strokeStyle = (draggingCurve !== true) ? game.Settings.CELL_LINE_STYLE : 'transparent';        
        //canvasContext.strokeStyle =  game.Settings.CELL_LINE_STYLE;
	    canvasContext.strokeRect(_x1, _y1, this.getWidth(), this.getHeight());	    
        

		_elements.forEach(function (element) {
			element.paint();			
		});
	};

    /**
     * Adds an obstacle in this cell.
     */
    this.addObstacle = function () {
        _elements.push(new game.Obstacle(this, canvasContext));
    };

    /**
     * Adds a ball in this cell.
     *
     * // TODO comment return
     */
    this.addBall = function () {
        var ball = new game.Ball(this, canvasContext);
        _elements.push(ball);
        return ball;
    };

    /**
     * Adds a router in this cell.
     *
     * //TODO comment orientation
     */
    this.addCurve = function (orientation) {
        _elements.push(new game.Curve(this, canvasContext, orientation));
    };


   /**
     * Adds a router in this cell.
     *
     * //TODO comment orientation
     */
    this.addCurve2 = function (curve) {
        _elements.push(curve);
    };


    /**
	 * Gets the center position of this cell in the X axis.
	 *
	 * @return {number} Center position of this cell in the X axis.
	 */
    this.setCenter = function (x, y, width, height) {
        _x1 = x - (width/2);
        _y1 = y - (height/2);
        _x2 = _x1 + width;
        _y2 = _y1 + height;
    };    


};