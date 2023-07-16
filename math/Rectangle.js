import Point from "./Point.js";

export default class Rectangle extends Point {
    constructor(x, y, width, height) {
        super(x, y);
        this.color = "cyan";
        this.width = width ?? 100;
        this.height = height ?? 100;

        this.lineDash = [2, 5];
    }

    recalculate(points) {
        const { minX, minY, maxX, maxY } = points.reduce(
            (state, point) => {
                state.minX = Math.min(state.minX, point.x);
                state.maxX = Math.max(state.maxX, point.x);
                state.minY = Math.min(state.minY, point.y);
                state.maxY = Math.max(state.maxY, point.y);
                return state;
            },
            {
                minX: Number.MAX_SAFE_INTEGER,
                minY: Number.MAX_SAFE_INTEGER,
                maxX: -Number.MAX_SAFE_INTEGER,
                maxY: -Number.MAX_SAFE_INTEGER,
            }
        );

        this.x = minX;
        this.y = minY;
        this.width = maxX - minX;
        this.height = maxY - minY;
    }

    draw(context) {
        context.start();

        context.strokeStyle = this.color;
        context.setLineDash(this.lineDash);
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x, this.y + this.height);
        context.lineTo(this.x, this.y);
        context.stroke();

        context.end();
    }

    containsPoint(point) {
        return (
            point.x >= this.x && point.x < this.x + this.width && point.y >= this.y && point.y < this.y + this.height
        );
    }

    update(point) {
        if (this.containsPoint(point)) {
            this.lineDash = [5, 2];
        } else {
            this.lineDash = [2, 5];
        }
    }
}
