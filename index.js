const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
let app = express();
const List = require('./duyanh_linkedlist').List;
const Queue = require('queue-fifo');

const config = require('./config');
const tools = require('./config/tools');
const calculate = require('./config/calculate');
const fileController = require('./config/fileController');

app.use(bodyparser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({ defaultLayout: 'index' }));
app.set("view engine", "handlebars");


// DEMO LIST:
let listDemo = (a, b) => {
    let list1 = new List();
    let list2 = new List();

    for (let i = 0; i < a.length; i++) {
        list1.push(a[i]);
    }

    for (let j = 0; j < b.length; j++) {
        list2.push(b[j]);
    }

    // a.forEach((val) =>{
    //     list1.push(val);
    // });

    // b.forEach((val) =>{
    //     list2.push(val);
    // });

    console.log(`List1: ${list1.asArray()}`);
    console.log(`List2: ${list2.asArray()}`);
    //========================================================
    fileController.initJson();
    fileController.pushJson(list1.asArray(), list2.asArray());

    return {
        list1, list2
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
    console.log(queue1);
    console.log(queue2);

    let queue1Array = tools.convertToArray(queue1);
    let queue2Array = tools.convertToArray(queue2);
    console.log(`Queue1: ${queue1Array}`);
    console.log(`Queue2: ${queue2Array}`);
    fileController.initJson();
    fileController.pushJson(queue1Array, queue2Array);

    return {
        queue1, queue2
    };
}


app.get('/', (req, res) => {
    res.render('genrand');
    // console.log(`Thoi gian chay genArrays() = ${tEnd} secs`);
});

var newArrays;

app.get('/random', (req, res) => {

    newArrays = tools.genArrays();

    res.render('genrand', {
        a: newArrays.a,
        b: newArrays.b
    });
});

const util = require('util');


app.post('/api/addList', (req, res) => {
    let numArr = tools.getNumFromInput(req.body.num1, req.body.num2);
    let list;
    let tStart = process.hrtime();
    list = listDemo(numArr.num1Arr, numArr.num2Arr);
    let tEnd = process.hrtime(tStart);
    console.log(list);
    console.log(`Double Linked List: ${tEnd} seconds`);
});


app.post('/api/addQueue', (req, res) =>{
    let numArr = tools.getNumFromInput(req.body.num1, req.body.num2);
    let queue;
    let tStart = process.hrtime();
    queue = queueDemo(numArr.num1Arr, numArr.num2Arr);
    let tEnd = process.hrtime(tStart);
    console.log(`Queue: ${tEnd} seconds`);
});



app.post('/input', (req, res) => {
    let numArr = tools.getNumFromInput(req.body.num1, req.body.num2);
    res.render('genrand', {
        a: numArr.num1Arr,
        b: numArr.num2Arr
    });
});

app.post('/api/sum', (req, res) =>{
    let numArr = tools.getNumFromInput(req.body.num1, req.body.num2);
    let c = [];
    let tStart = process.hrtime();
    c = calculate.sumArray(numArr.num1Arr, numArr.num2Arr);
    let tEnd = process.hrtime(tStart);
    console.log(`Sum: ${tEnd} seconds`);
    res.send(c);
});

app.post('/api/sub', (req, res) =>{
    let numArr = tools.getNumFromInput(req.body.num1, req.body.num2);
    let c = [];
    c = calculate.subArray(numArr.num1Arr, numArr.num2Arr);
    res.send(c);
});

app.post('/api/mul', (req, res) =>{
    let numArr = tools.getNumFromInput(req.body.num1, req.body.num2);
    let c = [];
    c = calculate.mulArray(numArr.num1Arr, numArr.num2Arr);
    res.send(c);
});

app.post('/api/div', (req, res) =>{
    let numArr = tools.getNumFromInput(req.body.num1, req.body.num2);
    let c = [];
    c = calculate.divArray(numArr.num1Arr, numArr.num2Arr);
    res.send(c);
});




app.use(express.static('public'));

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Connected on port ${config.port}`);
    }
});