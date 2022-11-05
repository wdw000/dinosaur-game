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

  function frameExcute() {
    requestAnimationFrame(frameExcute);
    timer++;

    if (ctx && mainCanvas.current) {
      ctx.clearRect(0, 0, mainCanvas.current.width, mainCanvas.current.height);

      if (timer % 60 === 0) {
        const cactus = new Cactus(450, 200, 50, 50);
        cactuses.push(cactus);
      }

      cactuses.forEach((element, index, array) => {
        if (element.x < -50) {
          array.shift();
        }

        element.x -= 3;
        element.draw(ctx);
      });

      dino.draw(ctx);
    }
  }

  if (ctx && mainCanvas.current) {
    frameExcute();
  }

  return <canvas ref={mainCanvas}></canvas>;
}

export default App;
