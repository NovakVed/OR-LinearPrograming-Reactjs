import React from 'react';
import ChartJs from 'chart.js'

function Chart(props) {
    if (props.data.products.length === 0) {
        return (<p className="text-center">Morate ubaciti par pravaca kako bi mogli vidjeti graf</p>)
    } else {
        return (
            <div>
                <canvas id="myChart" height="400" width="400"></canvas>
            </div>
        )
    }
}

export default Chart;