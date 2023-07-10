import React from "react";
declare const Barchart: ({ data, svgWidth, svgHeight, marginTop, marginRight, marginBottom, marginLeft, color, sizeCorrector, delayMultiplier, fontSize, }: {
    data?: {
        name: string;
        value: number;
    }[] | undefined;
    svgWidth?: number | undefined;
    svgHeight?: number | undefined;
    marginTop?: number | undefined;
    marginRight?: number | undefined;
    marginBottom?: number | undefined;
    marginLeft?: number | undefined;
    color?: string | undefined;
    sizeCorrector?: number | undefined;
    delayMultiplier?: number | undefined;
    fontSize?: number | undefined;
}) => React.JSX.Element;
export default Barchart;
