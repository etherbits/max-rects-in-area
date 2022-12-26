import { useState } from "react";
import styles from "./App.module.css";
import { Area } from "./components/Area";
import { randomInt } from "./helpers/random";

const areaSize = 1000;
const checkLimit = 1000000;
const rectWRange = [50, 250];
const rectHRange = rectWRange;

const didCollide = (rects, rect) => {
  let hasCollided = false;

  rects.forEach((altRect) => {
    if (
      rect.x < altRect.x + altRect.w &&
      rect.x + rect.w > altRect.x &&
      rect.y < altRect.y + altRect.h &&
      rect.y + rect.h > altRect.y
    ) {
      hasCollided = true;
    }
  });

  return hasCollided;
};

const clamp = (min, max, num) => {
  return Math.min(Math.max(num, min), max);
};

const messages = {
  default: "Click spawn to create the next rectangle",
  spawning: "Rectangle creation in progress...",
  error: "No space is left for an additional rectangle",
};

function App() {
  const [rects, setRects] = useState([]);
  const [message, setMessage] = useState(messages.default);

  const handleSpawn = () => {
    setMessage(messages.spawning);
    for (let i = 0; i < checkLimit; i++) {
      const rect = {
        x: 0,
        y: 0,
        w: randomInt(...rectWRange),
        h: randomInt(...rectHRange),
      };

      rect.x = randomInt(areaSize - rect.w);
      rect.y = randomInt(areaSize - rect.h);

      if (didCollide(rects, rect)) {
        continue;
      }

      setMessage(messages.default);

      return setRects([...rects, rect]);
    }
    setMessage(messages.error);
  };

  const handleMove = (i, x, y) => {
    const tempRects = [...rects];
    const currentRect = tempRects[i];

    const oldX = currentRect.x;
    const oldY = currentRect.y;

    currentRect.x = x;
    currentRect.y = y;

    tempRects.forEach((altRect) => {
      if (altRect !== currentRect) {
        if (
          currentRect.x < altRect.x + altRect.w &&
          currentRect.x + currentRect.w > altRect.x &&
          currentRect.y < altRect.y + altRect.h &&
          currentRect.y + currentRect.h > altRect.y
        ) {
          if (
            oldY < altRect.y + altRect.h &&
            oldY + currentRect.h > altRect.y
          ) {
            if (currentRect.x > oldX) {
              currentRect.x = altRect.x - currentRect.w;
            } else if (currentRect.x < oldX) {
              currentRect.x = altRect.x + altRect.w;
            }
          }

          if (
            oldX < altRect.x + altRect.w &&
            oldX + currentRect.w > altRect.x
          ) {
            if (currentRect.y > oldY) {
              currentRect.y = altRect.y - currentRect.h;
            } else if (currentRect.y < oldY) {
              currentRect.y = altRect.y + altRect.h;
            }
          }
        }
      }
      currentRect.x = clamp(0, areaSize - currentRect.w, currentRect.x);
      currentRect.y = clamp(0, areaSize - currentRect.h, currentRect.y);
    });

    setRects([...tempRects]);
  };

  const handleClear = () => {
    setMessage(messages.default);
    setRects([]);
  };

  return (
    <div className={styles.app}>
      <div>
        <span className={styles.state}>{message}</span>
        <Area rects={rects} size={areaSize} onMove={handleMove} />
        <div className={styles.actionBar}>
          <button onClick={handleSpawn}>spawn</button>
          <button onClick={handleClear}>clear</button>
        </div>
      </div>
    </div>
  );
}

export default App;
