import React from "react";
import styles from "./Area.module.css";
import { Rect } from "../Rect";
export const Area = ({ rects, size, onMove }) => {
  return (
    <ul className={styles.area} style={{ width: size, height: size }}>
      {rects.map(({ x, y, w, h }, i) => (
        <Rect key={i} x={x} y={y} w={w} h={h} onMove={(x, y)=> onMove(i, x, y)} />
      ))}
    </ul>
  );
};
