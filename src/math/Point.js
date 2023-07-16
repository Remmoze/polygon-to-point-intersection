export default class Point {
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.color = color ?? "green";
        this.size = size ?? 4;
    }

    draw(context) {
        context.start();

        context.fillStyle = this.color;
        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();

        context.end();
    }

    update() {}
}
