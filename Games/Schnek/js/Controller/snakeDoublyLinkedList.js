class snakeNode {
    constructor(id, x_pat, y_pat, direct) {
        this.id = id;
        this.next = null;
        this.prev = null;
        this.x_pat = x_pat;
        this.y_pat = y_pat;
        this.direct = direct;
    }

    set direct(direct) {
        this._direct = direct;
    }

    set priv(priv) {
        this._priv = priv;
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
        this.printList();
    }

    iterateBackwards() {
        let tempNode = this.tail;
        while(tempNode.prev != null) {
          tempNode.direct = tempNode.prev.direct.clone();
          tempNode = tempNode.prev;
        }
    }

    getById(newId) {
        let currentNode = this.head;
        while (currentNode !== null) {
            if(currentNode.id == newId) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        throw "Error: Id does not exist in Doubly Linked List";
    }
}