import Rectangle from "./Rectangle.js";

export default class Polygon {
    constructor(...points) {
        /**
         * @type {Point[]}
         */
        this.points = points ?? [];

        this.inactivecolor = "darkred";
        this.activeColor = "red";
        this.color = this.inactivecolor;

        this.rect = new Rectangle(0, 0, 0, 0);
        this.rect.recalculate(this.points);
    }

    addPoint(p) {
        this.points.push(p);
        this.update();
    }

    update(point) {
        this.rect.recalculate(this.points);
        if (point) {
            this.color = this.containsPoint(point) ? this.activeColor : this.inactivecolor;
            this.rect.update(point);
        }
    }

    draw(context, point) {
        this.rect.draw(context);

        context.start();

        context.fillStyle = this.color;
        this.points.forEach((point, index) => {
            context[index === 0 ? "moveTo" : "lineTo"](point.x, point.y);
        });
        context.fill();

        this.points.forEach((p) => p.draw(context));

        context.end();
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
