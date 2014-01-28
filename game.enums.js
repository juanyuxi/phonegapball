var game = game || {};

/**
 * Defines all game settings.
 *
 * @enum
 */
game.Settings = {
    CELL_LINE_WITH: 2,
    CELL_LINE_STYLE: "Green",
    
    OBSTACLE_PADDING: 20,
    OBSTACLE_LINE_WITH: 10,
    OBSTACLE_LINE_STYLE: "Red",

    OBSTACLE_RADIO_PERCENTAGE: 0.35,
    OBSTACLE_LINE_PERCENTAGE: 0.25,
    OBSTACLE_LINE_PERCENTAGE: 0.25
};

/**
 * Defines all possible orientations.
 *
 * @enum
 */
game.Orientation = {
	TOP_LEFT: 0,
	TOP_RIGHT: 1,
	BOTTOM_RIGHT: 2,
	BOTTOM_LEFT: 3
};