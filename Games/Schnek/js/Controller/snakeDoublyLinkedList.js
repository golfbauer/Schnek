class snakeNode {
    constructor(id, x_pat, y_pat, direct, sprite) {
        this.id = id;
        this.next = null;
        this.prev = null;
        this.x_pat = x_pat;
        this.y_pat = y_pat;
        this.direct = direct;
        this.sprite = sprite;
    }

    set direct(direct) {
        this._direct = direct;
    }

    set priv(priv) {
        this._priv = priv;
    }

    set sprite(sprite) {
        this._sprite = sprite;
    }

    get sprite() {
        return this._sprite;
    }

    get direct() {
        return this._direct;
    }

    get priv() {
        return this._priv;
    }
}

class snakeList {

    constructor(snakeNodeHead) {
        this.head = snakeNodeHead;
        this.length = 1;
        this.tail = this.head;
        this.food = 0;
        this.lives = 0;
    }

    printList() {
        let array = [];
        let currentList = this.head;
        while (currentList !== null) {
            array.push(currentList.id);
            currentList = currentList.next;
        }

        console.log(array.join(' <--> '));
        return this;
    }

    append(newNode) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;

        this.length++;
    }

    remove() {
        this.tail = this.tail.prev;
        this.tail.next = null;
    }

    getById(newId) {
        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.id == newId) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        throw "Error: Id does not exist in Doubly Linked List";
    }

    getAllPositions() {
        let array = [];
        let currentList = this.head;
        while (currentList !== null) {
            array.push(new Vector2(currentList.x_pat, currentList.y_pat));
            currentList = currentList.next;
        }
        return array;
    }

    stopSnake() {
        let currentList = this.head;
        while (currentList !== null) {
            currentList.direct = Vector2.Zero;
            currentList = currentList.next;
        }
    }
}