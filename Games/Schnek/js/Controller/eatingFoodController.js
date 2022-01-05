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
            this.extendSnake();
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
}