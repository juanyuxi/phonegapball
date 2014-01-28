/**
 * @namespace
 */
var game = game || {};

/**
 * Defines all attributes and methods for the game .
 *
 * @param {number} numElements - Number of elements. 
 * @param {CanvasRenderingContext2D} canvasContext - The 2D rendering context for the
 *     drawing surface of the <canvas> element.
 *
 * @requires game.cell.js
 *
 * @author Juan Grajales
 * @class
 */
game.initialContainer = function (numElements, canvasContext) {
	
	// PRIVATE ATTRIBUTES:
	// --------------------------------------------------------------------------------

	/**
	 * List of cells in this container. Each element in the list is of type game.Cell.
	 * @type {game.Cell[]}
	 */
	var _cells = [];

	// PRIVATE METHODS:
	// --------------------------------------------------------------------------------

	/**
	 * Initializes all cells in this container.
	 */
	var _initCells = function () {
		var length = numElements;

		for (var i = 0; i < length; i++) {
			_cells.push(new game.Cell(canvasContext));
		}
    };

    this.removeCell = function(cell){
        _cells.forEach(function (currentCell, currentIndex) {
            if (currentCell === cell) {
                _cells.splice(currentIndex, 1);
            }
        });
    }
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



    this.getCellByIndex = function (index) {
		
				return _cells[index];
		
    };


    
	/**
	 * Resizes this container and all its content.
	 *
	 * @param {number} x - Initial position of the container in the X axis.
     * @param {number} y - Initial position of the container in the Y axis.
     * @param {number} width - Board's width.
     * @param {number} height - Board's height.
	 */
	this.resize = function (x, y, width, height) {
		for (var i = 0; i < _cells.length; i++) {			
			if (i === 0) {
				var x2 = x + Math.floor(width / numElements);
				var y2 = y + Math.floor(height / numElements);
				_cells[i].move(x, y, x2, y2);
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
     * Adds a curve in the cell whose number is received as argument.
     *
     * @param {number} cellNumber - Number of the cell in which the router is added.
     */
    this.addCurve = function (cellNumber, orientation) {
        _cells[cellNumber].addCurve(orientation);
    };

    this.returnCurve = function (curve) {
        var newCell = new game.Cell(canvasContext);
        _cells.push(newCell);
        newCell.addCurve(curve);
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
	})();
};