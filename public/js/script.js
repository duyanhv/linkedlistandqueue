$('#randMethod').on('click', (e) => {
    window.location.replace("/random");
});

$('#btnAddList').on('click', (e) => {
    e.preventDefault();
    let num1 = $('input[name = "num1"]').val();
    let num2 = $('input[name = "num2"]').val();

    $.ajax({
        url: '/api/addList',
        method: 'POST',
        data: {
            num1: num1,
            num2: num2
        }
    }).done((res) => {

    });
});

$('#btnAddQueue').on('click', (e) => {
    e.preventDefault();
    let num1 = $('input[name = "num1"]').val();
    let num2 = $('input[name = "num2"]').val();

    $.ajax({
        url: 'api/addQueue',
        method: 'POST',
        data: {
            num1: num1,
            num2: num2
        }
    }).done((res) => {

    });
});

let sendOperator = (op) => {
    let ajaxUrl = ['api/sum', 'api/sub', 'api/mul', 'api/div'];
    let operator;

    let num1 = $('input[name = "num1"]').val();
    let num2 = $('input[name = "num2"]').val();

    switch (op) {
        case '+':
            operator = ajaxUrl[0];
            break;

        case '-':
            operator = ajaxUrl[1];
            break;

        case '*':
            operator = ajaxUrl[2];
            break;

        case '/':
            operator = ajaxUrl[3];
            break;
    }
    
    $.ajax({
        url: operator,
        method: 'POST',
        data: {
            num1: num1,
            num2: num2
        }
    }).done((res) =>{
        $('#result').text(`Ket qua la: ${res}`);
    });
}

$('#calCu').on('click', (e) => {
    e.preventDefault();

    let operator = $('input[name = "operator"]').val();

    switch (operator) {
        case '+':
            sendOperator(operator);
            break;

        case '-':
            sendOperator(operator);
            break;

        case '*':
            sendOperator(operator);
            break;

        case '/':
            sendOperator(operator);
            break;

        default:
            alert('Please input operator');
            break;
    }
});
