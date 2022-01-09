class eatingFoodController {

    constructor(snakeList, objectManager, menuManager, context, snakeSpriteSheet, notificationCenter) {
        this.notificationCenter = notificationCenter;
        this.snakeList = snakeList;
        this.objectManager = objectManager;
        this.menuManager = menuManager;
        this.context = context;
        this.snakeSpriteSheet = snakeSpriteSheet;

        this.runningFood = false;
        this.runningFoodCount = 0;
        this.currentMoveIncrement = 0;
        this.timeSinceLastMoveInMs = 0;
    }

    update(gameTime, parent) {
        let snakeHead = this.snakeList.head;
        let xFood = (parent.transform.translation.x - 5) / BoardData.GRASS_TILE_X;
        let yFood = (parent.transform.translation.y - 5) / BoardData.GRASS_TILE_Y;
        if (snakeHead.x_pat == xFood
            && snakeHead.y_pat == yFood) {
            notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Play,
                    ["eating"]
                )
            );
            this.snakeList.food++;
            parent.transform.setTranslation(this.findRandomFoodSpot());
            let checkIfTailReduced = true;
            if (BoardData.POWER_UP_MODE) {
                checkIfTailReduced = this.changeRandomAttribute();
            }
            if (checkIfTailReduced) {
                this.extendSnake();
            }
            this.handleGameEnd();
            document.getElementById("current_food").innerHTML = this.snakeList.food;

        } else if (this.runningFood && this.timeSinceLastMoveInMs >= BoardData.FOOD_MOVE_INTERVAL) {
            parent.transform.setTranslation(this.findRandomFoodSpot());
            if (this.runningFoodCount == BoardData.RUNNING_FOOD_MAXIMUM) {
                this.runningFood = false;
                this.runningFoodCount = 0;
            }
            this.runningFoodCount++;
            this.timeSinceLastMoveInMs = 0;
        }
        this.timeSinceLastMoveInMs += gameTime.elapsedTimeInMs;
    }

    findRandomFoodSpot() {
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
        let oldTail = this.snakeList.tail;
        let newTail = new snakeNode(
            oldTail.id + 1, oldTail.x_pat + (-oldTail.direct.x), oldTail.y_pat + (-oldTail.direct.y), oldTail.direct
        );

        this.snakeList.append(newTail);

        let transform;
        let artist;
        let bodySprite;

        let newTailDir = newTail.prev.direct.x == 0 ? newTail.prev.direct.y : newTail.prev.direct.x - 1;

        transform = new Transform2D(
            new Vector2(
                newTail.x_pat * BoardData.GRASS_TILE_X,
                newTail.y_pat * BoardData.GRASS_TILE_Y
            ),
            newTailDir * Math.PI / 2,
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
            SnakeData.SNAKE_TAIL_SPRITE_POSITION,
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

        this.adjustSpriteDirection(
            oldTail.direct,
            oldTail,
            SnakeData.SNAKE_BODY_SPRITE_POSITION,
            new Vector2(BoardData.GRASS_TILE_X, BoardData.GRASS_TILE_Y)
        );
    }

    reduceSnake() {
        this.objectManager.remove(this.snakeList.tail.sprite);
        this.snakeList.remove();
        this.adjustSpriteDirection(
            this.snakeList.tail.direct,
            this.snakeList.tail,
            SnakeData.SNAKE_TAIL_SPRITE_POSITION,
            new Vector2(BoardData.GRASS_TILE_X, BoardData.GRASS_TILE_Y)
        );
    }

    adjustSpriteDirection(direction, snakeNode, sourcePosition, sourceDimensions) {
        direction = direction.x == 0 ? direction.y : direction.x - 1;
        snakeNode.sprite.artist.sourcePosition = sourcePosition;
        snakeNode.sprite.artist.sourceDimensions = sourceDimensions;
        snakeNode.sprite.transform.setRotationInRadians(0);
        snakeNode.sprite.transform.setRotationInRadians(direction * Math.PI / 2);
    }

    changeRandomAttribute() {
        SnakeData.resetSnakeAttributes();

        this.runningFood = false;

        let popup = document.getElementById("popup");
        popup.className = "show";
        let checkForFoodMovement = true;

        switch (Math.floor(Math.random() * 5)) {
            case (0):
                SnakeData.MOVE_INTERVAL -= 100;
                popup.innerHTML = "Speed Increased!";
                break;
            case (1):
                SnakeData.invertSnakeMovement();
                popup.innerHTML = "Controlls inverted!";
                break;
            case (2):
                SnakeData.MOVE_INTERVAL += 50;
                popup.innerHTML = "Speed Reduced!"
                break;
            case (3):
                if (this.snakeList.length > 3) {
                    this.reduceSnake();
                    checkForFoodMovement = false;
                    popup.innerHTML = "Length reduced!";
                }
                break;
            case (4):
                this.runningFood = true;
                popup.innerHTML = "Your food is running away!"
                break;
        }
        setTimeout(function () { popup.className = popup.className.replace("show", ""); }, 1500);
        return checkForFoodMovement;
    }

    handleGameEnd() {
        if (this.snakeList.length == BoardData.WINNING_LENGTH) {
            notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Play,
                    ["winning"]
                )
            );
            this.menuManager.gameEnd(this.snakeList.length, this.snakeList.food, true);
            this.snakeList.head.sprite.detachControllerByID(1);
        }
    }
}