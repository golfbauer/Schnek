class pattern {

    constructor (grass_tile, snake_tile, object_tile, updated, direct) {
        this.grass_tile = grass_tile;
        this.snake_tile = snake_tile;
        this.object_tile = object_tile;
        this.updated = updated;
        this.direct = direct;
    }

    get grass_tile() {
        return this.grass_tile;
    }
    get object_tile() {
        return this.object_tile;
    }
    get snake_tile() {
        return this.sanke_tile;
    }
    get updated() {
        return this.updated;
    }
    get direct() {
        return this.direct;
    }

    set grass_tile(grass_tile) {
        this.grass_tile = grass_tile;
    }
    set object_tile(object_tile) {
        this.object_tile = object_tile;
    }
    set snake_tile(snake_tile) {
        this.snake_tile = snake_tile;
    }
    set updated(updated) {
        this.updated = updated;
    }
    set direct(direct) {
        this.direct = direct;
    }
}