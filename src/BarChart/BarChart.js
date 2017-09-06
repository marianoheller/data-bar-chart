import React, { Component } from 'react';
import * as d3 from 'd3';
import './BarChart.css';

import dataJson from  '../dataset.json';

const tipper = require("d3-tip");
const minDate = require('date-fns/min');
const maxDate = require('date-fns/max');


export default class BarChartContainer extends Component {

    loadData() {
        return dataJson.data.map( (d) => ({
                label: d[0],
                value: d[1],
            } ) );
    }

    loadInfo() {
        return {
            ...dataJson,
            data: undefined,
        }
    }

    render() {
        const size = {
            width: 1000,
            height: 500,
            margin: {
                top: 60,
                bottom: 20,
                right: 10,
                left: 50,
            },
        }
        return (
            <div>
                <BarChart data={ this.loadData() } size={size} info={ this.loadInfo() }/>
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

    createBarChart() {
        const { data, info } = this.props;
        const { width, height, margin } = this.props.size;

        const dates = data.map( (e) => e.label) ;
        const startDate = minDate( ...dates );
        const endDate = maxDate( ...dates );

        const tip = tipper()
        .attr('class', 'd3-tip')
        .attr("id", "tooltip")
        .html( (d) => `
            Value: ${d.value}<br>
            Date: ${d.label}
            `);


        const svg = d3.select("#chartContainer")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

        const xScale = d3.scaleTime()
                        .domain([ startDate, endDate])
                        .range([0, width - margin.left - margin.right]);

        const yMin = d3.min( data.map( (e) => e.value));
        const yMax = d3.max( data.map( (e) => e.value));
        const dataHeight = height - margin.top - margin.bottom;
        const yScale = d3.scaleLinear()
                        .domain([  yMin , yMax ])
                        .range([ (yMin/yMax) * dataHeight , dataHeight ]);

        const barWidth = ( width - margin.left - margin.right ) / data.length;

        svg.call(tip);

        svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", (width - margin.left - margin.right)/2 )
        .attr("y", margin.top/2 )
        .attr("id", "title")
        .text(info.name)

        svg.append("g")
        .attr("class", "axis x-axis")
        .attr("id", "x-axis")
        .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

        svg.append("g")
        .attr("class", "axis y-axis")
        .attr("id", "y-axis")
        .attr("transform", `translate( ${margin.left}, ${margin.top})` )
        .call(d3.axisLeft(yScale));

        svg.append("g")
        .attr("class", "dataset")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("data-date", (d) => d.label)
          .attr("data-gdp", (d) => d.value)
          .attr("x", function(d) { return xScale( new Date(d.label)  ); })
          .attr("y", function(d) { return height - margin.top - margin.bottom; })
          .attr("width", barWidth )
          .attr("height", 0)
          .on('mouseover', (d, i) => {
                tip.attr("data-date", d.label);
                tip.show(d, i)
            })
          .on('mouseout', tip.hide)
          .transition()
            .duration(800)
            .delay( (d,i) => i*2 )
            .attr("y", function(d) { return height - margin.top - margin.bottom -  yScale(d.value); })
            .attr("height", function(d) { return yScale(d.value); })
    }
    
    render() {
        return  (
            <div id="chartContainer">
            </div>
        )
    }
}