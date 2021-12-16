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

let cameraManager;
let objectManager;
let keyboardManager;

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
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function update(gameTime) {

    // Call the update method of the object manager class
    // to update all sprites
    objectManager.update(gameTime);
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
    
    keyboardManager = new KeyboardManager();
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
        0, 4, 4, new Vector2(1, 0)
    );
    
    snakeNodeBody1 = new snakeNode(
        1, 3, 4, new Vector2(1, 0)
    );
    
    snakeNodeBody2 = new snakeNode(
        2, 2, 4, new Vector2(1, 0)
    );
    
    snakeNodeBody3 = new snakeNode(
        3, 1, 4, new Vector2(1, 0)
    );

    snakeNodeTail = new snakeNode(
        4, 0, 4, new Vector2(1, 0)
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
            60,
            60
        )
    );

    transformDark = new Transform2D(
        new Vector2(
            60, 
            0
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            60,
            60
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
            60,     //TODO: make constants
            60
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
            60,     //TODO: make constants
            60
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

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (i%2 == 0) {
                grassLightClone = grassArchetypeLight.clone();
                grassDarkClone = grassArchetypeDark.clone();

                grassLightClone.id = grassLightClone.id + i + j;
                grassDarkClone.id = grassDarkClone.id + i + j + 1;

                grassLightClone.transform.setTranslation(
                    new Vector2(
                        i*60,
                        j*60
                    )
                );
                objectManager.add(grassLightClone);

                j++;
                if (j == 10) {
                    continue;
                }

                grassDarkClone.transform.setTranslation(
                    new Vector2(
                        i*60,
                        j*60
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
                        i*60,
                        j*60
                    )
                );
                objectManager.add(grassDarkClone);
                
                j++;
                if (j == 10) {
                    continue;
                }

                grassLightClone.transform.setTranslation(
                    new Vector2(
                        i*60,
                        j*60
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
            259
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            60,
            22
        )
    );

    artist = new SpriteArtist(
        context,
        snakeSpriteSheet,
        1,
        new Vector2(
            1,
            69
        ),
        new Vector2(
            60,
            22
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

    tailSprite.attachController(
        new snakeNodeController(
            4,
            snakeNodeList
        )
    );

    objectManager.add(tailSprite);
}

function initializeSnakeBody() {
    let transform = null;
    let artist = null;

    let spriteArchetype = null;
    let spriteClone = null;

    transform = new Transform2D(
        new Vector2(
            180,
            249
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            60,
            22
        )
    );

    artist = new SpriteArtist(
        context,
        snakeSpriteSheet,
        1,
        new Vector2(
            1,
            44
        ),
        new Vector2(
            60,
            22
        )
    );

    spriteArchetype = new Sprite(
        "SnakeBodyStraight",
        transform,
        ActorType.Player,
        null,
        StatusType.Updated | StatusType.Drawn,
        artist
    );
    
    for(let i = 1; i < 4; i++) {

        spriteClone = spriteArchetype.clone();

        spriteClone.id = spriteClone.id + i;

        spriteClone.transform.setTranslation(
            new Vector2(
                60*i,
                259
            )
        );

        spriteClone.attachController(
            new snakeNodeController(
                4-i,
                snakeNodeList
            )
        );

        objectManager.add(spriteClone);
    }

}

function initializeSnakeHead() {
    let transform = null;
    let artist = null;

    let snakeHeadSprite = null;

    transform = new Transform2D(
        new Vector2(
            240,
            249
        ),
        -Math.PI/2, //TODO: wont rotate for some reason
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

    snakeHeadSprite.attachController(
        new snakeNodeController(
            0,
            snakeNodeList
        )
    );

    objectManager.add(snakeHeadSprite);
}

function initializeSnakeControllers() {

}

function resetGame() {

    clearCanvas();
    startGame();
}

window.addEventListener("load", start);
