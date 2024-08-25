import './style.css'
export default function GameSettings({players,currentPlayer}:{players:{value:Player,set:Function}[],currentPlayer:PlayerValue}) {

    return (
      <form>
        {players.map((player, playerIndex) => (
          <div
            className={`p-1.5 flex items-center gap-2 font-bold transition-all duration-500 round ${
              playerIndex == currentPlayer ? "animate-pulse" : "bg-transparent"
            }`}
          >
            {/* maxLength={1} */}
            <input
              className={`max-w-10 p-1 text-center font-black text-xl sm:text-2xl outline-slate-300 bg-slate-100 round`}
              placeholder="Emoji or symbol.."
              value={player.value.emoji}
              onChange={(e) =>
                player.set({ ...player.value, emoji: e.target.value })
              }
            />
            <input
              className={`p-2 px-3 bg-slate-100  outline-slate-300 focus:shadow-inner round`}
              value={player.value.name}
              onChange={(e) =>
                player.set({ ...player.value, name: e.target.value })
              }
            />
            <div
              className="rounded-full max-w-7 hover:scale-110 hover:rotate-45 transition-all rounded-tl-none rotate-[30deg] translate-y-0.5 hover:outline-2 shadow-md outline-slate-200 outline-offset-1 "
              style={{ backgroundColor: player.value.color }}
            >
              <input
                className={`round cursor-pointer border opacity-0`}
                type="color"
                value={player.value.color}
                onChange={(e) =>
                  player.set({ ...player.value, color: e.target.value })
                }
              />
            </div>
          </div>
        ))}
      </form>
    );
}