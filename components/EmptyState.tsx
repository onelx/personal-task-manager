'use client';

// Empty state component with illustration and CTA
export function EmptyState() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="text-center max-w-sm mx-auto">
        {/* Illustration */}
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        
        {/* Text */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-500 mb-4">
          Get started by adding your first task. Use the quick add input above or click the "New Task" button for more options.
        </p>
        
        {/* Tips */}
        <div className="text-left bg-gray-50 rounded-lg p-4 text-sm">
          <p className="font-medium text-gray-700 mb-2">Quick tips:</p>
          <ul className="text-gray-600 space-y-1">
            <li>✓ Use high priority for urgent tasks</li>
            <li>✓ Click the checkbox to mark complete</li>
            <li>✓ Search and filter to find tasks fast</li>
          </ul>
        </div>
      </div>
    </div>
  );
}