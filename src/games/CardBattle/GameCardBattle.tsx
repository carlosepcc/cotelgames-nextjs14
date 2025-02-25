"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { cardTypes } from ".";

const values = Array.from({ length: 12 }, (_, i) => i + 1);

const CardBattle = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [selectedType, setType] = useState(0);

  // Function to generate the entire deck
  const generateDeck = () => {
    const newDeck: Card[] = [];

    cardTypes[0].suits.forEach((suit, suitIndex) => {
      for (let i = 1; i <= 12; i++) {
        newDeck.push({ suit: suitIndex, value: i });
      }
    });

    return newDeck;
  };
  useEffect(() => {
    setDeck(generateDeck());
  }, []);

  return (
    <div className="bg-slate-100 p-6">
      <strong>Card Deck</strong>
      <div className="flex gap-3">
        {cardTypes.map((type, i) => (
          <button
            className={`p-2 aspect-[1/1.5] min-w-10 shadow hover:shadow-xl hover:scale-110 active:scale-90 transition-all border-b-2 bg-white   outline-double rounded-sm
            ${
              selectedType == i
                ? " pointer-events-none bg-[#eee] outline-slate-300 "
                : "shadow-lg outline-slate-400"
            }
            `}
            onClick={() => setType(i)}
          >
            <div>{type.suits[0].symbol}</div>
            <div>{type.suits[1].symbol}</div>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap md:grid grid-cols-6 lg:grid-cols-12 gap-6 p-20 justify-center max-w-7xl m-auto">
        {deck.map((card) => (
          <div
            className="card flex flex-col shadow h-52 aspect-[1/2] justify-between p-2 py-1 overflow-hidden rounded hover:scale-110 transition-all cursor-pointer hover:rotate-0 hover:shadow-2xl bg-white -rotate-3 hover:z-10 outline-double active:scale-[240%]"
            key={`${card.suit}-${card.value}`}
            style={{
              fontSize: `clamp(1.4em,${5 - card.value}em,4em)`,
              color: cardTypes[selectedType].suits[card.suit].color ?? "#333",
            }}
          >
            <div className="font-bold h-fit text-sm">{card.value}</div>
            <div
              className={`card-body flex flex-wrap  items-center h-[80%] justify-center gap-1 my-1 overflow-hidden rounded  ${
                card.value < 4 && " flex-col "
              }`}
            >
              {Array.from({ length: card.value }, (_, index) => (
                <div>
                  {cardTypes[selectedType].suits[card.suit].symbol ||
                    cardTypes[selectedType].suits[card.suit].name[0]}
                </div>
              ))}
            </div>
            <div className="font-bold h-fit flex-1 text-sm self-end rotate-180">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CardBattle;
