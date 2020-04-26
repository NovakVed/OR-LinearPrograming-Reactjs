import React, { Component, useState, useEffect } from 'react';
import * as chartjs from 'chart.js';
import {Scatter} from 'react-chartjs-2'
import 'chartjs-plugin-annotation';

class Chart extends Component {
    constructor(props){
        super(props)
        this.state = {
            chartData: props.chartData
        }
    }

    render() {
        return (
            <div className="chart">
                <Scatter data={this.state.chartData}
                options = {{}}/>
            </div>
        )
    }
}

export default Chart;