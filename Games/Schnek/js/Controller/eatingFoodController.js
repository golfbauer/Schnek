class eatingFoodController {

    constructor(snakeList, objectManager, context, snakeSpriteSheet) {
        this.snakeList = snakeList;
        this.objectManager = objectManager;
        this.context = context;
        this.snakeSpriteSheet = snakeSpriteSheet;
    }

    update(gameTime, parent) {
        let snakeHead = this.snakeList.head;
        let xFood = (parent.transform.translation.x - 5) / BoardData.GRASS_TILE_X;
        let yFood = (parent.transform.translation.y - 5) / BoardData.GRASS_TILE_Y;
        if (snakeHead.x_pat == xFood
            && snakeHead.y_pat == yFood) {
            this.snakeList.food++;
            parent.transform.setTranslation(this.randomFoodSpot());
            let temp = true;
            if (BoardData.POWER_UP_MODE) {
                temp = this.changeRandomAttribute();
            }
            if (temp) {
                this.extendSnake();
            }
        }
    }

    randomFoodSpot() {
        let randomSpot = new Vector2(
            Math.floor(Math.random() * BoardData.BOARD_X_TILES),
            Math.floor(Math.random() * BoardData.BOARD_Y_TILES)
        );
        let array = this.snakeList.getAllPositions();
        for (let i = 0; i < array.length; i++) {
            if (randomSpot.equals(array[i])) {
                i = 0;
                randomSpot = new Vector2(
                    Math.floor(Math.random() * BoardData.BOARD_X_TILES),
                    Math.floor(Math.random() * BoardData.BOARD_Y_TILES)
                );
            }
        }
        randomSpot.x = randomSpot.x * BoardData.GRASS_TILE_X + 5;
        randomSpot.y = randomSpot.y * BoardData.GRASS_TILE_Y + 5;

        return randomSpot;
    }

    extendSnake() {
        let tail = this.snakeList.tail;
        let newTail = new snakeNode(
            tail.id + 1, tail.x_pat + (-tail.direct.x), tail.y_pat + (-tail.direct.y), tail.direct
        );

        this.snakeList.append(newTail);

        let transform;
        let artist;
        let bodySprite;

        transform = new Transform2D(
            new Vector2(
                newTail.x_pat * BoardData.GRASS_TILE_X,
                newTail.y_pat * BoardData.GRASS_TILE_Y
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
            this.context,
            this.snakeSpriteSheet,
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

        bodySprite = new Sprite(
            "SnakeBody",
            transform,
            ActorType.Player,
            null,
            StatusType.Updated | StatusType.Drawn,
            artist
        );

        newTail.sprite = bodySprite;

        this.objectManager.add(bodySprite);

        let tailDir = tail.prev.direct.x == 0 ? tail.prev.direct.y : tail.prev.direct.x - 1;
        tail.sprite.transform.setRotationInRadians(tailDir * Math.PI / 2);
        tail.sprite.artist.sourcePosition = new Vector2(65, 15);
        tail.sprite.artist.sourceDimensions = new Vector2(BoardData.GRASS_TILE_X, BoardData.GRASS_TILE_Y);
    }

    reduceSnake() {
        this.objectManager.remove(this.snakeList.tail.sprite);
        this.snakeList.remove();
        let tail = this.snakeList.tail;
        tail.sprite.artist.sourcePosition = new Vector2(1, 60);
        tail.sprite.artist.sourceDimensions = new Vector2(BoardData.GRASS_TILE_X, BoardData.GRASS_TILE_Y);
        let tailDir = tail.x == 0 ? tail.y : tail.x - 1;
        tail.sprite.transform.setRotationInRadians(tailDir * Math.PI / 2);
    }

    changeRandomAttribute() {
        SnakeData.MOVE_INTERVAL = 200;
        SnakeData.MOVE_LEFT = Keys.A;
        SnakeData.MOVE_RIGHT = Keys.D;
        SnakeData.MOVE_UP = Keys.W;
        SnakeData.MOVE_DOWN = Keys.S;
        let popup = document.getElementById("popup");
        popup.className = "show";
        let temp = true;
        switch (Math.floor(Math.random() * 4)) {
            case (0):
                SnakeData.MOVE_INTERVAL -= 50;
                popup.innerHTML = "Speed Increased!";
                break;
            case (1):
                SnakeData.MOVE_LEFT = Keys.D;
                SnakeData.MOVE_RIGHT = Keys.A;
                SnakeData.MOVE_UP = Keys.S;
                SnakeData.MOVE_DOWN = Keys.W;
                popup.innerHTML = "Controlls inverted!";
                break;
            case (2):
                SnakeData.MOVE_INTERVAL += 50;
                popup.innerHTML = "Speed Reduced!"
                break;
            case (3):
                if (this.snakeList.length > 3) {
                    this.reduceSnake();
                    temp = false;
                    popup.innerHTML = "Length reduced!";
                }
                break;
        }
        setTimeout(function(){ popup.className = popup.className.replace("show", ""); }, 750);
        return temp;
    }
}