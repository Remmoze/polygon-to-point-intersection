export default class Point {
    x: number;
    y: number;
    color: string;
    size: number;

    constructor(x: number, y: number, color?: string, size?: number) {
        this.x = x;
        this.y = y;
        this.color = color ?? "green";
        this.size = size ?? 4;
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.beginPath();

        context.fillStyle = this.color;
        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();

        context.closePath();
        context.restore();
    }

    update() {}
}
