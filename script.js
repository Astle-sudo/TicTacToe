const gameBoard = (size,gridheight,gridWidth) => {
    function gridBox (gh,gW) {
        let grid = document.createElement('div');
        grid.style.height = "" + gh + "px";
        grid.style.width = "" + gW + "px";
        grid.style.backgroundColor = "white";
        grid.style.textAlign = "center";
        grid.style.fontSize = "5em";
        grid.style.border = "2px solid black";
        grid.innerHTML = ""
        return grid;
    }
    function rows (number) {
        let row = document.createElement('div');
        row.style.height = "" + gridheight + "px";
        row.style.width = "" + number*gridWidth + "px";
        row.style.display = "flex";
        for (let i=0; i < number; i++) {
            row.appendChild(gridBox(gridheight,gridWidth,""));
        }
        return row;
    }
    let container = document.createElement('div');
    container.classList.add("container-class")
    container.style.height = "" + size*gridheight + "px";
    container.style.width = "" + size*gridWidth + "px";
    container.style.backgroundColor = "black";
    for (let i=0; i < size; i++) {
        container.appendChild(rows(size));
    }

    return {container};
}

let gridSize = 3;
let turns = 0;
let gameBox = gameBoard (gridSize,100,100);
document.body.appendChild(gameBox.container);

function condition (array) {
    if (array.length == 1) {
        return false;
    }
    for (let i=0; i < array.length-1; i++) {
        if (array[i] != array[i+1] || array[i] == "") {
            return false;
        }
    }
    return true;
}

function check () {
    let d1 = [];
    let d2 = [];
    for (let i=0; i < gridSize; i++) {
        let r = [];
        let c = [];
        for (let j=0; j < gridSize; j++) {
            r.push(gameBox.container.children[i].children[j].innerHTML);
            c.push(gameBox.container.children[j].children[i].innerHTML);
            if (i == j) {
                d1.push(gameBox.container.children[i].children[j].innerHTML);
            }
            if (i + j == gridSize-1) {
                d2.push(gameBox.container.children[i].children[j].innerHTML);
            }
        }
        if (condition(r) || condition(c)) {
            alert("Game Over");
        }
    }
    if (condition(d1) || condition(d2)) {
        alert("Game Over");
    }
}

for (let i=0; i < gridSize; i++) {
    for (let j=0; j < gridSize; j++) {
        gameBox.container.children[i].children[j].addEventListener("click",() => {
            if (turns >= (gridSize*gridSize)-1) {
                alert("Draw");
            }
            else if (turns % 2 == 0) {
                gameBox.container.children[i].children[j].innerHTML = "X";
                gameBox.container.children[i].children[j].style.color = "red";
                turns += 1;
            }
            else {
                gameBox.container.children[i].children[j].innerHTML = "O";
                gameBox.container.children[i].children[j].style.color = "blue";
                turns += 1;
            }
            check();
        })
    } 
}



