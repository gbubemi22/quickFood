import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OTPPage() {
  const searchParams = useSearchParams();
  const otp = searchParams.get('otp');

  return (
    <div>
      <h1>OTP Page</h1>
      <p>OTP: {otp}</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPPage />
    </Suspense>
  );
}