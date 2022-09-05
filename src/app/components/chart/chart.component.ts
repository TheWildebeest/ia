import { AfterViewInit, Component, ElementRef, Host, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  @Input() margin = 50;

  public chartReady = false;
  public svg: any;

  constructor(
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer2.listen(
      'window',
      'resize',
      () => this._initGraph());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this._initGraph(), 100);
  }

  private _initGraph(): void {

    // Ensure the view is available for access. If not, try again later
    if (!this.graphContainer) {
      setTimeout(() => this._initGraph(), 500);
      return;
    }

    // If the svg is already in the DOM, destroy it
    this.svg = d3.select('#' + this.id + '> svg').remove();

    // Set the dimensions and margins of the graph
    const outerHeight = this.graphContainer.nativeElement.offsetWidth * 0.618;
    const innerHeight = outerHeight - 2 * this.margin;

    const outerWidth = this.graphContainer.nativeElement.offsetWidth;
    const innerWidth = outerWidth - 2 * this.margin;

    // Append the svg object to the body of the page
    this.svg = d3.select('#' + this.id)
      .append('svg')
        .attr('width', outerWidth)
        .attr('height', outerHeight)
      .append('g')
        .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

    // Add X axis
    const x = d3.scaleTime()
      .domain(d3.extent(this.chartData, (d) => d.x))
      .range([ 0, innerWidth ]);
    this.svg.append('g')
      .attr('transform', 'translate(0,' + innerHeight + ')')
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(this.chartData, (d) => +d.y)])
      .range([ innerHeight, 0 ]);
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Add the line
    this.svg.append('path')
      .datum(this.chartData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 3)
      .attr('d', d3.line<ChartXY>()
        .x((d) => x(d.x))
        .y((d) => y(d.y))
      );

    // Set ready flag
    this.chartReady = true;
  }
}
