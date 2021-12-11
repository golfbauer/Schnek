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

let cameraManager;
let objectManager;

function start() {

    // Create a new gameTime object
    gameTime = new GameTime();

    // Load game elements
    loadGame();

    // Initialize game elements
    initializeGame();

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

function loadGame() {
    loadAssets();
}

function loadAssets() {
    loadSprites();
}

function loadSprites() {
    grassTileSpriteSheet = document.getElementById("grass_tile_sprite");
}

function initializeGame() {
    initializeNotificationCenter();
    initializeManagers();
    initializeCameras();
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

function initializeSprites() {
    initializeGrassTiles();
}

function initializeGrassTiles() {
    let transform = null;
    let artist = null;

    let spriteArchetype = null;
    let spriteClone = null;

    transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.One,
        Vector2.Zero,
        new Vector2(
            60,
            60
        )
    );

    artist = new SpriteArtist(
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

    let grassTileSprite = new Sprite(
        "GrassTile",
        transform,
        ActorType.Background,
        null,
        StatusType.Drawn,
        artist
    );

    objectManager.add(grassTileSprite);
}

window.addEventListener("load", start);
