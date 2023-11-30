'use client';

import { useEffect } from 'react';
import { Link } from '@/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <p style={{ border: '1px solid red', padding: '4px' }}>
      Something went wrong, are you signed in? {JSON.stringify(error)}
      <div className="flex">
        <Link href="/login" className="link mx-2 text-blue-700">
          Go to login
        </Link>
        <Link href="/signup" className="link text-green-700">
          Go to register new user
        </Link>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </p>
  );
}
