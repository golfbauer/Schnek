class snakeNodeController {

    constructor(snakeNodeList) {
        this.snakeNodeList = snakeNodeList;

        this.currentMoveIncrement = 0;
        this.timeSinceLastMoveInMs = 0;
        this.move_interval = SnakeData.MOVE_INTERVAL;
    }

    update(gameTime, parent) {
        if (this.timeSinceLastMoveInMs >= this.move_interval) {

            let currentNode = this.snakeNodeList.tail;
            while (currentNode != null) {

                let translateBy = new Vector2(
                    currentNode.direct.x * BoardData.GRASS_TILE_X,
                    currentNode.direct.y * BoardData.GRASS_TILE_Y,
                );
                currentNode.x_pat = currentNode.x_pat + currentNode.direct.x;
                currentNode.y_pat = currentNode.y_pat + currentNode.direct.y;

                this.updateSprite(currentNode, currentNode.prev);

                currentNode.sprite.transform.translateBy(translateBy);

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
            let tailDir = currentNode.prev.direct.x == 0 ? currentNode.prev.direct.y : currentNode.prev.direct.x - 1;
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
}