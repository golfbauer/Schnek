class BoardData {
    static GRASS_TILE_X = 40;
    static GRASS_TILE_Y = 40;
    static BOARD_X_TILES = 17;
    static BOARD_Y_TILES = 15;
    static POWER_UP_MODE = false;
}

class SnakeData {
    static MOVE_INTERVAL = 200;

    static MOVE_RIGHT = Keys.D; 
    static MOVE_LEFT = Keys.A;
    static MOVE_UP = Keys.W;
    static MOVE_DOWN = Keys.S;

    static MOVE_LEFT_ARROW = Keys.ArrowLeft;
    static MOVE_RIGHT_ARROW = Keys.ArrowRight;
    static MOVE_UP_ARROW = Keys.ArrowUp;
    static MOVE_DOWN_ARROW = Keys.ArrowDown;
}


/*
TODO:
    Extra live? Other Attribute?
    Snake starts moving after key press?
    Grayscale?
    Tail right way when extend
    Snake dies from tile behind tail
    Audio?
    clean up code
*/