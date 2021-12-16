class snakeMovementController {

    constructor(keyboardManager, snakeNodeList) {
        this.keyboardManager = keyboardManager;
        this.snakeNodeList = snakeNodeList;
    }

    update(gameTime, parent) {
        if (this.keyboardManager.isAnyKeyPressed()) {
            this.snakeNodeList.head.next.direct = this.snakeNodeList.head.direct.clone();
            if (this.keyboardManager.isKeyDown(Keys.A) && !new Vector2(-1, 0).equals(this.snakeNodeList.head.direct)) {
                this.snakeNodeList.head.direct.x = -1;
                this.snakeNodeList.head.direct.y = 0;

            } else if (this.keyboardManager.isKeyDown(Keys.D) && !new Vector2(1, 0).equals(this.snakeNodeList.head.direct)) {
                this.snakeNodeList.head.direct.x = 1;
                this.snakeNodeList.head.direct.y = 0;

            } else if (this.keyboardManager.isKeyDown(Keys.W) && !new Vector2(0, -1).equals(this.snakeNodeList.head.direct)) {
                this.snakeNodeList.head.direct.x = 0;
                this.snakeNodeList.head.direct.y = -1;

            } else if (this.keyboardManager.isKeyDown(Keys.S) && !new Vector2(0, 1).equals(this.snakeNodeList.head.direct)) {
                this.snakeNodeList.head.direct.x = 0;
                this.snakeNodeList.head.direct.y = 1;

            }
        }
    }
}