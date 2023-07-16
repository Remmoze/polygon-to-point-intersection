function useCanvas(): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
        throw new Error("No canvas found");
    }
    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error("No 2d context found");
    }

    return { canvas, context };
}

export { useCanvas };
