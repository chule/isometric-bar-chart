"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var d3_selection_1 = require("d3-selection");
var d3_array_1 = require("d3-array");
var d3_scale_1 = require("d3-scale");
var d3_color_1 = require("d3-color");
require("d3-transition");
var react_1 = tslib_1.__importStar(require("react"));
var Barchart = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [
        { name: "#1", value: 12 },
        { name: "#2", value: 20 },
        { name: "#3", value: 30 },
        { name: "#4", value: 0 },
        { name: "#5", value: 63 },
        { name: "#6", value: 35 },
        { name: "#7", value: 22 },
        { name: "#8", value: 35 },
        { name: "#9", value: 22 },
    ] : _b, _c = _a.svgWidth, svgWidth = _c === void 0 ? 800 : _c, _e = _a.svgHeight, svgHeight = _e === void 0 ? 400 : _e, _f = _a.marginTop, marginTop = _f === void 0 ? 100 : _f, _g = _a.marginRight, marginRight = _g === void 0 ? 50 : _g, _h = _a.marginBottom, marginBottom = _h === void 0 ? 50 : _h, _j = _a.marginLeft, marginLeft = _j === void 0 ? 50 : _j, _k = _a.color, color = _k === void 0 ? "#AE3E33" : _k, _l = _a.sizeCorrector, sizeCorrector = _l === void 0 ? 2 : _l, _m = _a.delayMultiplier, delayMultiplier = _m === void 0 ? 100 : _m, _o = _a.fontSize, fontSize = _o === void 0 ? 16 : _o;
    var svgRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        (0, d3_selection_1.select)(svgRef.current).selectAll("*").remove();
        var width = svgWidth - (marginLeft + marginRight);
        var height = svgHeight - (marginTop + marginBottom);
        var topPoints = [13.59, 5.745, 0, 2.873, 13.59, 0, 27.179, 2.873].map(function (d) { return d * sizeCorrector; });
        var bodyPoints = [
            27.179, 4.873, 13.59, 7.745, 0, 4.873, 0, 2.873, 13.59, 5.745, 27.179,
            2.8733,
        ].map(function (d) { return d * sizeCorrector; });
        var defaultPointsHeigth = 3 * sizeCorrector;
        var xScale = (0, d3_scale_1.scaleBand)()
            .domain(data.map(function (d) { return d.name; }))
            .range([0, width]);
        var maximum = (0, d3_array_1.max)(data.map(function (d) { return d.value; }));
        var yScale = (0, d3_scale_1.scaleLinear)().domain([0, maximum]).range([height, 0]);
        var scaledMax = yScale(maximum);
        var pointsGenerator = function (element) {
            var node = (0, d3_selection_1.create)("svg:g");
            var brighterColor = function (c) {
                return (0, d3_color_1.rgb)(c).brighter(0.6).toString();
            };
            if (element.value === 0) {
                node
                    .append("polygon")
                    .attr("class", "pointsTop")
                    .style("opacity", 0.5)
                    .attr("transform", function () {
                    return "translate(0,".concat(scaledMax + 2.5 * sizeCorrector, ")");
                })
                    .attr("points", topPoints.join(" "))
                    .style("fill", brighterColor(color));
            }
            else {
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
        var barGenerator = function (_a) {
            var expandedLine = _a.expandedLine, element = _a.element;
            var node = (0, d3_selection_1.create)("svg:g");
            if (expandedLine.length === 0) {
                node
                    .attr("class", "pointGroup")
                    .append(function () {
                    return pointsGenerator(element);
                });
            }
            else {
                node
                    .selectAll(".pointGroup")
                    .data(expandedLine)
                    .join("g")
                    .attr("class", "pointGroup")
                    .attr("transform", function (d) {
                    return "translate(".concat(0, ",").concat(d, " )");
                })
                    .append(function () {
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
                return "translate(\n            ".concat(13.5 * sizeCorrector, " \n            ,\n            ").concat(scaledMax - (height - yScale(element.value) + 5 * sizeCorrector), "\n            )");
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
                return "translate(\n          ".concat(13.5 * sizeCorrector, " \n          ,\n          ").concat(scaledMax + 40, "\n          )");
            });
            return node.node();
        };
        var svg = (0, d3_selection_1.select)(svgRef.current)
            .style("background", "#eee")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
        svg
            .append("g")
            .attr("transform", "translate(".concat(marginLeft + (1 / sizeCorrector) * 25, ",").concat(marginTop, ")"))
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", function (d) {
            return "translate(".concat(xScale(d.name), ",").concat(yScale(d.value) + (height - yScale(d.value)), ")");
        })
            .append(function (d) {
            var expandedLine = (0, d3_array_1.range)(scaledMax, scaledMax - (height - yScale(d.value)), -defaultPointsHeigth);
            return barGenerator({ expandedLine: expandedLine, element: d });
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
    return react_1.default.createElement("svg", { ref: svgRef });
};
exports.default = Barchart;
//# sourceMappingURL=Barchart.js.map