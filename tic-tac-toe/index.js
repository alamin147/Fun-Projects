
let move = 0;

let r1 = [];
let r2 = [];
let r3 = [];


function cols1() {
let board = document.getElementById('board')
    
    let cols1 = document.getElementById('cols-1')
    if (cols1.innerText == '' || cols1.innerText == '') {
        if (move % 2 == 0) {
            cols1.innerText = 'X'
            move++;
            r1[0] = 'X'

        }
        else if (move % 2 != 0) {
            cols1.innerText = 'O'
            move++;
            r1[0] = 'O'

        }
    }
    else
        return;

        if (r1[0] != '' &&r1[1]!='' &&r1[2]!='' && r1[0] == r1[1] && r1[1] == r1[2]) {
            console.log("win", r1[0])
        }
    
        else if (r2[0] != '' &&r2[1]!='' &&r2[2]!='' && r2[0] == r2[1] && r2[1] == r2[2]) {
            console.log("win", r2[0])
        }
    
        else if (r3[0] != '' && r3[1] != '' &&r3[2] != '' && r3[0] == r3[1] && r3[1] == r3[2]) {
            console.log("win", r3[0])
        }
    
        // cols permutation
        else if (r1[0] != '' &&r2[0]!='' &&r3[0]!='' && r1[0] == r2[0] && r2[0] == r3[0]) {
            console.log("win", r1[0])
        }
        else if (r1[1] != '' && r2[1]!='' &&r3[1]!='' && r1[1] == r2[1] && r2[1] == r3[1]) {
            console.log("win", r1[1])
        }
        else if (r1[2] != ''&&r2[2]!='' &&r3[2]!='' && r1[2] == r2[2] && r2[2] == r3[2]) {
            console.log("win", r2[2])
        }
    
        else if (r1[0] != '' && r2[1]!='' && r3[2]!='' && r1[0] == r2[1] && r2[1] == r3[2]) {
            console.log("win", r1[0])
    
        }
    
        else if (r1[2] != '' &&r2[1]!='' && r3[0]!=''&& r1[2] == r2[1] && r2[1] == r3[0]) {
            console.log("win", r1[2])
    
        }
}
function cols2() {
let board = document.getElementById('board')
    
    let cols2 = document.getElementById('cols-2')

    if (cols2.innerText == '' || cols2.innerText == '') {
        if (move % 2 == 0) {
            cols2.innerText = 'X'
            move++;
            r1[1] = 'X'

        }
        else if (move % 2 != 0) {
            cols2.innerText = 'O'
            move++;
            r1[1] = 'O'

        }
    }
    else
        return;
        if (r1[0] != '' &&r1[1]!='' &&r1[2]!='' && r1[0] == r1[1] && r1[1] == r1[2]) {
            console.log("win", r1[0])
        }
    
        else if (r2[0] != '' &&r2[1]!='' &&r2[2]!='' && r2[0] == r2[1] && r2[1] == r2[2]) {
            console.log("win", r2[0])
        }
    
        else if (r3[0] != '' && r3[1] != '' &&r3[2] != '' && r3[0] == r3[1] && r3[1] == r3[2]) {
            console.log("win", r3[0])
        }
    
        // cols permutation
        else if (r1[0] != '' &&r2[0]!='' &&r3[0]!='' && r1[0] == r2[0] && r2[0] == r3[0]) {
            console.log("win", r1[0])
        }
        else if (r1[1] != '' && r2[1]!='' &&r3[1]!='' && r1[1] == r2[1] && r2[1] == r3[1]) {
            console.log("win", r1[1])
        }
        else if (r1[2] != ''&&r2[2]!='' &&r3[2]!='' && r1[2] == r2[2] && r2[2] == r3[2]) {
            console.log("win", r2[2])
        }
    
        else if (r1[0] != '' && r2[1]!='' && r3[2]!='' && r1[0] == r2[1] && r2[1] == r3[2]) {
            console.log("win", r1[0])
    
        }
    
        else if (r1[2] != '' &&r2[1]!='' && r3[0]!=''&& r1[2] == r2[1] && r2[1] == r3[0]) {
            console.log("win", r1[2])
    
        }
}
function cols3() {
let board = document.getElementById('board')
    
    let cols3 = document.getElementById('cols-3')

    if (cols3.innerText == '' || cols3.innerText == '') {
        if (move % 2 == 0) {
            cols3.innerText = 'X'
            move++;
            r1[2] = 'X'

        }
        else if (move % 2 != 0) {
            cols3.innerText = 'O'
            move++;
            r1[2] = 'O'

        }
    }
    else
        return;
        if (r1[0] != '' &&r1[1]!='' &&r1[2]!='' && r1[0] == r1[1] && r1[1] == r1[2]) {
            console.log("win", r1[0])
        }
    
        else if (r2[0] != '' &&r2[1]!='' &&r2[2]!='' && r2[0] == r2[1] && r2[1] == r2[2]) {
            console.log("win", r2[0])
        }
    
        else if (r3[0] != '' && r3[1] != '' &&r3[2] != '' && r3[0] == r3[1] && r3[1] == r3[2]) {
            console.log("win", r3[0])
        }
    
        // cols permutation
        else if (r1[0] != '' &&r2[0]!='' &&r3[0]!='' && r1[0] == r2[0] && r2[0] == r3[0]) {
            console.log("win", r1[0])
        }
        else if (r1[1] != '' && r2[1]!='' &&r3[1]!='' && r1[1] == r2[1] && r2[1] == r3[1]) {
            console.log("win", r1[1])
        }
        else if (r1[2] != ''&&r2[2]!='' &&r3[2]!='' && r1[2] == r2[2] && r2[2] == r3[2]) {
            console.log("win", r2[2])
        }
    
        else if (r1[0] != '' && r2[1]!='' && r3[2]!='' && r1[0] == r2[1] && r2[1] == r3[2]) {
            console.log("win", r1[0])
    
        }
    
        else if (r1[2] != '' &&r2[1]!='' && r3[0]!=''&& r1[2] == r2[1] && r2[1] == r3[0]) {
            console.log("win", r1[2])
    
        }
}
function cols4() {
let board = document.getElementById('board')
    
    let cols4 = document.getElementById('cols-4')
    if (cols4.innerText == '' || cols4.innerText == '') {
        if (move % 2 == 0) {
            cols4.innerText = 'X'
            move++;
            r2[0] = 'X'

        }
        else if (move % 2 != 0) {
            cols4.innerText = 'O'
            move++;
            r2[0] = 'O'

        }
    }
    else
        return;
        if (r1[0] != '' &&r1[1]!='' &&r1[2]!='' && r1[0] == r1[1] && r1[1] == r1[2]) {
            console.log("win", r1[0])
        }
    
        else if (r2[0] != '' &&r2[1]!='' &&r2[2]!='' && r2[0] == r2[1] && r2[1] == r2[2]) {
            console.log("win", r2[0])
        }
    
        else if (r3[0] != '' && r3[1] != '' &&r3[2] != '' && r3[0] == r3[1] && r3[1] == r3[2]) {
            console.log("win", r3[0])
        }
    
        // cols permutation
        else if (r1[0] != '' &&r2[0]!='' &&r3[0]!='' && r1[0] == r2[0] && r2[0] == r3[0]) {
            console.log("win", r1[0])
        }
        else if (r1[1] != '' && r2[1]!='' &&r3[1]!='' && r1[1] == r2[1] && r2[1] == r3[1]) {
            console.log("win", r1[1])
        }
        else if (r1[2] != ''&&r2[2]!='' &&r3[2]!='' && r1[2] == r2[2] && r2[2] == r3[2]) {
            console.log("win", r2[2])
        }
    
        else if (r1[0] != '' && r2[1]!='' && r3[2]!='' && r1[0] == r2[1] && r2[1] == r3[2]) {
            console.log("win", r1[0])
    
        }
    
        else if (r1[2] != '' &&r2[1]!='' && r3[0]!=''&& r1[2] == r2[1] && r2[1] == r3[0]) {
            console.log("win", r1[2])
    
        }
}
function cols5() {
let board = document.getElementById('board')
    
    let cols5 = document.getElementById('cols-5')
    if (cols5.innerText == '' || cols5.innerText == '') {
        if (move % 2 == 0) {
            cols5.innerText = 'X'
            move++;
            r2[1] = 'X'

        }
        else if (move % 2 != 0) {
            cols5.innerText = 'O'
            move++;
            r2[1] = 'O'

        }
    }
    else
        return;
        if (r1[0] != '' &&r1[1]!='' &&r1[2]!='' && r1[0] == r1[1] && r1[1] == r1[2]) {
            console.log("win", r1[0])
        }
    
        else if (r2[0] != '' &&r2[1]!='' &&r2[2]!='' && r2[0] == r2[1] && r2[1] == r2[2]) {
            console.log("win", r2[0])
        }
    
        else if (r3[0] != '' && r3[1] != '' &&r3[2] != '' && r3[0] == r3[1] && r3[1] == r3[2]) {
            console.log("win", r3[0])
        }
    
        // cols permutation
        else if (r1[0] != '' &&r2[0]!='' &&r3[0]!='' && r1[0] == r2[0] && r2[0] == r3[0]) {
            console.log("win", r1[0])
        }
        else if (r1[1] != '' && r2[1]!='' &&r3[1]!='' && r1[1] == r2[1] && r2[1] == r3[1]) {
            console.log("win", r1[1])
        }
        else if (r1[2] != ''&&r2[2]!='' &&r3[2]!='' && r1[2] == r2[2] && r2[2] == r3[2]) {
            console.log("win", r2[2])
        }
    
        else if (r1[0] != '' && r2[1]!='' && r3[2]!='' && r1[0] == r2[1] && r2[1] == r3[2]) {
            console.log("win", r1[0])
    
        }
    
        else if (r1[2] != '' &&r2[1]!='' && r3[0]!=''&& r1[2] == r2[1] && r2[1] == r3[0]) {
            console.log("win", r1[2])
    
        }
    
}
function cols6() {
let board = document.getElementById('board')
    
    let cols6 = document.getElementById('cols-6')
    if (cols6.innerText == '' || cols6.innerText == '') {
        if (move % 2 == 0) {
            cols6.innerText = 'X'
            move++;
            r2[2] = 'X'

        }
        else if (move % 2 != 0) {
            cols6.innerText = 'O'
            move++;
            r2[2] = 'O'

        }
    }
    else
        return;
        if (r1[0] != '' &&r1[1]!='' &&r1[2]!='' && r1[0] == r1[1] && r1[1] == r1[2]) {
            console.log("win", r1[0])
        }
    
        else if (r2[0] != '' &&r2[1]!='' &&r2[2]!='' && r2[0] == r2[1] && r2[1] == r2[2]) {
            console.log("win", r2[0])
        }
    
        else if (r3[0] != '' && r3[1] != '' &&r3[2] != '' && r3[0] == r3[1] && r3[1] == r3[2]) {
            console.log("win", r3[0])
        }
    
        // cols permutation
        else if (r1[0] != '' &&r2[0]!='' &&r3[0]!='' && r1[0] == r2[0] && r2[0] == r3[0]) {
            console.log("win", r1[0])
        }
        else if (r1[1] != '' && r2[1]!='' &&r3[1]!='' && r1[1] == r2[1] && r2[1] == r3[1]) {
            console.log("win", r1[1])
        }
        else if (r1[2] != ''&&r2[2]!='' &&r3[2]!='' && r1[2] == r2[2] && r2[2] == r3[2]) {
            console.log("win", r2[2])
        }
    
        else if (r1[0] != '' && r2[1]!='' && r3[2]!='' && r1[0] == r2[1] && r2[1] == r3[2]) {
            console.log("win", r1[0])
    
        }
    
        else if (r1[2] != '' &&r2[1]!='' && r3[0]!=''&& r1[2] == r2[1] && r2[1] == r3[0]) {
            console.log("win", r1[2])
    
        }
}
function cols7() {
let board = document.getElementById('board')
    
    let cols7 = document.getElementById('cols-7')
    if (cols7.innerText == '' || cols7.innerText == '') {
        if (move % 2 == 0) {
            cols7.innerText = 'X'
            move++;
            r3[0] = 'X'

        }
        else if (move % 2 != 0) {
            cols7.innerText = 'O'
            move++;
            r3[0] = 'O'

        }
    }
    else
        return;
        if (r1[0] != '' &&r1[1]!='' &&r1[2]!='' && r1[0] == r1[1] && r1[1] == r1[2]) {
            console.log("win", r1[0])
        }
    
        else if (r2[0] != '' &&r2[1]!='' &&r2[2]!='' && r2[0] == r2[1] && r2[1] == r2[2]) {
            console.log("win", r2[0])
        }
    
        else if (r3[0] != '' && r3[1] != '' &&r3[2] != '' && r3[0] == r3[1] && r3[1] == r3[2]) {
            console.log("win", r3[0])
        }
    
        // cols permutation
        else if (r1[0] != '' &&r2[0]!='' &&r3[0]!='' && r1[0] == r2[0] && r2[0] == r3[0]) {
            console.log("win", r1[0])
        }
        else if (r1[1] != '' && r2[1]!='' &&r3[1]!='' && r1[1] == r2[1] && r2[1] == r3[1]) {
            console.log("win", r1[1])
        }
        else if (r1[2] != ''&&r2[2]!='' &&r3[2]!='' && r1[2] == r2[2] && r2[2] == r3[2]) {
            console.log("win", r2[2])
        }
    
        else if (r1[0] != '' && r2[1]!='' && r3[2]!='' && r1[0] == r2[1] && r2[1] == r3[2]) {
            console.log("win", r1[0])
    
        }
    
        else if (r1[2] != '' &&r2[1]!='' && r3[0]!=''&& r1[2] == r2[1] && r2[1] == r3[0]) {
            console.log("win", r1[2])
    
        }
}
function cols8() {
let board = document.getElementById('board')
    
    let cols8 = document.getElementById('cols-8')
    if (cols8.innerText == '' || cols8.innerText == '') {
        if (move % 2 == 0) {
            cols8.innerText = 'X'
            move++;
            r3[1] = 'X'

        }
        else if (move % 2 != 0) {
            cols8.innerText = 'O'
            move++;
            r3[1] = 'O'

        }
    }
    else
        return;
        if (r1[0] != '' &&r1[1]!='' &&r1[2]!='' && r1[0] == r1[1] && r1[1] == r1[2]) {
            console.log("win", r1[0])
        }
    
        else if (r2[0] != '' &&r2[1]!='' &&r2[2]!='' && r2[0] == r2[1] && r2[1] == r2[2]) {
            console.log("win", r2[0])
        }
    
        else if (r3[0] != '' && r3[1] != '' &&r3[2] != '' && r3[0] == r3[1] && r3[1] == r3[2]) {
            console.log("win", r3[0])
        }
    
        // cols permutation
        else if (r1[0] != '' &&r2[0]!='' &&r3[0]!='' && r1[0] == r2[0] && r2[0] == r3[0]) {
            console.log("win", r1[0])
        }
        else if (r1[1] != '' && r2[1]!='' &&r3[1]!='' && r1[1] == r2[1] && r2[1] == r3[1]) {
            console.log("win", r1[1])
        }
        else if (r1[2] != ''&&r2[2]!='' &&r3[2]!='' && r1[2] == r2[2] && r2[2] == r3[2]) {
            console.log("win", r2[2])
        }
    
        else if (r1[0] != '' && r2[1]!='' && r3[2]!='' && r1[0] == r2[1] && r2[1] == r3[2]) {
            console.log("win", r1[0])
    
        }
    
        else if (r1[2] != '' &&r2[1]!='' && r3[0]!=''&& r1[2] == r2[1] && r2[1] == r3[0]) {
            console.log("win", r1[2])
    
        }
}
function cols9() {
let board = document.getElementById('board')
    
    let cols9 = document.getElementById('cols-9')
    if (cols9.innerText == '' || cols9.innerText == '') {
        if (move % 2 == 0) {
            cols9.innerText = 'X'
            move++;
            r3[2] = 'X'

        }
        else if (move % 2 != 0) {
            cols9.innerText = 'O'
            move++;
            r3[2] = 'O'

        }
    }
    else
        return;
        // ////////////////////////////////////////////

    if (r1[0] != '' &&r1[1]!='' &&r1[2]!='' && r1[0] == r1[1] && r1[1] == r1[2]) {
        console.log("win", r1[0])
    }

    else if (r2[0] != '' &&r2[1]!='' &&r2[2]!='' && r2[0] == r2[1] && r2[1] == r2[2]) {
        console.log("win", r2[0])
    }

    else if (r3[0] != '' && r3[1] != '' &&r3[2] != '' && r3[0] == r3[1] && r3[1] == r3[2]) {
        console.log("win", r3[0])
    }

    // cols permutation
    else if (r1[0] != '' &&r2[0]!='' &&r3[0]!='' && r1[0] == r2[0] && r2[0] == r3[0]) {
        console.log("win", r1[0])
    }
    else if (r1[1] != '' && r2[1]!='' &&r3[1]!='' && r1[1] == r2[1] && r2[1] == r3[1]) {
        console.log("win", r1[1])
    }
    else if (r1[2] != ''&&r2[2]!='' &&r3[2]!='' && r1[2] == r2[2] && r2[2] == r3[2]) {
        // console.log("win", r2[2])
        if(r1[2]){
            board.innerText=r1[2]
        }
    }

    else if (r1[0] != '' && r2[1]!='' && r3[2]!='' && r1[0] == r2[1] && r2[1] == r3[2]) {
        // console.log("win", r1[0])
        if(r1[0]){
            board.innerText=r1[0]
        }

    }

    else if (r1[2] != '' &&r2[1]!='' && r3[0]!=''&& r1[2] == r2[1] && r2[1] == r3[0]) {
        // console.log("win",)
        if(r1[2]){
            board.innerText=r1[2]
        }

    }
}



// if(r[]){
//     board.innerText={move}
// }