'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function VerifyContent() {
  const params = useSearchParams();
  const status = params.get('status');

  const getMessage = () => {
    switch (status) {
      case 'success':
        return {
          title: '🎉 Subscription confirmed',
          color: 'text-green-600',
        };
      case 'already':
        return {
          title: '✅ Already subscribed',
          color: 'text-blue-600',
        };
      case 'expired':
        return {
          title: '⏰ Verification link expired',
          color: 'text-red-600',
        };
      case 'invalid':
        return {
          title: '❌ Invalid verification link',
          color: 'text-red-600',
        };
      default:
        return {
          title: '⚠️ Verification failed',
          color: 'text-red-600',
        };
    }
  };

  const { title, color } = getMessage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className={`text-2xl font-bold ${color}`}>
          {title}
        </h1>

        <p className="text-gray-500 text-sm">
          You can safely close this page.
        </p>
      </div>
    </div>
  );
}

export default function SubscriptionVerifiedPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}