export default class Point {
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
