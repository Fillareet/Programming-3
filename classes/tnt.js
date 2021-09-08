class tnt {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.battery = 3;
    }

    crashFields() {
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

    crash() {
        this.crashFields();
        var crashCells = this.chooseCell();

        for (var i in crashCells) {
            var newCell = crashCells[i];

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 0;

            if (matrix[newY][newX] == 1) {
                this.deleteObject(grassArr, newX, newY);
                this.battery++;
            } else if (matrix[newY][newX] == 2) {
                this.deleteObject(grassEaterArr, newX, newY);
                this.battery += 2;
            } else if (matrix[newY][newX] == 3) {
                this.deleteObject(predatorArr, newX, newY);
                this.battery += 3;
            } else if (matrix[newY][newX] == 4) {
                this.deleteObject(tntArr, newX, newY);
                this.battery--;
            } else if (matrix[newY][newX] == 5) {
                this.deleteObject(vikingArr, newX, newY);
                this.battery += 4;
            }
        }


        this.battery--;

        this.die();
    }

    deleteObject(arr, x, y) {
        for (var i in arr) {
            if (arr[i].x == x && arr[i].y == y) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    die() {
        if (this.battery <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in tntArr) {
                if (tntArr[i].x == this.x && tntArr[i].y == this.y) {
                    tntArr.splice(i, 1);
                    break;
                }
            }
        }
    }

}
