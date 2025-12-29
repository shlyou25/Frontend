import React from 'react';

const PaymentSettingCard = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow flex flex-col">
      <h2 className="text-xl font-semibold mb-6">Payment Setting</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-1">Current Payment Method</span>
            <div className="bg-white rounded border px-3 py-2 text-gray-900 shadow-sm flex flex-row items-center space-x-3 max-w-fit">
              <span>Visa ending in 2345</span>
              <span className="text-xs text-gray-400">09/27</span>
            </div>
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-1">Add Backup Method</span>
          </div>
          <a href="#" className="text-blue-600 hover:underline text-sm">Cancel Subscription</a>
        </div>
        {/* Right Column */}
        <div className="flex flex-col items-end space-y-5">
          <a href="#" className="text-blue-600 text-sm hover:underline">View Details</a>
          <a href="#" className="text-blue-600 text-sm hover:underline">Update Payment Method</a>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-blue-100 rounded-full peer  peer-checked:bg-blue-600 relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettingCard;
