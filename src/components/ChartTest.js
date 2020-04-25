import React, { Component, useState, useEffect } from 'react';
import {Scatter} from 'react-chartjs-2'

class ChartTest extends Component {
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
                options={{}}/>
            </div>
        )
    }
}

export default ChartTest;