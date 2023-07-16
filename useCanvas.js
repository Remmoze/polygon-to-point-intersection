function useCanvas() {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    context.start = () => {
        context.save();
        context.beginPath();
    };

    context.end = () => {
        context.closePath();
        context.restore();
    };

    return { canvas, context };
}

export { useCanvas };
