const fs = require('fs');

let initJson = () => {
    if (!fs.exists('../test.json')) {
        fs.writeFileSync('test.json', '[{"id":0,"number1":[],"number2":[]}]');
        console.log("Create File Success");
    } else {
        console.log("File Exixsted");
    }
}

let pushJson = (a, b) => {
    var testJson = require('../test.json');

    var jsonStr = testJson;

    var newValues = { "id": testJson.length, "number1": a, "number2": b };

    jsonStr.push(newValues);
    fs.writeFile('test.json', JSON.stringify(jsonStr), (err, res) => {
        if (err) console.error(err);
        console.log('Write File Success');
    });
}

module.exports ={
    initJson,
    pushJson
}