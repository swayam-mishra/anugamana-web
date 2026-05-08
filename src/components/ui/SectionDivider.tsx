export function SectionDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
      <div className="w-2 h-2 rounded-full bg-orange-400" />
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
    </div>
  );
}
