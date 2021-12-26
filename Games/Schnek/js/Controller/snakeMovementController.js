class snakeMovementController {

    constructor(keyboardManager, snakeNodeList) {
        this.keyboardManager = keyboardManager;
        this.snakeNodeList = snakeNodeList;
    }

    update(gameTime, parent) {
        if (this.keyboardManager.isAnyKeyPressed()) {
            if (this.keyboardManager.isKeyDown(Keys.A)) {
                this.snakeNodeList.head.direct.x = -1;
                this.snakeNodeList.head.direct.y = 0;

            } else if (this.keyboardManager.isKeyDown(Keys.D)) {
                this.snakeNodeList.head.direct.x = 1;
                this.snakeNodeList.head.direct.y = 0;

            } else if (this.keyboardManager.isKeyDown(Keys.W)) {
                this.snakeNodeList.head.direct.x = 0;
                this.snakeNodeList.head.direct.y = -1;

            } else if (this.keyboardManager.isKeyDown(Keys.S)) {
                this.snakeNodeList.head.direct.x = 0;
                this.snakeNodeList.head.direct.y = 1;

            }
        }
    }
}