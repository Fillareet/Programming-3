var matrix = [];

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var tntArr = [];
var vikingArr = [];
var side = 35;

function setup() {
    matrix = generateMatrix(40);
    createObjects(); 
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side)
    background("grey");
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("grey");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("orange");
            } else if (matrix[y][x] == 5) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }

    for (var i in predatorArr) {
        predatorArr[i].eat();
    }

    for (var i in tntArr) {
        tntArr[i].crash();
    }

    for (var i in vikingArr) {
         vikingArr[i].eat();
    }
}

function createObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var newGrass = new Grass(x, y, 1);
                grassArr.push(newGrass);
            } else if (matrix[y][x] == 2) {
                var newGrassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(newGrassEater);
            } else if (matrix[y][x] == 3) {
                var newPredator = new Predator(x, y, 3);
                predatorArr.push(newPredator);
            } else if (matrix[y][x] == 4) {
                var newTnt = new tnt(x, y, 4);
                tntArr.push(newTnt);
            } else if (matrix[y][x] == 5) {
                var randomSer = floor(random(2));
                var newViking = new Viking(x, y, 5, randomSer);
                vikingArr.push(newViking);
            }
        }
    }
}

function generateMatrix(size) {
    var newMatrix = [];
    for (var y = 0; y < size; y++) {
        newMatrix[y] = [];
        for (var x = 0; x < size; x++) {
            var randomId = random(100);
            if (randomId < 40) {
                newMatrix[y][x] = 1;
            } else if (randomId < 55) {
                newMatrix[y][x] = 2;
            } else if (randomId < 60) {
                newMatrix[y][x] = 3;
            } else if (randomId < 75) {
                newMatrix[y][x] = 4;
            } else if (randomId < 95) {
                newMatrix[y][x] = 5;
            }
            else {
                newMatrix[y][x] = 0;
            }
        }
    }
    return newMatrix;
}