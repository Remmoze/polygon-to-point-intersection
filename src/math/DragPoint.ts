import Point from "./Point";

export default class DragPoint extends Point {
    defaultColor: string;
    held: boolean;

    constructor(x: number, y: number, color?: string, size?: number) {
        super(x, y, color, size);

        this.defaultColor = this.color;

        this.held = false;
        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener("mousedown", (e: MouseEvent) => {
            if ((e.offsetX - this.x) ** 2 + (e.offsetY - this.y) ** 2 < this.size ** 2) {
                this.held = true;
            } else {
                this.held = false;
            }
        });
        window.addEventListener("mousemove", (e: MouseEvent) => {
            if (this.held) {
                this.x = e.offsetX;
                this.y = e.offsetY;
            }
        });
        window.addEventListener("mouseup", () => {
            this.held = false;
        });
    }

    update() {
        this.color = this.held ? "white" : this.defaultColor;
    }
}
