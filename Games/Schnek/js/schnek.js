// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

let gameTime;
let grid = [
    []
];

let notificationCenter;

let grassTileSpriteSheet;
let snakeSpriteSheet;
let foodSpriteSheet;

let cameraManager;
let objectManager;
let keyboardManager;
let menuManager;

let snakeNodeList;

let snakeNodeHead;
let snakeNodeBody1;
let snakeNodeBody2;
let snakeNodeBody3;
let allMainBodys;
let snakeNodeTail;

function start() {

    // Create a new gameTime object
    gameTime = new GameTime();

    // Load game elements
    load();

    // Initialize game elements
    initialize();

    // Publish an event to pause the object manager, by setting its StatusType
    // to off (i.e. no update, no draw). This, in turn, shows the menu.
    notificationCenter.notify(
        new Notification(
            NotificationType.Menu,
            NotificationAction.ShowMenuChanged,
            [StatusType.Off]
        )
    );

    // Start the game loop
    window.requestAnimationFrame(animate);
}

function animate(now) {
    // Update game time
    gameTime.update(now);

    // Update game
    update(gameTime);

    // Re-draw game
    draw(gameTime);

    // Loop
    window.requestAnimationFrame(animate);
}

function draw(gameTime) {

    // Clear previous draw
    clearCanvas();

    // Call the draw method of the object manager class
    // to draw all sprites
    objectManager.draw(gameTime);
}

function clearCanvas() {
    context.save();
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    context.restore();
}

function update(gameTime) {

    // Call the update method of the object manager class
    // to update all sprites
    objectManager.update(gameTime);

    // Call the update method of the menu manager class to
    // check for menu state changes
    menuManager.update(gameTime);
}

function load() {
    loadAssets();
}

function loadAssets() {
    loadSprites();
}

function loadSprites() {
    grassTileSpriteSheet = document.getElementById("grass_tile_sprite");
    snakeSpriteSheet = document.getElementById("snake_sprite");
    foodSpriteSheet = document.getElementById("food_sprite");

}

function initialize() {
    initializeNotificationCenter();
    initializeManagers();
    initializeCameras();
    initializeSnakeList();
    initializeSprites();
}

function initializeNotificationCenter() {
    notificationCenter = new NotificationCenter();
}

function initializeManagers() {

    cameraManager = new CameraManager(
        "Camera Manager"
    );

    objectManager = new ObjectManager(
        "Object Manager",
        notificationCenter,
        context,
        StatusType.Drawn | StatusType.Updated,
        cameraManager
    );

    keyboardManager = new KeyboardManager(
        "Keyboard Manager"
    );

    menuManager = new MyMenuManager(
        "Menu Manager",
        notificationCenter,
        keyboardManager
    );
}

function initializeCameras() {

    let transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.One,
        new Vector2(
            canvas.clientWidth / 2,
            canvas.clientHeight / 2
        ),
        new Vector2(
            canvas.clientWidth,
            canvas.clientHeight
        )
    );

    let camera = new Camera2D(
        "Camera 1",
        transform,
        ActorType.Camera,
        StatusType.Updated
    );

    cameraManager.add(camera);
}

function initializeSnakeList() {

    snakeNodeHead = new snakeNode(
        0, 4, 7, new Vector2(1, 0)
    );

    snakeNodeBody1 = new snakeNode(
        1, 3, 7, new Vector2(1, 0)
    );

    snakeNodeBody2 = new snakeNode(
        2, 2, 7, new Vector2(1, 0)
    );

    snakeNodeBody3 = new snakeNode(
        3, 1, 7, new Vector2(1, 0)
    );

    snakeNodeTail = new snakeNode(
        4, 0, 7, new Vector2(1, 0)
    );


    snakeNodeList = new snakeList(
        snakeNodeHead
    );

    snakeNodeList.append(snakeNodeBody1);
    snakeNodeList.append(snakeNodeBody2);
    snakeNodeList.append(snakeNodeBody3);
    snakeNodeList.append(snakeNodeTail);
    allMainBodys = [snakeNodeBody1, snakeNodeBody2, snakeNodeBody3];

}

