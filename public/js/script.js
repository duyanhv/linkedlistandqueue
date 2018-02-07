$('#randMethod').on('click', (e) =>{
    window.location.replace("/random");
});

$('#btnAdd').on('click', (e) =>{
    e.preventDefault();
    let num1 = $('input[name = "num1"]').val();
    let num2 = $('input[name = "num2"]').val();
    
    $.ajax({
        url: '/api/hjx',
        method: 'POST',
        data:{
            num1: num1,
            num2: num2
        }
    }).done((hey) =>{
        window.location.replace("/addList");
    });
});