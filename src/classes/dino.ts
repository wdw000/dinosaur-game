export default class Dino {
  x: number;
  y: number;
  width: number;
  height: number;
  isJump: boolean;
  private timer: number;
  private maxHeight: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isJump = false;
    this.timer = 0;
    this.maxHeight = y;
  }

  set setIsJump(newValue: boolean) {
    this.isJump = newValue;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  jump() {
    if (this.isJump) {
      this.y -= 6;
      this.timer++;
    }

    if (this.timer > 30) {
      this.isJump = false;
      if (this.y < this.maxHeight) {
        this.y += 6;
      } else {
        this.timer = 0;
      }
    }
  }
}
