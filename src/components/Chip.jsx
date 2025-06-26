export function Chip({ tag }) {
  return (
    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
      {tag}
    </span>
  );
}

export function StatusChip({
  label,
  colorClass = "",
  borderClass = "",
  onClick,
}) {
  return (
    <span
      onClick={onClick}
      className={`text-xs px-2 py-0.5 rounded-full text-gray-400 border font-semibold select-none transition-transform 
        ${colorClass} ${borderClass} ${onClick ? "hover:scale-110 cursor-pointer" : ""}`}
    >
      {label}
    </span>
  );
}
