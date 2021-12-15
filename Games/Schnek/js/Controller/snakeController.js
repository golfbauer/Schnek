class snakeNode {
    constructor(x_pat, y_pat, direct) {
        this.next = null;
        this.prev = null;
        this.x_pat = x_pat;
        this.y_pat = y_pat;
        this.direct = direct;
        
        this.currentMoveIncrement = 0;
        this.timeSinceLastMoveInMs = 0;
        this.move_interval = 1000;
        
    }

    update(gameTime, parent) {
        if(this.timeSinceLastMoveInMs >= this.move_interval) {
            let translateBy = new Vector2(
                this.direct.x * 60,
                this.direct.y * 60,
            );
            this.x_pat = this.x_pat+this.direct.x;
            this.y_pat = this.y_pat+this.direct.y;

            parent.transform.translateBy(translateBy);

            this.timeSinceLastMoveInMs = 0;

            this.currentMoveIncrement++;
        }

        this.timeSinceLastMoveInMs += gameTime.elapsedTimeInMs;
    }
}
class snakeController {
    constructor(snakeNodeHead) {
        this.head = snakeNodeHead;
        this.length = 1;
        this.tail = this.head;
    }

    printList() {
        let array = [];
        let currentList = this.head;
        while (currentList !== null) {
            array.push(currentList.direct);
            currentList = currentList.next;
        }

        console.log(array.join(' <--> '));
        return this;
    }

    append(newNode) {
        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;

        this.length++;
        this.printList();
    }
}