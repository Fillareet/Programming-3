class Predator {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.energy = 7;
        this.getNewCoordinates();

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) { 
        this.getNewCoordinates();
        var found = []; 
        for (var i in this.directions) {
            var x = this.directions[i][0]; 
            var y = this.directions[i][1]; 
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) { 
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]); 
                }
            }
        }
        return found; 
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCells = random(emptyCells);
        if (this.energy >= 9 && newCells) {
            var newX = newCells[0];
            var newY = newCells[1];

            var newPredator = new Predator(newX, newY, this.id);
            predatorArr.push(newPredator);

            matrix[newY][newX] = this.id;
        }

    }
    move() {
        var emptyCells = this.chooseCell(0);
        var newCells = random(emptyCells);

        if (this.energy > 0 && newCells) {
            var newX = newCells[0];
            var newY = newCells[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.id;

            this.x = newX;
            this.y = newY;

            
        }
        this.energy--;
        this.die();
    }
    eat() {
        var emptyCells = this.chooseCell(2);
        var newCells = random(emptyCells);

        if (this.energy > 0 && newCells) {
            var newX = newCells[0];
            var newY = newCells[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.id;

            this.x = newX;
            this.y = newY;

            this.energy++;

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) { 
                    grassEaterArr.splice(i, 1); 
                    break;
                }
            }

            this.mul();
        } else {
            this.move();
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }

}

