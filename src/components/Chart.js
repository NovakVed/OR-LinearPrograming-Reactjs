import React, { Component, useState, useEffect } from 'react';
import JXGBoard from 'jsxgraph-react-js'

class Chart extends Component {
    constructor(props){
        super(props)
        this.state = {
            jxgboard: props.jxgboard,
            boundingbox: props.boundingbox,
            key: props.key,
            logicJS:{}
        }

        this.state.logicJS = (b) => {
            let counter = 1
            this.state.jxgboard.forEach(element => {
                b.create('point',element, {name:''+ counter +'',face:'o', size:2})
                if (counter == 2) {
                    b.create('line',['1','2'], {strokeColor: this.random_bg_color(),strokeWidth:2})
                    counter = 1
                } else {
                    counter++
                }
            });
          }
    }

    /* Random number generator */
    random_bg_color() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        return "rgb(" + x + "," + y + "," + z + ")";
    }

    render() {
        return (
            <div>
                <div className="chart">
                <JXGBoard
                    key={this.state.key}
                    logic={this.state.logicJS}
                    boardAttributes={{
                        axis: true,
                        boundingbox: this.state.boundingbox,
                        showCopyright: false,
                        grid: true,
                        snapToGrid: true,
                        withLabel: true,
                    }}

                    style={{
                        width: '100%',
                        height: '600px'
                    }}
                    />
                </div>
            </div>
        )
    }
}

export default Chart;