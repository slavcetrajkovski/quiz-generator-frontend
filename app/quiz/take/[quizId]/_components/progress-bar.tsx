export default function ProgressBar({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  const progressPercent = ((current + 1) / total) * 100;

  return (
    <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-pink-400 transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}
