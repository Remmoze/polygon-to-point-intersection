import "./styles/index.css";
import { useCanvas } from "./useCanvas";
import DragPoint from "./math/DragPoint";
import Polygon from "./math/Polygon";

const { canvas, context } = useCanvas();

const polygons = [
    new Polygon(
        new DragPoint(125, 75),
        new DragPoint(564, 192),
        new DragPoint(691, 34),
        new DragPoint(769, 460),
        new DragPoint(651, 209),
        new DragPoint(754, 625),
        new DragPoint(349, 211),
        new DragPoint(390, 366),
        new DragPoint(135, 491),
        new DragPoint(42, 235),
        new DragPoint(282, 342)
    ),
    new Polygon(
        new DragPoint(449, 776),
        new DragPoint(95, 666),
        new DragPoint(358, 654),
        new DragPoint(439, 471),
        new DragPoint(659, 758)
    ),
];

const mainPoint = new DragPoint(400, 400, "yellow", 5);

function draw() {
    context.fillStyle = "#222";
    context.fillRect(0, 0, canvas.width, canvas.height);

    polygons.forEach((pol) => pol.draw(context));
    mainPoint.draw(context);

    requestAnimationFrame(draw);
}
draw();

function update() {
    polygons.forEach((pol) => pol.update(mainPoint));
    mainPoint.update();
}
setInterval(update, 1000 / 60);

document.querySelector("#addPoint").addEventListener("click", () => {
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    polygons[0].addPoint(new DragPoint(randomNumber(100, 700), randomNumber(100, 700)));
});
