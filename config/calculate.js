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

const subArray = (a, b) =>{
    var c = [];
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
        c.push((a[i] || 0) - (b[i] || 0));
    }
    return c;
}

const divArray = (a, b) =>{
    var c = [];
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
        c.push(Math.floor((a[i] || 0) / (b[i] || 0)));
    }
    return c;
}

module.exports = {
    sumArray,
    mulArray,
    subArray,
    divArray
}