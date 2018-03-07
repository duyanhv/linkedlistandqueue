let randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    var rand = Math.floor(Math.random() * (max - min)) + min;
    return rand;
}

let genArrays = () => {
    let a = [];
    let b = [];
    let total = randomInt(1, 6);

    for (let i = 0; i < total; i++) {
        let j = randomInt(0, 1000);
        a.push(j);
    }


    let total2 = randomInt(1, 6);
    for (let k = 0; k < total2; k++) {
        let f = randomInt(0, 1000);
        b.push(f);
    }


    return {
        a, b
    }

}

let convertToArray = (queue) => {
    let arr = [];
    while (!queue.isEmpty()) {
        arr.push(queue.peek());
        queue.dequeue();
    }
    return arr;
}

let getNumFromInput = (num1, num2) => {
    num1 = num1.toString();
    num2 = num2.toString();
    
    let num1Arr = num1.split(',');
    let num2Arr = num2.split(',');

    for (let i = 0; i < num1Arr.length; i++) {
        num1Arr[i] = parseInt(num1Arr[i]);
    }

    for (let i = 0; i < num2Arr.length; i++) {
        num2Arr[i] = parseInt(num2Arr[i]);
    }

    return {
        num1Arr, num2Arr
    }
}

module.exports = {
    genArrays,
    convertToArray,
    getNumFromInput
}