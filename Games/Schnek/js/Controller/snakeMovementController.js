class snakeMovementController {

    constructor(keyboardManager, snakeNodeList) {
        this.keyboardManager = keyboardManager;
        this.snakeNodeList = snakeNodeList;
    }

    //TODO: Pressing different and then quickly after same direction will make the snake turn 180 -- not gud

    update(gameTime, parent) {
        if (this.keyboardManager.isAnyKeyPressed()) {
            let nextDirect = this.snakeNodeList.head.next.direct;
            if (this.keyboardManager.isKeyDown(Keys.A) && !nextDirect.equals(new Vector2(1, 0))) {
                this.snakeNodeList.head.direct.x = -1;
                this.snakeNodeList.head.direct.y = 0;

            } else if (this.keyboardManager.isKeyDown(Keys.D) && !nextDirect.equals(new Vector2(-1, 0))) {
                this.snakeNodeList.head.direct.x = 1;
                this.snakeNodeList.head.direct.y = 0;

            } else if (this.keyboardManager.isKeyDown(Keys.W) && !nextDirect.equals(new Vector2(0, 1))) {
                this.snakeNodeList.head.direct.x = 0;
                this.snakeNodeList.head.direct.y = -1;

            } else if (this.keyboardManager.isKeyDown(Keys.S) && !nextDirect.equals(new Vector2(0, -1))) {
                this.snakeNodeList.head.direct.x = 0;
                this.snakeNodeList.head.direct.y = 1;

            }
        }
    }
}