function initializeSprites() {
    initializeGrassTiles();
    initializeSnakeHead();
    initializeSnakeBody();
    initializeSnakeTail();
    initializeFood();
}

function initializeGrassTiles() {
    let transformLight = null;
    let transformDark = null;

    let artistLight = null;
    let artistDark = null;

    let grassArchetypeLight = null;
    let grassArchetypeDark = null;

    let grassLightClone = null;
    let grassDarkClone = null;

    transformLight = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            BoardData.GRASS_TILE_X,
            BoardData.GRASS_TILE_Y
        )
    );

    transformDark = new Transform2D(
        new Vector2(
            BoardData.GRASS_TILE_X,
            0
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            BoardData.GRASS_TILE_X,
            BoardData.GRASS_TILE_Y
        )
    );


    artistLight = new SpriteArtist(
        context,
        grassTileSpriteSheet,
        1,
        new Vector2(
            20,     //TODO: make constants
            55
        ),
        new Vector2(
            BoardData.GRASS_TILE_X,
            BoardData.GRASS_TILE_Y
        )
    );

    artistDark = new SpriteArtist(
        context,
        grassTileSpriteSheet,
        1,
        new Vector2(
            115,     //TODO: make constants
            50
        ),
        new Vector2(
            BoardData.GRASS_TILE_X,
            BoardData.GRASS_TILE_Y
        )
    );

    grassArchetypeLight = new Sprite(
        "GrassTileLight",
        transformLight,
        ActorType.Background,
        null,
        StatusType.Drawn,
        artistLight
    );

    grassArchetypeDark = new Sprite(
        "GrassTileDark",
        transformDark,
        ActorType.Background,
        null,
        StatusType.Drawn,
        artistDark
    );

    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 15; j++) {
            if (i % 2 == 0) {
                grassLightClone = grassArchetypeLight.clone();
                grassDarkClone = grassArchetypeDark.clone();

                grassLightClone.id = grassLightClone.id + i + j;
                grassDarkClone.id = grassDarkClone.id + i + j + 1;

                grassLightClone.transform.setTranslation(
                    new Vector2(
                        i * BoardData.GRASS_TILE_X,
                        j * BoardData.GRASS_TILE_Y
                    )
                );
                objectManager.add(grassLightClone);

                j++;
                if (j == 10) {
                    continue;
                }

                grassDarkClone.transform.setTranslation(
                    new Vector2(
                        i * BoardData.GRASS_TILE_X,
                        j * BoardData.GRASS_TILE_Y
                    )
                );
                objectManager.add(grassDarkClone);
            } else {
                grassLightClone = grassArchetypeLight.clone();
                grassDarkClone = grassArchetypeDark.clone();

                grassLightClone.id = grassLightClone.id + i + j;
                grassDarkClone.id = grassDarkClone.id + i + j + 1;

                grassDarkClone.transform.setTranslation(
                    new Vector2(
                        i * BoardData.GRASS_TILE_X,
                        j * BoardData.GRASS_TILE_Y
                    )
                );
                objectManager.add(grassDarkClone);

                j++;
                if (j == 10) {
                    continue;
                }

                grassLightClone.transform.setTranslation(
                    new Vector2(
                        i * BoardData.GRASS_TILE_X,
                        j * BoardData.GRASS_TILE_Y
                    )
                );
                objectManager.add(grassLightClone);
            }
        }
    }
}

function initializeSnakeTail() {
    let transform = null;
    let artist = null;

    transform = new Transform2D(
        new Vector2(
            0,
            280
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            BoardData.GRASS_TILE_X,
            BoardData.GRASS_TILE_Y
        )
    );

    artist = new SpriteArtist(
        context,
        snakeSpriteSheet,
        1,
        new Vector2(
            1,
            60
        ),
        new Vector2(
            BoardData.GRASS_TILE_X,
            BoardData.GRASS_TILE_Y
        )
    );

    let tailSprite = new Sprite(
        "SnakeBodyTail",
        transform,
        ActorType.Player,
        null,
        StatusType.Updated | StatusType.Drawn,
        artist
    );

    snakeNodeTail.sprite = tailSprite;

    objectManager.add(tailSprite);
}

