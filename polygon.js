class Point {
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;

        this.color = color ?? "green";

        this.size = size ?? 4;

        this.held = false;
        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener("mousedown", (e) => {
            if ((e.offsetX - this.x) ** 2 + (e.offsetY - this.y) ** 2 < this.size ** 2) {
                this.held = true;
            } else {
                this.held = false;
            }
        });
        window.addEventListener("mousemove", (e) => {
            if (this.held) {
                this.x = e.offsetX;
                this.y = e.offsetY;
            }
        });
        window.addEventListener("mouseup", () => {
            this.held = false;
        });
    }

    draw(context) {
        context.save();

        context.fillStyle = this.held ? "white" : this.color;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.restore();
    }
}

class Polygon {
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
