"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { classicPath, PathCell } from ".";
import BoardCell from "./BoardCell";

const values = Array.from({ length: 12 }, (_, i) => i + 1);

const GrowthPath = () => {
  const [path, setPath] = useState<PathCell[]>([...classicPath]);

  useEffect(() => {}, []);
  const handleCellClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cell: PathCell
  ) => {};
  return (
    <div className="bg-slate-100 p-6">
      <strong>Path</strong>
      <Board />
    </div>
  );
};
const Board: React.FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        padding: "20px",
      }}
    >
      {classicPath.map((cell) => (
        <BoardCell key={cell.position} cell={cell} />
      ))}
    </div>
  );
};

export default GrowthPath;
