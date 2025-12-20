'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGlobal } from '@/context/global-state';

function ProceedOrder() {
  const { data } = useGlobal();
  const [code, setCode] = useState(null);

  useEffect(() => {
    setCode(randomCode());
  }, []);

  if (!code) return null; // or loading state

  return (
    data.length > 0 && (
      <div className='font-semibold text-center'>
        <Button
          asChild
          className='bg-red-600 hover:bg-red-700 text-white px-5 py-1 rounded-md text-2xl'
        >
          <Link
            href={{
              pathname: '/proceed',
              query: { code },
            }}
          >
            Proceed
          </Link>
        </Button>
      </div>
    )
  );
}

export default ProceedOrder;

function randomCode(length = 4) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}
