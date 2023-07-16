import Rectangle from "./Rectangle";
import Point from "./Point";

export default class Polygon {
    private readonly points: Point[];
    private readonly inactiveColor: string;
    private readonly activeColor: string;
    private color: string

    private rect: Rectangle;

    constructor(...points: Point[]) {
        this.points = points ?? [];

        this.inactiveColor = "darkred";
        this.activeColor = "red";
        this.color = this.inactiveColor;

        this.rect = new Rectangle(0, 0, 0, 0);
        this.rect.recalculate(this.points);
    }

    addPoint(point: Point) {
        this.points.push(point);
        this.update();
    }

    update(point?: Point) {
        this.rect.recalculate(this.points);
        if (point) {
            this.rect.update(point);
            if (this.rect.containsPoint(point)) {
                this.color = this.containsPoint(point) ? this.activeColor : this.inactiveColor;
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        this.rect.draw(context);

        context.save();
        context.beginPath();

        context.fillStyle = this.color;
        this.points.forEach((point, index) => {
            context[index === 0 ? "moveTo" : "lineTo"](point.x, point.y);
        });
        context.fill();

        this.points.forEach((p) => p.draw(context));

        context.closePath();
        context.restore();
    }

    containsPoint(point: Point) {
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
