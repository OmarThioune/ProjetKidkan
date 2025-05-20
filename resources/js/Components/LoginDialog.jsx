import { useState, useEffect } from "react";

const LoginDialog = () => {
  const [isOpen, setIsOpen] = useState(false); // Default to hidden

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem("hasSeenLoginDialog");

    if (!hasSeenDialog) {
      setIsOpen(true); // ✅ Show only if first login
      localStorage.setItem("hasSeenLoginDialog", "true"); // ✅ Save flag
    }
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-bold text-gray-900">You're logged in!</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginDialog;