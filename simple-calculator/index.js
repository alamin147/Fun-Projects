
const displays = document.getElementById('displays');
let result;
let a = 0;

let op;
function take(number) {

    if (number === '=') {
        ans(a)
    }
    else if (number == 'C') {
        clear(a)
    }
    else {
        a += `${number}`
        console.log(a, typeof a, a.length - 1)
        displays.innerText += number
    }
}


function ans(a) {
    let first, second, sign, plus;
    let length = a.length;

    for (let i = 0; i < length; i++) {
        if (a[i] == '+' || a[i] == '-' || a[i] == '*' || a[i] == '/') {
            plus = i;
            sign = a[i];
            break;
        }
    }

    let c = [];
    c = a.split(sign);
    console.log(c)

    first = parseInt(c[0]);
    second = parseInt(c[1]);


    if (a[plus] == '+') {
        result = first + second
    }
    if (a[plus] == '-') {
        result = first - second
    }
    if (a[plus] == '*') {
        result = first * second
    }
    if (a[plus] == '/') {
        result = first / second
    }

    displays.innerText = " ";
    displays.innerText = result;

}

function clear() {
    displays.innerText = "";
    a = 0;
}