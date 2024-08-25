import './style.css'
interface Props {
    value:CellValue;
    symbol: string;
    color: string | null;
    mark?: boolean;
    enabled: boolean;
    onClick: () => void;

}
export default function Cell ({value,symbol,color,mark = false,enabled,onClick}:Props){
    return value != null ? (
      <button
      disabled
        className={`font-mono p-1 pb-0 cursor-pointer size-8 md:size-12 lg:size-16 xl:size-20 flex items-center justify-center aspect-square transition-all duration-300 text-white/95 font-black sm:text-2xl lg:text-4xl xl:text-6xl hover:scale-95 shadow-inner active:scale-150 active:transition-none bg-[#ff4141d4]  round ${
          mark && "ring-2 sm:ring-4 ring-slate-700 border-2"
        } pointer-events-none border-b-2
          ${enabled && "border-2 lg:border-4"}
           border-b-4 border-[#0002]`}
        style={{
          backgroundColor: color ?? "",
        }}
      >
        {symbol}
      </button>
    ) : (
      <button
        disabled={!enabled}
        className={`font-mono p-1 bg-slate-200 cursor-pointer size-8 md:size-12 lg:size-16 xl:size-20 flex items-center justify-center aspect-square transition-all duration-300 text-white/75 font-black sm:text-2xl lg:text-4xl xl:text-6xl hover:scale-95 shadow-inner active:scale-150 active:transition-none bg-[#00020301] round hover:bg-slate-300 
          `}
        onClick={onClick}
      >
      </button>
    );
}