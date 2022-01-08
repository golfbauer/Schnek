class snakeNodeController {

    constructor(snakeNodeList, menuManager, notificationCenter) {
        this.snakeNodeList = snakeNodeList;
        this.menuManager = menuManager;
        this.notificationCenter = notificationCenter;

        this.currentMoveIncrement = 0;
        this.timeSinceLastMoveInMs = 0;
    }

    update(gameTime, parent) {
        if (this.timeSinceLastMoveInMs >= SnakeData.MOVE_INTERVAL) {

            let checkForCollision = false;

            checkForCollision = this.checkForCollisionWithBorder();

            if (checkForCollision) {
                return;
            }

            let currentNode = this.snakeNodeList.tail;
            while (currentNode != null) {

                checkForCollision = this.checkForCollisionWithBody(currentNode);

                if (checkForCollision) {
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

                if (currentNode != this.snakeNodeList.head) {
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

    updateSprite(currentNode, previousNode) {
        if (currentNode.id == this.snakeNodeList.tail.id) {
            let tailDir = previousNode.direct.x == 0 ? previousNode.direct.y : previousNode.direct.x - 1;
            currentNode.sprite.transform.setRotationInRadians(tailDir * Math.PI / 2);
        } else if (currentNode.id == this.snakeNodeList.head.id) {
            let tailDir = currentNode.direct.x == 0 ? currentNode.direct.y : currentNode.direct.x - 1;
            currentNode.sprite.transform.setRotationInRadians(tailDir * Math.PI / 2);
        } else {
            let currDir = currentNode.direct;
            let prevDir = previousNode.direct;
            if (!currDir.equals(prevDir)) {
                currentNode.sprite.artist.sourcePosition = new Vector2(141, 18);
                currentNode.sprite.transform.setRotationInRadians(0);
                if ((currDir.x == 1 && prevDir.y == 1) || (currDir.y == -1 && prevDir.x == -1)) {
                    currentNode.sprite.transform.setRotationInRadians(Math.PI / 2);
                } else if ((currDir.x == -1 && prevDir.y == -1) || (currDir.y == 1 && prevDir.x == 1)) {
                    currentNode.sprite.transform.setRotationInRadians(-Math.PI / 2);
                } else if ((currDir.x == 1 && prevDir.y == -1) || (currDir.y == 1 && prevDir.x == -1)) {
                    currentNode.sprite.transform.setRotationInRadians(Math.PI);
                }
            } else {
                currentNode.sprite.artist.sourcePosition = new Vector2(65, 15);
                currentNode.sprite.transform.setRotationInRadians(0);
                if (prevDir.y != 0) {
                    currentNode.sprite.transform.setRotationInRadians(Math.PI / 2);
                }
            }
        }
    }

    checkForCollisionWithBody(currentNode) {
        let head = this.snakeNodeList.head;

        if (currentNode.x_pat == head.x_pat + head.direct.x
            && currentNode.y_pat == head.y_pat + head.direct.y) {
            notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Play,
                    ["death"]
                )
            );
            this.updateSprite(head, head.prev);
            this.passingOnInfoAfterCollision();
            return true;
        }
        return false;
    }

    checkForCollisionWithBorder() {
        let head = this.snakeNodeList.head;

        if (head.x_pat + head.direct.x >= BoardData.BOARD_X_TILES
            || head.x_pat + head.direct.x < 0
            || head.y_pat + head.direct.y >= BoardData.BOARD_Y_TILES
            || head.y_pat + head.direct.y < 0) {
            notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Play,
                    ["death"]
                )
            );
            this.updateSprite(head, head.prev);
            this.passingOnInfoAfterCollision();
            return true;
        }
        return false;
    }

    passingOnInfoAfterCollision() {
        this.menuManager.death(this.snakeNodeList.length, this.snakeNodeList.food);
        this.snakeNodeList.head.sprite.detachControllerByID(1);
    }
}