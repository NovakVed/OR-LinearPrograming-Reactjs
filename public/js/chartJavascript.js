var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: '1. Pravac',
            data: [{
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }],
            borderColor: [random_bg_color()],
            borderWidth: 1,
            pointBackgroundColor: ['#000', '#00bcd6', '#d300d6'],
            pointBorderColor: ['#000', '#00bcd6', '#d300d6'],
            fill: false,
            tension: 0,
            showLine: true
        },
        {
            label: 'Second line',
            data: [{
                x: 0,
                y: 4
            }, 
            {
                x: 4,
                y: 0
            }],
            borderColor: [random_bg_color()],
            borderWidth: 1,
            pointBackgroundColor: ['#000', '#00bcd6', '#d300d6'],
            pointBorderColor: ['#000', '#00bcd6', '#d300d6'],
            fill: false,
            tension: 0,
            showLine: true
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
}

function addData(chart, label, data) {
    setChartData({
        chart.data.datasets: [{
            label: label,
            data: data,
            borderColor: [random_bg_color()],
            borderWidth: 1,
            pointBackgroundColor: ['#000', '#00bcd6', '#d300d6'],
            pointBorderColor: ['#000', '#00bcd6', '#d300d6'],
            fill: false,
            tension: 0,
            showLine: true
        }]            
    });
}

function getData(functionX, functionY, result) {
    var data = [];
    var x = 0;
    var y = 0;
    var object1 = {x: 0, y: 0};
    var object2 = {x: 0, y: 0};

    x = result / functionY;
    y = result / functionX;

    /* For x = 0 */
    object1.x = 0;
    object1.y = y;

    data.push(object1);

    /* For y = 0 */
    object2.x = x;
    object2.y = 0;

    data.push(object2);
    return data;
}

if (props.data.products.length > 0) {
    for (let index = 0; index < props.data.products.length; index++) {
        const element = props.data.products[index];
        var label = index + 1 + ".pravac"
        
        addData(label, getData(element.functionX, element.functionY, element.result))
    }
}

function testAA(test){
    console.log(test)
}

console.log()