import { FaHouse, FaPlus } from "react-icons/fa6";

export type EmptyAreaProps = {
  onClick?: () => void;
};

export function EmptyArea(props: EmptyAreaProps) {
  const { onClick } = props;

  return (
    <div
      className="w-full h-full min-h-64 bg-gray-200 rounded border-2 border-dashed border-black/30 cursor-pointer flex justify-center items-center hover:scale-105 active:scale-100 transition-all p-6"
      onClick={() => onClick?.()}
    >
      <div className="space-y-2 select-none">
        <div className="relative">
          <FaHouse className="w-20 h-20 mx-auto text-black/30 animate-pulse" />
          <FaPlus className="w-10 h-10 absolute -top-2 right-8 text-black/30 animate-pulse" />
        </div>
        <p className="text-center text-sm text-black/50 max-w-[200px]">
          Post Your Listing - Reach buyers and renters in just a few clicks!
        </p>
      </div>
    </div>
  );
}
