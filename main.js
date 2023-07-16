import { getCanvas } from "./canvas.js";
import DragPoint from "./math/DragPoint.js";
import Polygon from "./math/Polygon.js";
import Rectangle from "./math/Rectangle.js";

const { canvas, context } = getCanvas();

const pol = new Polygon(
    new DragPoint(81, 111),
    new DragPoint(330, 50),
    new DragPoint(526, 146),
    new DragPoint(285, 432),
    new DragPoint(261, 184)
);

const mainPoint = new DragPoint(400, 400, "yellow", 5);

function draw() {
    context.fillStyle = "#222";
    context.fillRect(0, 0, canvas.width, canvas.height);

    pol.draw(context);
    mainPoint.draw(context);

    requestAnimationFrame(draw);
}
draw();

function update() {
    pol.update(mainPoint);
    mainPoint.update();
}
setInterval(update, 1000 / 60);

document.querySelector("#addPoint").addEventListener("click", () => {
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    pol.addPoint(new DragPoint(randomNumber(100, 700), randomNumber(100, 700)));
});
