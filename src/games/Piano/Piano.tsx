'use client'
import { playSound } from "./helpers/sfx";
import { gamePianoInfo } from ".";
import { useEffect, useState } from "react";
type Frequencies = {
  [key: string]: number;
};
const { title } = gamePianoInfo;
const titleArr = title.en.split("");
const oscilatorTypes: OscillatorType[] = [
  "triangle",
  "square",
  "sawtooth",
  "sine",
];
const GamePiano = () => {
  const [keys, setKeys] = useState(Array(15).fill(null));
  const [oscillatorType, setOscillatorType] = useState<OscillatorType>(
    oscilatorTypes[0]
  );
  useEffect(() => {
    const frequencies: Frequencies = {
      a: 200, // Low frequency
      r: 300,
      s: 350,
      t: 400,
      n: 450,
      e: 500,
      i: 550,
      o: 600, // High frequency
      // Add more keys as needed
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const frequency = frequencies[event.key];
      if (frequency !== undefined) {
        playSound(frequency, oscillatorType);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [oscillatorType]);

  return (
    <>
      <h2 className="text-slate-500 text-4xl font-bold my-8 relative group active:brightness-150 flex uppercase justify-center gap-1">
        {titleArr.map((letter, index) => (
          <button
            className="hover:scale-110 hover:shadow  group-acive:scale-y-150 active:brightness-200 active:scale-y-[4] hover:bg-muted transition-all p-1 px-2.5 rounded-xl border-b-4 border-b-[#0003]"
            style={{
              color: `hsl(${(1 + index) * 70},50%,50%)`,
              background: `hsl(${(1 + index) * 70},50%,20%)`,
              textTransform: "uppercase",
            }}
            onClick={() => playSound(index * 50 + 200)}
          >
            {letter}
          </button>
        ))}
      </h2>
      <div className="flex gap-4 mb-4 px-4">
        {oscilatorTypes.map((ot) => (
          <button
            onClick={() => {
              setOscillatorType(ot);
              playSound(350, ot);
            }}
            disabled={ot == oscillatorType}
            className="uppercase grow disabled:opacity-60 font-bold text-sm shadow border-2 border-b-4 bg-gradient-to-br bg-white/20 text-white transition-all border-[#0002] p-2 rounded-xl disabled:scale-95 disabled:border-b-0"
          >
            {ot}
          </button>
        ))} 
      </div>
      <div className="grid grid-cols-3 justify-center items-center w-full gap-2">
        {keys.map((key, index) => (
          <Key hue={index * 30} value={index} type={oscillatorType} />
        ))}
      </div>
    </>
  );
};
export default GamePiano;

const Key = ({
  hue,
  value = 5,
  type = "triangle",
}: {
  hue: number;
  value?: number;
  type?: OscillatorType;
}) => (
  <button
    className="grow h-[80vh] min-w-20 max-h-32 rounded-3xl border-4 border-b-8 border-[#0002] active:translate-y-2 transition-all duration-500 active:duration-100 cursor-pointer hover:brightness-110 active:brightness-200 active:scale-95 group"
    onClick={() => playSound(value * 50 + 200, type)}
    style={{
      background: `hsl(${hue},80%,40%)`,
      flexGrow: value,
      color: `hsl(${hue},90%,60%)`,
    }}
  >
    <span className="text-7xl font-black blur-[2px] group-active:blur-none">{value}</span>
  </button>
);
