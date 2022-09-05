import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ChartData, ChartXY } from 'src/models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild('graphContainer') graphContainer: ElementRef;

  @Input() chartData: ChartData = [{ x: 0, y: 0}];
  @Input() id: string;
  @Input() width = 750;
  @Input() height = 400;
  @Input() margin = 50;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(
      () => {
        if (this.graphContainer) {
          this.setUpGraph();
        }
      }, 100
    );
  }

  private setUpGraph(): any {
    // Create SVG and padding for the chart

    const svg = d3
      .select('#' + this.id)
      .append('svg')
        .attr('height', 300)
        .attr('width', 600);

    const margin = { top: 0, bottom: 20, left: 30, right: 20 };
    const chart = svg.append('g').attr('transform', `translate(${margin.left},0)`).attr('id', 'chart');
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const grp = chart
      .append('g')
        .attr('transform', `translate(-${margin.left},-${margin.top})`)
        .attr('width', 700)
        .attr('height', 450)
        .attr('id', 'grp');

    // Create scales

    // -- X scale
    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain(d3.extent(this.chartData, dataPoint => dataPoint.x));

    // -- Y scale
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(this.chartData, dataPoint => dataPoint.y)]);

    // const line = d3
    //   .line<ChartXY>()
    //     .x(dataPoint => xScale(dataPoint.x))
    //     .y(dataPoint => yScale(dataPoint.x));

    // Add path
    // grp
    //   .append('path')
    //     .attr('transform', `translate(${margin.left},0)`)
    //     .datum(this.chartData)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'steelblue')
    //     .attr('stroke-linejoin', 'round')
    //     .attr('stroke-linecap', 'round')
    //     .attr('stroke-width', 3)
    //     .attr('d', line);

    // Add the X Axis
    chart
    .append('g')
      .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(this.chartData.length));

    // Add the Y Axis
    chart
      .append('g')
        .attr('transform', `translate(0, 0)`)
      .call(d3.axisLeft(yScale));
    }
}
