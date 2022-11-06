import Dino from "./dino";

export default class Cactus {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  crash(
    target: Dino,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    animation: number
  ) {
    const xDiff = this.x - (target.x + target.width);
    const yDiff = this.y - (target.y + target.height);

    if (xDiff < 0 && yDiff < 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animation);
    }
  }
}
