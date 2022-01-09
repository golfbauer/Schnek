class snakeNode {

    /**
     * Each Node represents part of the Snake
     * @param {Number} id 
     * @param {Number} x_pat 
     * @param {Number} y_pat 
     * @param {Vector2} direct 
     * @param {Sprite} sprite 
     */
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

    /**
     * Contains all parts of Snake as a doubly Linked list
     * @param {snakeNode} snakeNodeHead 
     */
    constructor(snakeNodeHead) {
        this.head = snakeNodeHead;
        this.tail = this.head;
        this.length = 1;
        this.food = 0;
    }

    /**
     * Prints all IDs of each Node (Can be used for debugging)
     * @returns Array of IDs of each Node
     */
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

    /**
     * Adds a new Node to the List, which will become the tail
     * @param {snakeNode} newNode 
     */
    append(newNode) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;

        this.length++;
    }

    /**
     * Removes current tail and makes prev to tail
     */
    remove() {
        this.tail = this.tail.prev;
        this.tail.next = null;
    }

    /**
     * Finds Node whith given Id
     * @param {Number} id 
     * @returns 
     */
    getById(id) {
        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.id == id) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        throw "Error: Id does not exist in Doubly Linked List";
    }

    /**
     * Get all Positions from each Node inside doubly Linked list
     * @returns Array of all Positions as Vector2s
     */
    getAllPositions() {
        let array = [];
        let currentList = this.head;
        while (currentList !== null) {
            array.push(new Vector2(currentList.x_pat, currentList.y_pat));
            currentList = currentList.next;
        }
        return array;
    }
}