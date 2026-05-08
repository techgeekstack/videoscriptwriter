export default function LoadingState() {
  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-5 h-5 rounded-full border-2 border-brand-500/30" />
            <div className="absolute inset-0 w-5 h-5 rounded-full border-2 border-transparent border-t-brand-500 animate-spin" />
          </div>
          <p className="text-sm text-slate-300">
            Crafting your viral video package…
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="skeleton w-9 h-9 rounded-lg" />
              <div className="skeleton h-4 w-32" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-5/6" />
              <div className="skeleton h-3 w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
