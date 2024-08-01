import React, { useEffect } from 'react';
import * as d3 from 'd3';

const StockChart = () => {
    const api_key = "hiden";
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${api_key}`,
        'Content-Type': 'application/json'
    };
    const GetCandles = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles';

    function getData(url, request) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(request)
        })
            .then(response => response.json())
            .then(data => drawChart(data))
            .catch(error => console.error('Error:', error));
    }

    function drawChart(data) {
        const boxWidth = 3;
        const boxPadding = 4;
        const climbColor = 'green';
        const fallColor = 'red';
        const svg = d3.select('#boxplot');
        const margin = { top: 20, right: 0, bottom: 20, left: 33 };
        const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        data = data.candles;

        data.forEach(d => {
            d.high = parseFloat(d.high.units);
            d.close = parseFloat(d.close.units);
            d.low = parseFloat(d.low.units);
            d.open = parseFloat(d.open.units);
            d.dateObj = new Date(Date.parse(d.time));
        });

        console.log(data);

        let svgWidth = (boxWidth + boxPadding) * (data.length + 1) + boxPadding + margin.left + margin.right;
        let svgHeight = 300 + margin.top + margin.bottom;

        svg.style('width', svgWidth).style('height', svgHeight);

        let width = svgWidth - margin.left - margin.right;
        let height = svgHeight - margin.top - margin.bottom;

        let yMin = d3.min(data, d => Math.min(d.low, d.open, d.close));
        let yMax = d3.max(data, d => Math.max(d.high, d.open, d.close));

        let xMin = d3.min(data, d => d.dateObj);
        let xMax = d3.max(data, d => d.dateObj);

        let xScale = d3.scaleTime().domain([xMin, xMax]).range([0, width]);
        let yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

        let xAxis = d3.axisBottom(xScale).ticks(d3.timeMinute.every(10)); // Отображение каждого часа
        let yAxis = d3.axisRight(yScale).tickSize(width)
            .tickFormat(d => d3.format('.2f')(d));

        g.append('g').attr('id', 'xAxisG')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(g => {
                g.call(xAxis);
                g.select('.domain').remove();
            });

        g.append('g').attr('id', 'yAxisG')
            .call(g => {
                g.call(yAxis);
                g.select('.domain').remove();
                g.selectAll('.tick line').attr('stroke', '').attr('stroke-dasharray', '2,2');
                g.selectAll('.tick text').attr('x', -1 * margin.left);
            });

        g.select('#yAxisG').append('line')
            .attr('x1', -1).attr('y1', -1).attr('x2', -1).attr('y2', height)
            .style('stroke', '#000')
            .style('stroke-width', 1);

        g.select('#xAxisG').append('line')
            .attr('x1', 0).attr('y1', 0).attr('x2', width).attr('y2', 0)
            .style('stroke', '#000')
            .style('stroke-width', 1);

        const b = g.append('g').attr('id', 'chart');
        const gNew = b.selectAll('.bar').data(data).enter().append('g').attr('class', 'bar');

        gNew.append('line')
            .attr('x1', d => xScale(d.dateObj) + boxWidth / 2)
            .attr('x2', d => xScale(d.dateObj) + boxWidth / 2)
            .attr('y1', d => yScale(d.high))
            .attr('y2', d => yScale(d.low))
            .style('stroke', d => d.close > d.open ? climbColor : fallColor)
            .style('stroke-width', 1);

        gNew.append('rect')
            .attr('x', d => xScale(d.dateObj))
            .attr('y', d => yScale(Math.max(d.open, d.close)))
            .attr('fill', d => d.close > d.open ? climbColor : fallColor)
            .attr('width', boxWidth)
            .attr('height', d => Math.abs(yScale(d.close) - yScale(d.open)));
    }
    const currentDate = new Date();
    const fromDate = new Date(currentDate);
    fromDate.setDate(currentDate.getDate() - 1);

    const fromISOString = fromDate.toISOString();
    const toISOString = currentDate.toISOString();

    useEffect(() => {
        getData(GetCandles, {
            figi: "TCS00A107T19",
            from: fromISOString, // Начальная дата
            to: toISOString, // Конечная дата
            interval: '1',
            instrumentId: '2',
            candleSourceType: 'real',
            limit: 100
        });
    }, []);

    return (
        <div>
            <svg id="boxplot"></svg>
        </div>
    );
};

export default StockChart;
