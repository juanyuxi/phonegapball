/**
 * @namespace
 */
var game = game || {};

/**
 * Creates a responsive canvas with full screen width and height.
 *
 * @author Juan Cuartas
 * @class
 */
game.Canvas = function () {

    // PRIVATE ATTRIBUTES:
	// --------------------------------------------------------------------------------

    /**
	 * The 2D rendering context for the drawing surface of the <canvas> element.
	 * @type {CanvasRenderingContext2D}
	 */
    var _context = null;

    


	// PUBLIC ATTRIBUTES:
	// --------------------------------------------------------------------------------

	/**
	 * Function called when the canvas gets resized. This variable should be setted
     * by the client of this class.
     *
	 * @type {function(width:number, height:number)}
	 */
    this.onResize = null;

    this.elementCell = null;

    this.dragging = false;

    // PUBLIC METHODS:
	// --------------------------------------------------------------------------------

    /**
     * Gets the 2D rendering context for the drawing surface of the <canvas> element.
     *
     * @return {CanvasRenderingContext2D} The 2D rendering context for the drawing
     *     surface of the <canvas> element.
     */
    this.getContext = function () {
        return _context;
    };

	// INITIALIZER:
	// --------------------------------------------------------------------------------

	/**
	 * Creates the canvas element and appends it to the body.
	 *
	 * @param {game.Canvas} self - Reference to the instace of this class.
	 */
	(function init(self) {
		var canvas = document.createElement("canvas");
		document.body.appendChild(canvas);

        _context = canvas.getContext("2d");

		var resizeCanvas = function () {
			canvas.width = window.innerWidth;
	    	canvas.height = window.innerHeight;

	    	if (self.onResize) {
	    		self.onResize(canvas.width, canvas.height);
	    	}
		};

		canvas.addEventListener("touchstart",doMouseDown,false);
		canvas.addEventListener("touchend",doMouseUp,false);

		function doMouseDown(event) {

		    event.preventDefault();
		    //panelCell = initialContainer.getCell(event.clientX, event.clientY);
    		panelCell = initialContainer.getCell(event.targetTouches[0].pageX, event.targetTouches[0].pageY);

    		initialContainer.removeCell(panelCell);
			
			if (panelCell !== null) {
			    elementCell = panelCell.getElements();
			    if (elementCell !== null) {			        
			        _dragging = true;
			    }
				
			}
			if (_dragging === true) {
			    canvas.addEventListener("touchmove", doMouseMove, false);
			}

		}


		function doMouseUp(event) {
		    event.preventDefault();
		    _dragging = false;
		    //var targetCell = board.getCell(event.clientX, event.clientY)
		    //var targetCellPos = board.getCellPosition(event.clientX, event.clientY);
		    var targetCell = board.getCell(event.targetTouches[0].pageX, event.targetTouches[0].pageY)
		    var targetCellPos = board.getCellPosition(event.targetTouches[0].pageX, event.targetTouches[0].pageY);

		    if (targetCell !== null && !targetCell.hasElement()) {

		        board.addCurve(targetCellPos, elementCell.getOrientation());
		        panelCell = null;
		    } else {
		        
		        initialContainer.returnCurve(elementCell.getOrientation());
		        panelCell = null;
		    }
		}


		function doMouseMove(event) {

		    event.preventDefault();
		    if (!_dragging) {
		        return;
		    }		    
		    //panelCell.setCenter(event.clientX, event.clientY, panelCell.getWidth(), panelCell.getHeight());
		    panelCell.setCenter(event.targetTouches[0].pageX, event.targetTouches[0].pageY, panelCell.getWidth(), panelCell.getHeight());		    
		}


		setTimeout(resizeCanvas, 0);
	    window.onresize = resizeCanvas;
	})(this);
};