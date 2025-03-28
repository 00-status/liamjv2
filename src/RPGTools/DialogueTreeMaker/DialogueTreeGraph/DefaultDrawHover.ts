import { PlainObject } from "sigma/types";

export const defaultCircleDrawHover = function (context: CanvasRenderingContext2D, data: PlainObject, settings: PlainObject) {
    const { x, y, size: nodeSize } = data;

    const hoverSize = nodeSize * 1.1;

    context.beginPath();
    context.arc(x, y, hoverSize, 0, Math.PI * 2);
    context.fillStyle = "#d6a840";
    context.fill();
};
