export default function NavIcon({
  icon,
  count,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  count?: number;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      onClick={() => onClick?.()}
      title={label}
      className="relative flex h-11 w-11 items-center justify-center rounded-xl text-gray-600 transition-all hover:bg-green-50 hover:text-green-600 active:scale-90"
    >
      {icon}
      {typeof count === "number" && (
        <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </button>
  );
}
