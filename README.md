# isometric-bar-chart

[![npm](https://img.shields.io/npm/v/isometric-bar-chart)](https://www.npmjs.com/package/isometric-bar-chart)
![npm bundle size](https://img.shields.io/bundlephobia/min/isometric-bar-chart)
![npm](https://img.shields.io/npm/l/isometric-bar-chart)

## Features

React barchart for displaying ordinal data using animated isometric bars

## Installation

Install package from NPM

```bash
npm install isometric-bar-chart
```

## Usage

```js
import Barchart from "isometric-bar-chart";

const MyComponent = () => {
  const myData = [
    { name: "first", value: 12 },
    { name: "second", value: 20 },
    { name: "third", value: 30 },
    { name: "something", value: 0 },
    ...etc,
  ];

  return (
    <Barchart
      data={myData}
      svgWidth={800}
      svgHeight={400}
      marginTop={100}
      marginRight={50}
      marginBottom={50}
      marginLeft={50}
      color={"#AE3E33"}
      sizeCorrector={2}
      delayMultiplier={100}
      fontSize={16}
    />
  );
};

export default MyComponent;
```

### Props

| Property        | PropType                              | Required | Default Value |
| --------------- | ------------------------------------- | -------- | ------------- |
| [data](#data)   | custom(validates usage of scale keys) | false    | [data](#data) |
| svgWidth        | number                                | false    | 800           |
| svgHeight       | number                                | false    | 400           |
| marginTop       | number                                | false    | 100           |
| marginRight     | number                                | false    | 50            |
| marginBottom    | number                                | false    | 50            |
| marginLeft      | number                                | false    | 50            |
| color           | string                                | false    | "#AE3E33"     |
| sizeCorrector   | number                                | false    | 2             |
| delayMultiplier | number                                | false    | 100           |
| fontSize        | number                                | false    | 16            |

#### data

An array of data points with a value for the x axis and y axis respectively. The key for the x axis should be "name" and for the y axis should be "value"

```json
[
  { "name": "#1", "value": 12 },
  { "name": "#2", "value": 20 },
  { "name": "#3", "value": 30 },
  { "name": "#4", "value": 0 },
  { "name": "#5", "value": 63 },
  { "name": "#6", "value": 35 },
  { "name": "#7", "value": 22 },
  { "name": "#8", "value": 35 },
  { "name": "#9", "value": 22 }
]
```

#### Default Props

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
