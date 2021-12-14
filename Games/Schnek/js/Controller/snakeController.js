class snake {
    constructor(next, prev, x_pat, y_pat, snake_type, direct, len) {
        this.next = next;
        this.prev = prev;
        this.x_pat = x_pat;
        this.y_pat = y_pat;
        this.snake_type = snake_type;
        this.direct = direct;
        this.len = len;
    }

    constructor(next, prev, x_pat, y_pat, snake_type, direct) {
        this.next = next;
        this.prev = prev;
        this.x_pat = x_pat;
        this.y_pat = y_pat;
        this.snake_type = snake_type;
        this.direct = direct;
    }

    constructor(next, prev, x_pat, y_pat, snake_type) {
        this.next = next;
        this.prev = prev;
        this.x_pat = x_pat;
        this.y_pat = y_pat;
        this.snake_type = snake_type;
    }

    get next() {
        return this.next;
    }
    get prev() {
        return this.prev;
    }
    get x_pat() {
        return this.x_pat;
    }
    get y_pat() {
        return this.y_pat;
    }
    get snake_type() {
        return this.snake_type;
    }
    get direct() {
        return this.direct;
    }
    get len() {
        return this.len;
    }

    set next(next) {
        this.next = next;
    }
    set prev(prev) {
        this.prev = prev;
    }
    set x_pat(x_pat) {
        this.x_pat = x_pat;
    }
    set y_pat(y_pat) {
        this.y_pat = y_pat;
    }
    set snake_type(snake_type) {
        this.snake_type = snake_type;
    }
    set direct(direct) {
        this.direct = direct;
    }
    set len(len) {
        this.len = len;
    }
}