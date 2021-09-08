class Viking {

    constructor(x, y, id, ser) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.ser = ser;
        this.energy = 10;
        this.getNewCoordinates();
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 1],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y + 1]
        ];
    }

    chooseCell(character) { 
        this.getNewCoordinates();
        var found = []; 
        for (var i in this.directions) {
            var x = this.directions[i][0]; 
            var y = this.directions[i][1]; 
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) { 
                if (matrix[y][x] == character || !character) {
                    found.push(this.directions[i]); 
                }
            }
        }
        return found; 
    }
    searchCell() {
        var found = [];

        for (var i = 0; i < this.y - 1; i++) {
            if (matrix[i][this.x] == 0) {
                found.push([this.x, i]); 
            }
        }

        for (var i = this.y + 2; i < matrix.length; i++) {
            if (matrix[i][this.x] == 0) {
                found.push([this.x, i]); 
            }
        }

        return found;
    }

    mul() {
        var emptyCells = this.searchCell(0); 
        var newCells = random(emptyCells);
        if (this.energy >= 12 && newCells) {
            var newX = newCells[0];
            var newY = newCells[1];

            var newViking = new Viking(newX, newY, this.id, this.ser);
            vikingArr.push(newViking);

            matrix[newY][newX] = this.id;
        }
    }

    move() {
        var emptyCells = this.chooseCell();
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
        var emptyCells = this.chooseCell(3);
        var newCells = random(emptyCells);
        var check = false;

        if (this.energy > 0 && newCells) {
            var newX = newCells[0];
            var newY = newCells[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.id;

            this.x = newX;
            this.y = newY;

            this.energy += 3;

            for (var i in vikingArr) {
                if (vikingArr[i].x == this.x && vikingArr[i].y == this.y) { 
                    vikingArr.splice(i, 1); 
                    break;
                }
            }

            check = true;

            this.mul();
        } else {
            emptyCells = this.chooseCell(2);
            newCells = random(emptyCells);

            if (this.energy > 0 && newCells) {
                var newX = newCells[0];
                var newY = newCells[1];

                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.id;

                this.x = newX;
                this.y = newY;

                this.energy += 1;

                for (var i in vikingArr) {
                    if (vikingArr[i].x == this.x && vikingArr[i].y == this.y) { 
                        vikingArr.splice(i, 1); 
                        break;
                    }
                }

                check = true;

                this.mul();
            }
        }

        if (check == false) {
            this.move();
        }
    }


    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in vikingArr) {
                if (vikingArr[i].x == this.x && vikingArr[i].y == this.y) {
                    vikingArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}