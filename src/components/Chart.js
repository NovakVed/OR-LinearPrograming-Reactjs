import React, { Component, useState, useEffect } from 'react';
import * as chartjs from 'chart.js';
import {Line, Scatter} from 'react-chartjs-2'
import * as ChartAnnotation from 'chartjs-plugin-annotation';

class Chart extends Component {
    constructor(props){
        super(props)
        this.state = {
            chartData: props.chartData,
            chartOpts: props.chartOpts
        }
    }

    render() {
        return (
            <div className="chart">
                <Scatter data={this.state.chartData}
                options={this.state.chartOpts} 
                plugins={[ChartAnnotation]}
                />
            </div>
        )
    }
}

export default Chart;