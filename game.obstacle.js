/**
 * @namespace
 */
var game = game || {};

/**
 * Defines an obstacle inside a cell.
 *
 * @param {game.Cell} cell - Reference to the cell containing the obstacle.
 * @param {CanvasRenderingContext2D} canvasContext - The 2D rendering context for the
 *     drawing surface of the <canvas> element.
 *
 * @requires game.enums.js
 *
 * @author Juan Cuartas
 * @class
 */
game.Obstacle = function (cell, canvasContext) {
	
	// PUBLIC METHODS:
	// --------------------------------------------------------------------------------

    /**
     * Paints this cell and all its elements.
     */
	this.paint = function () {
        /*var position = cell.getPosition();
        
        position.x1 += game.Settings.OBSTACLE_PADDING;
        position.y1 += game.Settings.OBSTACLE_PADDING;
        position.x2 -= game.Settings.OBSTACLE_PADDING;
        position.y2 -= game.Settings.OBSTACLE_PADDING;

        canvasContext.lineWidth = game.Settings.OBSTACLE_LINE_WITH;
        canvasContext.strokeStyle = game.Settings.OBSTACLE_LINE_STYLE;

		canvasContext.moveTo(position.x1, position.y1);
        canvasContext.lineTo(position.x2, position.y2);
        canvasContext.moveTo(position.x2, position.y1);
        canvasContext.lineTo(position.x1, position.y2);
        
        canvasContext.stroke();*/

        var x = cell.getCenterX();
        var y = cell.getCenterY();
        var width = cell.getWidth();
        var radio = width * game.Settings.OBSTACLE_RADIO_PERCENTAGE;

        canvasContext.lineWidth = width * game.Settings.OBSTACLE_LINE_PERCENTAGE;

        canvasContext.beginPath();
        canvasContext.arc(x, y, radio, 0, 2*Math.PI );
        canvasContext.fillStyle = 'blue';
        canvasContext.fill();
        canvasContext.stroke();
	};
};