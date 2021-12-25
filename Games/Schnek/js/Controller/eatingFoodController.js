class eatingFoodController {

    constructor(snakeList) {
        this.snakeList = snakeList;
    }

    update(gameTime, parent) {
        let snakeHead = this.snakeList.head;
        let xFood = (parent.transform.translation.x-5)/40;
        let yFood = (parent.transform.translation.y-5)/40;
        if(snakeHead.x_pat ==  xFood
            && snakeHead.y_pat == yFood) {
                parent.transform.setTranslation(this.randomSpot());
        }
    }

    randomSpot() {
        let randomSpot = new Vector2(
            Math.floor(Math.random() * 17),
            Math.floor(Math.random() * 15)
        );
        let array = this.snakeList.getAllLocations();
        for(let i = 0; i < array.length;i++) {
            if(randomSpot.equals(array[i])) {
                i = 0;
                randomSpot = new Vector2(
                    Math.floor(Math.random() * 17),
                    Math.floor(Math.random() * 15)
                );
            }
        }
        randomSpot.x = randomSpot.x*40+5;
        randomSpot.y = randomSpot.y*40+5;

        return randomSpot;
    }
}