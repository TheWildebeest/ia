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
          this._initGraph();
        }
      }, 100
    );
  }

  private _initGraph(): void {
    // Set the dimensions and margins of the graph
    const outerHeight = this.height;
    const innerHeight = this.height - 2 * this.margin;

    const outerWidth = this.width;
    const innerWidth = this.width - 2 * this.margin;
    // const width = this.width - this.margin - this.margin;
    // const height = this.height - this.margin - this.margin;

    // Append the svg object to the body of the page
    const svg = d3.select('#' + this.id)
      .append('svg')
        .attr('width', outerWidth)
        .attr('height', outerHeight)
      .append('g')
        .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain(d3.extent(this.chartData, (d) => d.x))
      .range([ 0, innerWidth ]);
    svg.append('g')
      .attr('transform', 'translate(0,' + innerHeight + ')')
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(this.chartData, (d) => +d.y)])
      .range([ innerHeight, 0 ]);
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add the line
    svg.append('path')
      .datum(this.chartData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line<ChartXY>()
        .x((d) => x(d.x))
        .y((d) => y(d.y))
      );
  }
}
