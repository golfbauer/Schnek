class snakeMovementController {

    constructor(keyboardManager, snakeList) {
        this.keyboardManager = keyboardManager;
        this.snakeList = snakeList;
    }

    /**
     * Will forward the direction the player wants the Snake to move to the Snakes Head Node
     * @param {*} gameTime 
     * @param {*} parent 
     */
    update(gameTime, parent) {
        if (this.keyboardManager.isAnyKeyPressed()) {
            let nextDirect = this.snakeList.head.next.direct;
            if ((this.keyboardManager.isKeyDown(SnakeData.MOVE_LEFT) || this.keyboardManager.isKeyDown(SnakeData.MOVE_LEFT_ARROW)) 
                 && !nextDirect.equals(new Vector2(1, 0))) {
                     
                this.snakeList.head.direct.x = -1;
                this.snakeList.head.direct.y = 0;

            } else if ((this.keyboardManager.isKeyDown(SnakeData.MOVE_RIGHT) || this.keyboardManager.isKeyDown(SnakeData.MOVE_RIGHT_ARROW))
                        && !nextDirect.equals(new Vector2(-1, 0))) {

                this.snakeList.head.direct.x = 1;
                this.snakeList.head.direct.y = 0;

            } else if ((this.keyboardManager.isKeyDown(SnakeData.MOVE_UP) || this.keyboardManager.isKeyDown(SnakeData.MOVE_UP_ARROW))
                        && !nextDirect.equals(new Vector2(0, 1))) {

                this.snakeList.head.direct.x = 0;
                this.snakeList.head.direct.y = -1;

            } else if ((this.keyboardManager.isKeyDown(SnakeData.MOVE_DOWN) || this.keyboardManager.isKeyDown(SnakeData.MOVE_DOWN_ARROW))
                        && !nextDirect.equals(new Vector2(0, -1))) {

                this.snakeList.head.direct.x = 0;
                this.snakeList.head.direct.y = 1;

            }
        }
    }
}