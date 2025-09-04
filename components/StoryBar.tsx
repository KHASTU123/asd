export default function StoryBar() {
  return (
    <div className="flex gap-3 overflow-x-auto">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-1">
          <div className="w-full h-full rounded-full bg-white dark:bg-neutral-800" />
        </div>
      ))}
    </div>
  );
}
