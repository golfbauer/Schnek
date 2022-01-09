// Create a handle to our canvas
const canvas = document.getElementById("main_canvas");

// Get a handle to our canvas 2D context
const context = canvas.getContext("2d");

let gameTime;

let notificationCenter;
let checkForMusic = false;

let grassTileSpriteSheet;
let snakeSpriteSheet;
let foodSpriteSheet;

let cameraManager;
let objectManager;
let keyboardManager;
let mouseManager;
let menuManager;
let soundManager;
let uiManager;

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
    mouseManager = new MouseManager(
        "Mouse Manager"
    );

    soundManager = new SoundManager(
        "Sound Manager",
        notificationCenter,
        BoardData.AUDIO_CUE_ARRAY
    );

    menuManager = new MyMenuManager(
        "Menu Manager",
        notificationCenter,
        keyboardManager
    );

    uiManager = new MyUIManager(
        "UI Manager",
        notificationCenter,
        objectManager,
        mouseManager
    )
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
    initializeFoodUI();
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
        BoardData.LIGHT_GRASS_SPRITE,
        new Vector2(
            BoardData.GRASS_TILE_X,
            BoardData.GRASS_TILE_Y
        )
    );

    artistDark = new SpriteArtist(
        context,
        grassTileSpriteSheet,
        1,
        BoardData.DARK_GRASS_SPRITE,
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
            grassLightClone = grassArchetypeLight.clone();
            grassDarkClone = grassArchetypeDark.clone();

            grassLightClone.id = grassLightClone.id + i + j;
            grassDarkClone.id = grassDarkClone.id + i + j + 1;

            if (i % 2 == 0) {
                grassLightClone.transform.setTranslation(
                    new Vector2(
                        i * BoardData.GRASS_TILE_X,
                        j * BoardData.GRASS_TILE_Y
                    )
                );

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

            } else {
                grassDarkClone.transform.setTranslation(
                    new Vector2(
                        i * BoardData.GRASS_TILE_X,
                        j * BoardData.GRASS_TILE_Y
                    )
                );

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

            }
            objectManager.add(grassLightClone);
            objectManager.add(grassDarkClone);
        }
    }
}

function initializeSnakeTail() {
    let transform = null;
    let artist = null;

    transform = new Transform2D(
        new Vector2(
            0,
            SnakeData.SNAKE_START_POSITION_Y
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
        SnakeData.SNAKE_TAIL_SPRITE_POSITION,
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
            SnakeData.SNAKE_START_POSITION_Y
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
        SnakeData.SNAKE_BODY_SPRITE_POSITION,
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
                SnakeData.SNAKE_START_POSITION_Y
            )
        );

        allMainBodys[3-i].sprite = spriteClone;

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
            SnakeData.SNAKE_START_POSITION_Y-1
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        SnakeData.SNAKE_HEAD_SPRITE_DIMENSION
    );

    artist = new SpriteArtist(
        context,
        snakeSpriteSheet,
        1,
        SnakeData.SNAKE_HEAD_SPRITE_POSITION,
        SnakeData.SNAKE_HEAD_SPRITE_DIMENSION
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

    snakeHeadSprite.attachController(
        new snakeNodeController(
            snakeNodeList,
            menuManager,
            notificationCenter
        )
    );

    snakeNodeHead.sprite = snakeHeadSprite;
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
        BoardData.FOOD_TRANSFORM_DIMENSION
    );

    artist = new SpriteArtist(
        context,
        foodSpriteSheet,
        1,
        Vector2.Zero,
        BoardData.FOOD_SPRITE_DIMENSION
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
            menuManager,
            context,
            snakeSpriteSheet,
            notificationCenter
        )
    );

    objectManager.add(foodSprite);
}

function initializeFoodUI() {
    let transfrom;
    let sprite;
    let artist;

    transfrom = new Transform2D(
        new Vector2(
            canvas.clientWidth - 75,
            10
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(20, 10)
    );

    artist = new TextSpriteArtist(
        context,
        1,
        'Food: 0',
        FontType.Basic,
        Color.White,
        TextAlignType.Left,
        200,
        false
    );

    sprite = new Sprite(
        "Food UI",
        transfrom,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    objectManager.add(sprite);
}

function resetGame() {
    SnakeData.resetSnakeAttributes();
    clearCanvas();
    start();
}

window.addEventListener("load", start);
