class snakeNodeController {

    constructor(snakeNodeList) {
        this.snakeNodeList = snakeNodeList;

        this.currentMoveIncrement = 0;
        this.currentDirectionIncrement = 0;
        this.timeSinceLastMoveInMs = 0;
        this.timeSinceDirectionChangeInMs = 0;
        this.move_interval = 200;
    }

    update(gameTime, parent) {
        if (this.timeSinceLastMoveInMs >= this.move_interval) {
            let currentNode = this.snakeNodeList.tail;

            while(currentNode != null) {

                let translateBy = new Vector2(
                    currentNode.direct.x * 40,
                    currentNode.direct.y * 40,
                );
                currentNode.x_pat = currentNode.x_pat + currentNode.direct.x;
                currentNode.y_pat = currentNode.y_pat + currentNode.direct.y;

                currentNode.sprite.transform.translateBy(translateBy);

                if(currentNode != this.snakeNodeList.head) {
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
}