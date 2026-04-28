export default function Blocked() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full text-center bg-white shadow-xl rounded-2xl p-8">

        <div className="mb-6">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl">⚠️</span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Access Restricted
        </h1>

        <p className="text-gray-600 mb-4">
          This project is temporarily unavailable due to pending payment.
        </p>

        <p className="text-sm text-gray-400">
          Please contact the developer to restore access.
        </p>

      </div>
    </div>
  );
}