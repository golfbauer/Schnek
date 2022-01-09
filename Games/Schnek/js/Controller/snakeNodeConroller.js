class snakeNodeController {

    constructor(snakeList, menuManager, notificationCenter) {
        this.snakeList = snakeList;
        this.menuManager = menuManager;
        this.notificationCenter = notificationCenter;

        this.currentMoveIncrement = 0;
        this.timeSinceLastMoveInMs = 0;
    }

    /**
     * Checks for collision with border or body, moves Snake forward, updates all Sprites accordingly
     * @param {*} gameTime 
     * @param {*} parent 
     * @returns Prevents method from further running after Snake dies
     */
    update(gameTime, parent) {
        if (this.timeSinceLastMoveInMs >= SnakeData.MOVE_INTERVAL) {

            if (this.checkForCollisionWithBorder()) {
                return;
            }

            let currentNode = this.snakeList.tail;
            while (currentNode != null) {

                if (this.checkForCollisionWithBody(currentNode)) {
                    return;
                }

                let translateBy = new Vector2(
                    currentNode.direct.x * BoardData.GRASS_TILE_X,
                    currentNode.direct.y * BoardData.GRASS_TILE_Y,
                );
                currentNode.sprite.transform.translateBy(translateBy);

                currentNode.x_pat = currentNode.x_pat + currentNode.direct.x;
                currentNode.y_pat = currentNode.y_pat + currentNode.direct.y;

                this.updateSprite(currentNode, currentNode.prev);

                if (currentNode != this.snakeList.head) {
                    let prevDirect = currentNode.prev.direct.clone();
                    currentNode.direct = prevDirect;
                }

                currentNode = currentNode.prev;
            }

            this.timeSinceLastMoveInMs = 0;
            this.currentMoveIncrement++;
        }

        this.timeSinceLastMoveInMs += gameTime.elapsedTimeInMs;
    }

    /**
     * Updates the Sprite of the current Node using the direction from the current and previous Node
     * @param {snakeNode} currentNode 
     * @param {snakeNode} previousNode 
     */
    updateSprite(currentNode, previousNode) {
        let currDir;
        let prevDir;
        switch (currentNode) {
            case (this.snakeList.tail):
                prevDir = previousNode.direct;
                let tailDir = prevDir.x == 0 ? prevDir.y : prevDir.x - 1;
                currentNode.sprite.transform.setRotationInRadians(tailDir * Math.PI / 2);
                break;
            case (this.snakeList.head):
                currDir = currentNode.direct;
                let headDir = currDir.x == 0 ? currDir.y : currDir.x - 1;
                currentNode.sprite.transform.setRotationInRadians(headDir * Math.PI / 2);
                break;
            default:
                currDir = currentNode.direct;
                prevDir = previousNode.direct;
                if (!currDir.equals(prevDir)) {
                    currentNode.sprite.artist.sourcePosition = SnakeData.SNAKE_BODY_CURVE_SPRITE_POSITION;
                    currentNode.sprite.transform.setRotationInRadians(0);
                    if ((currDir.x == 1 && prevDir.y == 1) || (currDir.y == -1 && prevDir.x == -1)) {
                        currentNode.sprite.transform.setRotationInRadians(Math.PI / 2);
                    } else if ((currDir.x == -1 && prevDir.y == -1) || (currDir.y == 1 && prevDir.x == 1)) {
                        currentNode.sprite.transform.setRotationInRadians(-Math.PI / 2);
                    } else if ((currDir.x == 1 && prevDir.y == -1) || (currDir.y == 1 && prevDir.x == -1)) {
                        currentNode.sprite.transform.setRotationInRadians(Math.PI);
                    }
                } else {
                    currentNode.sprite.artist.sourcePosition = SnakeData.SNAKE_BODY_SPRITE_POSITION;
                    currentNode.sprite.transform.setRotationInRadians(0);
                    if (prevDir.y != 0) {
                        currentNode.sprite.transform.setRotationInRadians(Math.PI / 2);
                    }
                }
                break;
        }
    }

    /**
     * Checks if Snake head will collide with body after User locked his input
     * @param {snakeNode} currentNode 
     * @returns Boolean that will tell the outer function to return
     */
    checkForCollisionWithBody(currentNode) {
        let head = this.snakeList.head;

        if (currentNode.x_pat == head.x_pat + head.direct.x
            && currentNode.y_pat == head.y_pat + head.direct.y) {
            return this.handleDeath();
        }
        return false;
    }

    /**
     * Checks if Snake head will collide with border after User locked his input
     * @returns Boolean that will tell the outer function to return
     */
    checkForCollisionWithBorder() {
        let head = this.snakeList.head;

        if (head.x_pat + head.direct.x >= BoardData.BOARD_X_TILES
            || head.x_pat + head.direct.x < 0
            || head.y_pat + head.direct.y >= BoardData.BOARD_Y_TILES
            || head.y_pat + head.direct.y < 0) {
            return this.handleDeath();
        }
        return false;
    }

    /**
     * Handles required steps after death sound, updatesHeadSprite, opensGameEndMenu, detachesController
     * @returns Boolean that will tell the outer function to return
     */
    handleDeath() {
        let head = this.snakeList.head;
        notificationCenter.notify(
            new Notification(
                NotificationType.Sound,
                NotificationAction.Play,
                ["death"]
            )
        );
        this.updateSprite(head, head.prev);
        this.menuManager.gameEnd(this.snakeList.length, this.snakeList.food);
        this.snakeList.head.sprite.detachControllerByID(1);
        return true;
    }
}