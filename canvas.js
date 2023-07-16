function getCanvas() {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.clear = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return { canvas, context };
}
