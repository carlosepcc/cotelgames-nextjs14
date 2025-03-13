'use client'
import { playSound } from "./helpers/sfx";
import { gamePianoInfo } from ".";
import { useEffect, useState } from "react";
type NatureEntity = {
 id:number;
 fallback:string;
 img?:string;
 size:number,
 name:LocString;
};
    const entities: NatureEntity[] = [
      { id: 1, size:10, name: { es: "Vaca", en: "Cow" }, fallback: "🐂" },
      { id: 2, size:10, name: { es: "Vaca", en: "Cow" }, fallback: "🐄" },
      { id: 3, size:5, name: { es: "Vaca", en: "Cow" }, fallback: "🐕‍🦺" },
      { id: 4, size:5, name: { es: "Vaca", en: "Cow" }, fallback: "🐑" },
      { id: 5, size:5, name: { es: "Vaca", en: "Cow" }, fallback: "🦮" },
      { id: 6, size:3, name: { es: "Vaca", en: "Cow" }, fallback: "🐕" },
      { id: 7, size:4, name: { es: "Vaca", en: "Cow" }, fallback: "🐈" },
      { id: 8, size:4, name: { es: "Vaca", en: "Cow" }, fallback: "🦆" },
      { id: 9, size:1, name: { es: "Vaca", en: "Cow" }, fallback: "🐤" },
      { id: 10, size:1, name: { es: "Vaca", en: "Cow" }, fallback: "🐤" },
      { id: 11, size:1, name: { es: "Vaca", en: "Cow" }, fallback: "🐥" },
      { id: 12, size:5, name: { es: "Vaca", en: "Cow" }, fallback: "🐓" },
    ];
const oscilatorTypes: OscillatorType[] = [
  "triangle",
  "square",
  "sawtooth",
  "sine",
];
const GameNature = () => {
  const [oscillatorType, setOscillatorType] = useState<OscillatorType>('triangle'
  );
 
  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <h2 className="text-slate-500 text-4xl font-bold my-8 relative group active:brightness-150 flex uppercase justify-center gap-1">
        Nature
      </h2>
      <div
        className="grow bg-field min-h-80 h-full relative flex justify-end items-end p-2"
        style={{
          background: `linear-gradient(to top,olive 5%, green 25% 40%,#a502 41%,transparent 46%),
        radial-gradient(#ffa 8%,yellow 10%,#fb07 12%,transparent 60%),linear-gradient(skyblue,#e98)`,
        }}
      >
        {entities.map((entity, index) => (
          <div
          key={entity.id}
            className={`absolute transition-all duration-500 active:duration-100`}
            style={{
              bottom: Math.floor(Math.random() * 300 + 20),
              right: `${Math.floor(Math.random() * 85 + 1)}%`,
              transform:`scaleX(${Math.random()>0.5?'-100%':'100%'})`
            }}
          >
            <EntityElement entity={entity} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default GameNature;

const EntityElement = ({
entity = entities[0]}: {
  entity:NatureEntity
}) => (
  <div
    className="text-7xl sm:text-9xl active:scale-y-125 cursor-pointer transition-all active:-translate-y-4"
    style={{
      scale:entity.size/10+0.5
    }}
    onClick={() => playSound((10-entity.size) * 120 + 400)}
    
  >{entity.fallback}
  </div>
);
