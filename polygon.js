export default class Polygon {
    constructor(...points) {
        /**
         * @type {Point[]}
         */
        this.points = points ?? [];
    }

    addPoint(p) {
        this.points.push(p);
    }

    draw(context, point) {
        context.save();

        context.fillStyle = this.containsPoint(point) ? "red" : "darkred";
        context.beginPath();
        this.points.forEach((point, index) => {
            context[index === 0 ? "moveTo" : "lineTo"](point.x, point.y);
        });
        context.closePath();
        context.fill();

        this.points.forEach((p) => p.draw(context));

        context.restore();
    }

    containsPoint(point) {
        let result = false;
        for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            const checkY = this.points[i].y > point.y != this.points[j].y > point.y;
            const checkX =
                point.x <
                ((this.points[j].x - this.points[i].x) * (point.y - this.points[i].y)) /
                    (this.points[j].y - this.points[i].y) +
                    this.points[i].x;

            if (checkY && checkX) result = !result;
        }
        return result;
    }
}
