const { canvas, context } = getCanvas();

const pol = new Polygon(
    new Point(81, 111),
    new Point(330, 50),
    new Point(526, 146),
    new Point(285, 432),
    new Point(261, 184)
);

const mainPoint = new Point(400, 400, "yellow", 5);

function draw() {
    context.fillStyle = "#222";
    context.fillRect(0, 0, canvas.width, canvas.height);

    pol.draw(context, mainPoint);
    mainPoint.draw(context);

    requestAnimationFrame(draw);
}
draw();

document.querySelector("#addPoint").addEventListener("click", () => {
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    pol.addPoint(new Point(randomNumber(100, 700), randomNumber(100, 700)));
});
