import React, { useState } from "react";
import styles from "./Rect.module.css";

const speed = 10; // Don't make this too big pls :3

export const Rect = ({ x, y, w, h, onMove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: null, y: null });

  const handleKey = (e) => {
    if (e.key === "d") {
      x += speed;
    }
    if (e.key === "a") {
      x -= speed;
    }
    if (e.key === "w") {
      y -= speed;
    }
    if (e.key === "s") {
      y += speed;
    }
    onMove(x, y);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartPos({ x: e.pageX, y: e.pageY });
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    x += e.pageX - dragStartPos.x;
    y += e.pageY - dragStartPos.y;

    setDragStartPos({ x: e.pageX, y: e.pageY });
    onMove(x, y);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStartPos({ x: null, y: null });
  };

  return (
    <button
      className={styles.rect}
      onKeyDown={handleKey}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onDragStart={(e) => {
        e.preventDefault();
      }}
      style={{ left: x, top: y, width: w, height: h }}
    />
  );
};
