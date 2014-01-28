/**
 * @namespace
 */
var game = game || {};

/**
 * Defines all attributes and methods for the game board.
 *
 * @param {number} columns - Number of columns.
 * @param {number} rows - Number of rows.
 * @param {CanvasRenderingContext2D} canvasContext - The 2D rendering context for the
 *     drawing surface of the <canvas> element.
 *
 * @requires game.cell.js
 *
 * @author Juan Cuartas
 * @class
 */
game.Board = function (columns, rows, canvasContext) {
	
	// PRIVATE ATTRIBUTES:
	// --------------------------------------------------------------------------------

	/**
	 * List of cells in this board. Each element in the list is of type game.Cell.
	 * @type {game.Cell[]}
	 */
	var _cells = [];

	// PRIVATE METHODS:
	// --------------------------------------------------------------------------------

	/**
	 * Initializes all cells in this board.
	 */
	var _initCells = function () {
		var length = columns * rows;

		for (var i = 0; i < length; i++) {
			_cells.push(new game.Cell(canvasContext));
		}
    };

	/**
	 * Initializes neighbors for each cell in this board. This method should be
	 * called after _initCells().
	 */
	var _initNeighbors = function () {
		for (var i = 0, col = 1, row = 1; i < _cells.length; i++, col++) {
			if (col > columns) {
				col = 1;
				row++;
			}

			var topCell = (row === 1) ? null : _cells[i - columns];
			var rightCell = (col === columns) ? null : _cells[i + 1];
	        var bottomCell = (row === rows) ? null : _cells[i + columns];
	        var leftCell = (col === 1) ? null : _cells[i - 1];
			
			_cells[i].setNeighbors(topCell, rightCell, bottomCell, leftCell);
		}
    };

    // PUBLIC METHODS:
	// --------------------------------------------------------------------------------

	/**
     * Gets the cell containing the (x,y) point received as argument.
     *
     * @param {number} x - Point's position at the X axis.
     * @param {number} y - Point's position at the Y axis.
     *
     * @return {game.Cell} Cell containing the (x,y) point received as argument, null
     * if there isn't any cell at that point.
     */
	this.getCell = function (x, y) {
		for (var i = 0; i < _cells.length; i++) {
			if (_cells[i].contains(x, y)) {
				return _cells[i];
			}
		}
		return null;
	};


	this.getCellPosition = function (x, y) {
	    for (var i = 0; i < _cells.length; i++) {
	        if (_cells[i].contains(x, y)) {
	            return i;
	        }
	    }
	    return null;
	};


	/**
	 * Resizes this board and all its content.
	 *
	 * @param {number} x - Initial position of the board in the X axis.
     * @param {number} y - Initial position of the board in the Y axis.
     * @param {number} width - Board's width.
     * @param {number} height - Board's height.
	 */
	this.resize = function (x, y, width, height) {
		for (var i = 0; i < _cells.length; i++) {
			if (i === 0) {
				var x2 = x + Math.floor(width / columns);
				var y2 = y + Math.floor(height / rows);
				_cells[i].move(x, y, x2, y2);
			} else if ((i % columns) === 0) {
				_cells[i].moveToBottomOf(_cells[i - columns]);
			} else {
				_cells[i].moveToRightOf(_cells[i - 1]);
			}
		}
		this.paint();
	};
	
	/**
     * Paints all cells and its elements in the current board.
     */
	this.paint = function () {
		_cells.forEach(function (cell) {
			cell.paint();
		});
	};

    /**
     * Adds an obstacle in the cell whose number is received as argument.
     *
     * @param {number} cellNumber - Number of the cell in which the obstacle is added.
     */
    this.addObstacle = function (cellNumber) {
        _cells[cellNumber].addObstacle();
    };

    /**
     * Adds a ball in the cell whose number is received as argument.
     *
     * @param {number} cellNumber - Number of the cell in which the ball is added.
     * @return {game.Ball} TODO comment...
     */
    this.addBall = function (cellNumber) {
        return _cells[cellNumber].addBall();
    };

    /**
     * Adds a curve in the cell whose number is received as argument.
     *
     * @param {number} cellNumber - Number of the cell in which the router is added.
     */
    this.addCurve = function (cellNumber, orientation) {
        _cells[cellNumber].addCurve(orientation);
    };

    this.addReturnedCurve = function (cellNumber, curve) {
        _cells[cellNumber].addCurve2(curve);
    };

	// INITIALIZER:
	// --------------------------------------------------------------------------------

	/**
	 * Initializes all elements in the board.
	 *
	 * @param {game.Board} self - Reference to the instace of this class.
	 */
	(function init() {
		_initCells();
		_initNeighbors();
	})();
};