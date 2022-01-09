class BoardData {
    static GRASS_TILE_X = 40;
    static GRASS_TILE_Y = 40;

    static LIGHT_GRASS_SPRITE = new Vector2(20, 55);

    static DARK_GRASS_SPRITE = new Vector2(115, 50);

    static FOOD_SPRITE_DIMENSION = new Vector2(830, 568);
    static FOOD_TRANSFORM_DIMENSION = new Vector2(30, 30);

    static BOARD_X_TILES = 17;
    static BOARD_Y_TILES = 15;

    static POWER_UP_MODE = false;
    static FOOD_MOVE_INTERVAL = 600;

    static AUDIO_CUE_ARRAY = [
        new AudioCue("eating", AudioType.All, 1, 1, 0, false),
        new AudioCue("death", AudioType.WinLose, 1, 1, 0, false),
        new AudioCue("winning", AudioType.WinLose, 1, 1, 0, false),
        new AudioCue("gameplay", AudioType.Background, 1, 1, 0, true)
    ];
}

class SnakeData {
    static SNAKE_START_POSITION_Y = 280;

    static SNAKE_TAIL_SPRITE_POSITION = new Vector2(1, 60);

    static SNAKE_BODY_SPRITE_POSITION = new Vector2(65, 15);

    static SNAKE_BODY_CURVE_SPRITE_POSITION = new Vector2(141, 18);

    static SNAKE_HEAD_SPRITE_POSITION = Vector2.Zero;
    static SNAKE_HEAD_SPRITE_DIMENSION = new Vector2(43, 43);

    static MOVE_INTERVAL = 200;

    static MOVE_RIGHT = Keys.D; 
    static MOVE_LEFT = Keys.A;
    static MOVE_UP = Keys.W;
    static MOVE_DOWN = Keys.S;

    static MOVE_LEFT_ARROW = Keys.ArrowLeft;
    static MOVE_RIGHT_ARROW = Keys.ArrowRight;
    static MOVE_UP_ARROW = Keys.ArrowUp;
    static MOVE_DOWN_ARROW = Keys.ArrowDown;

    static resetSnakeAttributes() {
        SnakeData.MOVE_INTERVAL = 200;

        SnakeData.MOVE_LEFT = Keys.A;
        SnakeData.MOVE_RIGHT = Keys.D;
        SnakeData.MOVE_UP = Keys.W;
        SnakeData.MOVE_DOWN = Keys.S;
    
        SnakeData.MOVE_LEFT_ARROW = Keys.ArrowLeft;
        SnakeData.MOVE_RIGHT_ARROW = Keys.ArrowRight;
        SnakeData.MOVE_UP_ARROW = Keys.ArrowUp;
        SnakeData.MOVE_DOWN_ARROW = Keys.ArrowDown;
    }
}


/*
TODO:
    clean up code
*/