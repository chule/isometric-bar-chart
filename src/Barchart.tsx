"use client";

import * as d3 from "d3";
import React from "react";

import { useRef, useEffect } from "react";

const Barchart = ({
  data = [
    { name: "#1", value: 12 },
    { name: "#2", value: 20 },
    { name: "#3", value: 30 },
    { name: "#4", value: 0 },
    { name: "#5", value: 63 },
    { name: "#6", value: 35 },
    { name: "#7", value: 22 },
    { name: "#8", value: 35 },
    { name: "#9", value: 22 },
  ],
  svgWidth = 800,
  svgHeight = 400,
  marginTop = 100,
  marginRight = 50,
  marginBottom = 50,
  marginLeft = 50,
  color = "#AE3E33",
  sizeCorrector = 2,
  delayMultiplier = 100,
  fontSize = 16,
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgWidth - (marginLeft + marginRight);
    const height = svgHeight - (marginTop + marginBottom);

    const topPoints = [13.59, 5.745, 0, 2.873, 13.59, 0, 27.179, 2.873].map(
      (d) => d * sizeCorrector
    );
    const bodyPoints = [
      27.179, 4.873, 13.59, 7.745, 0, 4.873, 0, 2.873, 13.59, 5.745, 27.179,
      2.8733,
    ].map((d) => d * sizeCorrector);

    const defaultPointsHeigth = 3 * sizeCorrector;

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width]);

    const max = d3.max(data.map((d) => d.value)) as unknown as number;

    const yScale = d3.scaleLinear().domain([0, max]).range([height, 0]);

    const scaledMax = yScale(max);

    const pointsGenerator = (element: { name: string; value: number }) => {
      const node = d3.create("svg:g");

      const brighterColor = (c: string) =>
        d3.rgb(c).brighter(0.6).toString() as string;

      if (element.value === 0) {
        node
          .append("polygon")
          .attr("class", "pointsTop")
          .style("opacity", 0.5)
          .attr("transform", function () {
            return `translate(0,${scaledMax + 2.5 * sizeCorrector})`;
          })
          .attr("points", topPoints.join(" "))
          .style("fill", brighterColor(color));
      } else {
        node
          .append("polygon")
          //.style("opacity", 0.5)
          .attr("class", "pointsTop")
          .attr("points", topPoints.join(" "))
          .style("fill", brighterColor(color));

        node
          .append("polygon")
          .attr("class", "pointsBody")
          .attr("points", bodyPoints.join(" "))
          .style("fill", color);
      }

      return node.node();
    };

    const barGenerator = ({
      expandedLine,
      element,
    }: {
      expandedLine: number[];
      element: { name: string; value: number };
    }) => {
      const node = d3.create("svg:g");

      if (expandedLine.length === 0) {
        node
          .attr("class", "pointGroup")

          .append(() => {
            return pointsGenerator(element);
          });
      } else {
        node
          .selectAll(".pointGroup")
          .data(expandedLine)
          .join("g")
          .attr("class", "pointGroup")
          .attr("transform", function (d) {
            return `translate(${0},${d} )`;
          })
          .append(() => {
            return pointsGenerator(element);
          })
          .style("opacity", 0)
          .transition()
          .duration(100)
          .delay(function (_d, i) {
            return i * delayMultiplier;
          })
          .style("opacity", 1);
      }

      // top label
      node
        .append("g")
        .append("text")
        .text(element.value)
        .attr("text-anchor", "middle")
        .style("font-size", fontSize)
        .style("fill", color)
        .attr("transform", function () {
          return `translate(
            ${13.5 * sizeCorrector} 
            ,
            ${scaledMax - (height - yScale(element.value) + 5 * sizeCorrector)}
            )`;
        })
        .style("opacity", 0)
        .transition()
        .duration(100)
        .delay(expandedLine.length * delayMultiplier)
        .style("opacity", 1);

      // bottom label
      node
        .append("g")
        .append("text")
        .text(element.name)
        .attr("text-anchor", "middle")
        .style("font-size", fontSize)
        .style("fill", color)
        .attr("transform", function () {
          return `translate(
          ${13.5 * sizeCorrector} 
          ,
          ${scaledMax + 40}
          )`;
        });

      return node.node();
    };

    const svg = d3
      .select(svgRef.current)
      .style("background", "#eee")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    svg
      .append("g")
      .attr(
        "transform",
        `translate(${marginLeft + (1 / sizeCorrector) * 25},${marginTop})`
      )
      .selectAll("g")
      .data(data)
      .join("g")
      .attr(
        "transform",
        (d) =>
          `translate(${xScale(d.name)},${
            yScale(d.value) + (height - yScale(d.value))
          })`
      )
      .append((d) => {
        const expandedLine = d3.range(
          scaledMax,
          scaledMax - (height - yScale(d.value)),
          -defaultPointsHeigth
        );

        return barGenerator({ expandedLine, element: d });
      });
  }, [
    data,
    svgWidth,
    svgHeight,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    color,
    sizeCorrector,
    delayMultiplier,
    fontSize,
  ]);

  return <svg ref={svgRef}></svg>;
};

export default Barchart;
