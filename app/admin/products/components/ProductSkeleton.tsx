export default function ProductSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b animate-pulse">
      <div className="w-16 h-16 bg-gray-200 rounded-lg" />

      <div className="flex-1 space-y-2">
        <div className="h-4 w-52 bg-gray-200 rounded" />
        <div className="h-3 w-36 bg-gray-200 rounded" />
      </div>

      <div className="w-24 h-4 bg-gray-200 rounded" />
      <div className="w-20 h-6 bg-gray-200 rounded-xl" />
      <div className="flex gap-2">
        <div className="w-16 h-8 bg-gray-200 rounded-xl" />
        <div className="w-16 h-8 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}
