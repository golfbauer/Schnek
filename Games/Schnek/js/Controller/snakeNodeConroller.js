class snakeNodeController {

    constructor(id, snakeNodeList) {
        this.id = id;
        this.snakeNodeList = snakeNodeList;

        this.currentMoveIncrement = 0;
        this.timeSinceLastMoveInMs = 0;
        this.move_interval = 1500;
    }

    // IDEA: Update the entire list in one go since I cant decide the order in which sprite are updated.
    //       Add Sprite to snakeNode and change transition accordingly here.
    //       All Sprites still need am update but not controller anymore only the head this controller.
    update(gameTime, parent) {
        if (this.timeSinceLastMoveInMs >= this.move_interval) {

            let currentNode = this.snakeNodeList.getById(this.id);
            if (currentNode !== this.snakeNodeList.head && currentNode !== this.snakeNodeList.head.next) {
                currentNode.direct = currentNode.prev.direct.clone();
            }

            let translateBy = new Vector2(
                currentNode.direct.x * 60,
                currentNode.direct.y * 60,
            );
            currentNode.x_pat = currentNode.x_pat + currentNode.direct.x;
            currentNode.y_pat = currentNode.y_pat + currentNode.direct.y;

            parent.transform.translateBy(translateBy);

            this.timeSinceLastMoveInMs = 0;

            this.currentMoveIncrement++;
        }

        this.timeSinceLastMoveInMs += gameTime.elapsedTimeInMs;
    }
}