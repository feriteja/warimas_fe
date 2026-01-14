const SkeletonCard = () => (
  <div className="p-6 bg-white border border-gray-100 rounded-2xl h-64 animate-pulse">
    <div className="w-10 h-10 bg-gray-200 rounded-full mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="flex gap-2 mt-4">
      <div className="h-5 bg-gray-200 rounded w-16"></div>
      <div className="h-5 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

export default SkeletonCard;
