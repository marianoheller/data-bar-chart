import React, { Component } from 'react';
import Chart from 'chart.js';
import './BarChart.css';

import dataJson from  '../dataset.json';


export default class BarChartContainer extends Component {

    loadData() {
        return dataJson.data.map( (d) => ({
                label: d[0],
                value: d[1],
            } ) );
    }

    render() {
        return (
            <div>
                <BarChart data={this.loadData()} size={ {width: "400", height: "100"} } />
            </div>
        )
    }
}



class BarChart extends Component {


    constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidMount() {
            this.createBarChart()
    }

    componentDidUpdate() {
            this.createBarChart()
    }

    randomColor() {
        const r = Math.floor(Math.random()*256);
        const g = Math.floor(Math.random()*256);
        const b = Math.floor(Math.random()*256);
        return {
            r,
            g,
            b
        }
    }

    createBarChart() {
        const node = this.node;
        const { data } = this.props;
        return new Chart(node, {
            type: 'bar',
            data: {
                labels: data.map( (obj) => obj.label ),
                datasets: [
                {
                    label: "US Gross Domestic Product",
                    data: data.map( (obj) => obj.value ),
                    backgroundColor: data.map( () => {
                        const c = this.randomColor();
                        return `rgba(${c.r}, ${c.g}, ${c.b}, 0.2)`
                    } ),
                    borderColor: data.map( () => {
                        const c = this.randomColor();
                        return `rgba(${c.r}, ${c.g}, ${c.b}, 0.6)`
                    } ),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'US Gross Domestic Product'
                }
            }
        });           
    }
    
    render() {
        const { width, height } = this.props.size;

        return  (
            <div>
                <canvas 
                ref={node => this.node = node}
                id="myChart" 
                width={width} 
                height={height}
                ></canvas>
                <div className="legend">
                    Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National Income and Product Accounts of the United States (NIPA) - (http://www.bea.gov/national/pdf/nipaguid.pdf)
                </div>
            </div>
        
        )
    }
}