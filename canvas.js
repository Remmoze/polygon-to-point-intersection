function getCanvas() {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    return { canvas, context };
}

export { getCanvas };
