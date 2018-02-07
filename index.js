const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
let app = express();
const fs = require('fs');
const List = require('linkedlist-js').List;
const Queue = require('queue-fifo');

const config = require('./config');

app.use(bodyparser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({ defaultLayout: 'index' }));
app.set("view engine", "handlebars");


let randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    var rand = Math.floor(Math.random() * (max - min)) + min;
    return rand;
}

const sumArray = (a, b) => {
    var c = [];
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
        c.push((a[i] || 0) + (b[i] || 0));
    }
    return c;
}

const mulArray = (a, b) => {
    var c = [];
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
        c.push((a[i] || 0) * (b[i] || 0));
    }
    return c;
}

function subArray(a, b) {
    var c = [];
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
        c.push((a[i] || 0) - (b[i] || 0));
    }
    return c;
}

function divArray(a, b) {
    var c = [];
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
        c.push(Math.floor((a[i] || 0) / (b[i] || 0)));
    }
    return c;
}

let initJson = () => {
    if (!fs.exists('test.json')) {
        fs.writeFileSync('test.json', '[{"id":0,"number1":[],"number2":[]}]');
        console.log("chay vao initJson");

    } else {
        console.log("file exixsted");
    }
}

let pushJson = (a, b) => {
    var testJson = require('./test.json');

    var jsonStr = testJson;

    var newValues = { "id": testJson.length, "number1": a, "number2": b };

    jsonStr.push(newValues);
    fs.writeFile('test.json', JSON.stringify(jsonStr), (err, res) => {
        if (err) console.error(err);
        console.log('Create JSon Success');
    });
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


    //=========================================

    return {
        a, b
    };

}

// DEMO LIST:
let listDemo = (a, b) => {
    // let newGen = genArrays();
    // let a = newGen.a;
    // let b = newGen.b;
    let list1 = new List();
    let list2 = new List();


    for (let i = 0; i < a.length; i++) {
        list1.push(a[i]);
    }


    for (let j = 0; j < b.length; j++) {
        list2.push(b[j]);
    }

    // initJson();
    // pushJson(list1.asArray(), list2.asArray());

    // list1.each(function (g, node1) {
    //     console.log('list1: ' + g + ': ' + node1.value());
    // });

    // list2.each(function (h, node2) {
    //     console.log('list2: ' + h + ': ' + node2.value());
    // });

    let c = [];
    c = sumArray(list1.asArray(), list2.asArray());

    return {
        list1, list2, c
    }
}

let queueDemo = (a, b) => {
    let queue1 = new Queue();
    let queue2 = new Queue();

    for (let i = 0; i < a.length; i++) {
        queue1.enqueue(a[i]);
    }

    for (let j = 0; j < b.length; j++) {
        queue2.enqueue(b[j]);
    }

    let c = [];
    c = sumArray(convertToArray(queue1), convertToArray(queue2));

    return {
        queue1, queue2, c
    };
}

let convertToArray = (queue) => {
    let arr = [];
    while (!queue.isEmpty()) {
        arr.push(queue.peek());
        queue.dequeue();
    }
    return arr;
}


app.get('/', (req, res) => {
    res.render('genrand');
    // console.log(`Thoi gian chay genArrays() = ${tEnd} secs`);
});

var newArrays;

app.get('/random', (req, res) => {
    let tStart = process.hrtime();
    newArrays = genArrays();
    let tEnd = process.hrtime(tStart);
    res.render('genrand', {
        a: newArrays.a,
        b: newArrays.b
    });
});

const util = require('util');


app.get('/addList', (req, res) => {
    let list;
    // if(newArrays.a){
    //     list = listDemo(newArrays.a, newArrays.b);
    // }else{

    // }
    // res.send(JSON.stringify(util.inspect(list)));
    
    console.log(list);
    console.log(req.body);
});

app.post('/api/hjx', (req, res) => {
    let numArr = getNumFromInput(req.body.num1, req.body.num2);
    let list;
    list = listDemo(numArr.num1Arr, numArr.num2Arr);
    console.log(list);
});

app.get('/addQueue', (req, res) => {
    let queue = queueDemo(newArrays.a, newArrays.b);
    // console.log(queue);
    console.log(queue);
});

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

app.post('/input', (req, res) => {
    let numArr = getNumFromInput(req.body.num1, req.body.num2);
    res.render('genrand', {
        a: numArr.num1Arr,
        b: numArr.num2Arr
    });
});


app.use(express.static('public'));

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Connected on port ${config.port}`);
    }
});