function initializeSnakeBody() {
    let transform = null;
    let artist = null;

    let spriteArchetype = null;
    let spriteClone = null;

    transform = new Transform2D(
        new Vector2(
            120,
            280
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            BoardData.GRASS_TILE_X,
            BoardData.GRASS_TILE_Y
        )
    );

    artist = new SpriteArtist(
        context,
        snakeSpriteSheet,
        1,
        new Vector2(
            65,
            15
        ),
        new Vector2(
            BoardData.GRASS_TILE_X,
            BoardData.GRASS_TILE_Y
        )
    );

    spriteArchetype = new Sprite(
        "SnakeBody",
        transform,
        ActorType.Player,
        null,
        StatusType.Updated | StatusType.Drawn,
        artist
    );

    for (let i = 1; i < 4; i++) {

        spriteClone = spriteArchetype.clone();

        spriteClone.id = spriteClone.id + i;

        spriteClone.transform.setTranslation(
            new Vector2(
                BoardData.GRASS_TILE_X * i,
                280
            )
        );

        allMainBodys[3 - i].sprite = spriteClone;

        objectManager.add(spriteClone);
    }

}

function initializeSnakeHead() {
    let transform = null;
    let artist = null;

    let snakeHeadSprite = null;

    transform = new Transform2D(
        new Vector2(
            160,
            279
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            43,
            43
        )
    );

    artist = new SpriteArtist(
        context,
        snakeSpriteSheet,
        1,
        Vector2.Zero,
        new Vector2(
            43,
            43
        )
    );

    snakeHeadSprite = new Sprite(
        "SnakeHead",
        transform,
        ActorType.Player,
        null,
        StatusType.Updated | StatusType.Drawn,
        artist
    );

    snakeHeadSprite.attachController(
        new snakeMovementController(
            keyboardManager,
            snakeNodeList
        )
    );

    snakeNodeHead.sprite = snakeHeadSprite;

    snakeHeadSprite.attachController(
        new snakeNodeController(
            snakeNodeList,
            menuManager
        )
    );

    objectManager.add(snakeHeadSprite);
}

function initializeFood() {
    let transform = null;
    let artist = null;

    let foodSprite;

    transform = new Transform2D(
        new Vector2(
            Math.floor(Math.random() * BoardData.BOARD_X_TILES) * BoardData.GRASS_TILE_X + 5,
            Math.floor(Math.random() * BoardData.BOARD_Y_TILES) * BoardData.GRASS_TILE_Y + 5
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            30,
            30
        )
    );

    artist = new SpriteArtist(
        context,
        foodSpriteSheet,
        1,
        Vector2.Zero,
        new Vector2(
            830,
            568
        )
    );

    foodSprite = new Sprite(
        "Food",
        transform,
        ActorType.Pickup,
        null,
        StatusType.Updated | StatusType.Drawn,
        artist
    );

    foodSprite.attachController(
        new eatingFoodController(
            snakeNodeList,
            objectManager,
            context,
            snakeSpriteSheet
        )
    );

    objectManager.add(foodSprite);
}

function resetGame() {
    SnakeData.MOVE_INTERVAL = 200;

    SnakeData.MOVE_LEFT = Keys.A;
    SnakeData.MOVE_RIGHT = Keys.D;
    SnakeData.MOVE_UP = Keys.W;
    SnakeData.MOVE_DOWN = Keys.S;

    SnakeData.MOVE_LEFT_ARROW = Keys.ArrowLeft;
    SnakeData.MOVE_RIGHT_ARROW = Keys.ArrowRight;
    SnakeData.MOVE_UP_ARROW = Keys.ArrowUp;
    SnakeData.MOVE_DOWN_ARROW = Keys.ArrowDown;

    clearCanvas();
    start();
}

window.addEventListener("load", start);
