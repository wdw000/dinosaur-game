import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Cactus from "./classes/cactus";
import Dino from "./classes/dino";

function App() {
  const mainCanvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const dino = new Dino(50, 200, 50, 50);
  let timer = 0;
  const cactuses: Cactus[] = [];

  useEffect(() => {
    if (!mainCanvas.current) return;

    const main = mainCanvas.current;
    main.width = window.innerWidth - 100;
    main.height = window.innerHeight - 100;

    setCtx(main.getContext("2d"));
  }, []);

  useEffect(() => {
    const spaceHandler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        dino.isJump = true;
      }
    };

    document.addEventListener("keydown", spaceHandler);

    return () => {
      document.removeEventListener("keydown", spaceHandler);
    };
  });

  function frameExcute() {
    const animation = requestAnimationFrame(frameExcute);
    timer++;

    if (ctx && mainCanvas.current) {
      ctx.clearRect(0, 0, mainCanvas.current.width, mainCanvas.current.height);

      if (timer % 120 === 0) {
        timer = 0;
        const cactus = new Cactus(450, 200, 50, 50);
        cactuses.push(cactus);
      }

      cactuses.forEach((element, index, array) => {
        if (element.x < 0) {
          array.shift();
        }

        element.x -= 3;
        if (!mainCanvas.current) return;
        element.crash(dino, ctx, mainCanvas.current, animation);
        element.draw(ctx);
      });

      dino.jump();
      dino.draw(ctx);
    }
  }

  if (ctx && mainCanvas.current) {
    frameExcute();
  }

  return (
    <div>
      <canvas ref={mainCanvas}></canvas>
    </div>
  );
}

export default App;
