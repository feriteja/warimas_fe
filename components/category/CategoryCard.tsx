import { CategoryItem } from "@/types";

const CategoryCard = ({ item }: { item: CategoryItem }) => {
  return (
    <div className="group flex flex-col justify-between p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            {/* Folder Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
            </svg>
          </div>
          <span className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 transition-all duration-300">
            {/* Arrow Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
          {item.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {item.subcategories.slice(0, 3).map((sub) => (
            <span
              key={sub.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100"
            >
              {sub.name}
            </span>
          ))}
          {item.subcategories.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-400">
              +{item.subcategories.length - 3} lainnya
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
