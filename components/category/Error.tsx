const ErrorState = ({ message }: { message: string }) => (
  <div className="col-span-full mt-10 text-center p-8 bg-red-50 border border-red-200 rounded-2xl">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    <p className="text-red-700 font-medium mb-4">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
    >
      Coba Lagi
    </button>
  </div>
);

export default ErrorState;
