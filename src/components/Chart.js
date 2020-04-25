import React, { useState, useEffect } from 'react';
import {Scatter} from 'react-chartjs-2'

function Chart(props) {
    const [chartData, setChartData] = useState({})

    /* console.log(props.data.products) */

    function random_bg_color() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        return "rgb(" + x + "," + y + "," + z + ")";
    }

    var chart = () => {
        setChartData({
            datasets: [{
                label: 'Scatter Dataset',
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
            },
            {
                label: 'Second line',
                data: [{
                    x: 0,
                    y: 9
                }, 
                {
                    x: 3,
                    y: 0
                }],
                borderColor: [random_bg_color()],
                borderWidth: 1,
                pointBackgroundColor: ['#000', '#00bcd6', '#d300d6'],
                pointBorderColor: ['#000', '#00bcd6', '#d300d6'],
                fill: false,
                tension: 0,
                showLine: true
            }],
            options: [{
                scales: {
                    xAxes: [{
                       ticks: {
                          min: 0,
                          max: 10
                       },
                       gridLines: {
                          color: '#888',
                          drawOnChartArea: false
                       }
                    }],
                    yAxes: [{
                       ticks: {
                          min: 0,
                          max: 8,
                          padding: 10
                       },
                       gridLines: {
                          color: '#888',
                          drawOnChartArea: false
                       }
                    }]
                 }
            }]
        })
    }

    /* Add data to the existing chart */
    /* function addData(label, data) {
        var chart = () => {
            setChartData({
                datasets: [{
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
    } */

    useEffect(() => {
        chart()
    }, [])

    function getData(functionX, functionY, result) {
        var data = []
        var x = 0
        var y = 0
        var object1 = {x: 0, y: 0}
        var object2 = {x: 0, y: 0}

        x = result / functionY
        y = result / functionX

        /* For x = 0 */
        object1.x = 0
        object1.y = y

        data.push(object1)

        /* For y = 0 */
        object2.x = x
        object2.y = 0

        data.push(object2)
        return data
    }

    var temp = [{}]
    if (props.data.products.length > 0) {
        for (let index = 0; index < props.data.products.length; index++) {
            const element = props.data.products[index];
            var label = index + 1 + ".pravac"
            
            temp.push(getData(element.functionX, element.functionY, element.result))
        }
    }
    console.log(temp)

    var counter = 1
    if (temp.length > 0) {
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            var label = counter + ".pravac"
            addData(label, element)
            counter++         
        }
    }

    /* const items = props.data.products.map((item, key) => 
        addData(chart, ((key + 1) + ". pravac" ,(getData(item.functionX, item.functionY, item.result))))
    ) */

    if (props.data.products.length === 0) {
        return (<p className="text-center">Morate ubaciti par pravaca kako bi mogli vidjeti graf</p>)
    } else {
        return (
            <div>
                <Scatter data={chartData}/>
            </div>
        )
    }
}

export default Chart;