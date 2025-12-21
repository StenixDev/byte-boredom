'use client';
import { useGlobal } from '@/context/global-state';

import { Button } from '@/components/ui/button';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

function Order() {
  const { data, setData } = useGlobal();

  const [success, setSuccess] = useState(false);

  const totalQuantity = data.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  async function handleSubmit() {
    const result = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, code }),
    });

    if (result) {
      setData([]);
      setSuccess(true);
    }
  }

  if (success)
    return (
      <div className='bg-white rounded-xl p-5'>
        <h1 className='text-2xl'>
          Thank you for your order! We are now preparing it. Please proceed to
          the cashier for payment.{' '}
        </h1>
        <h2 className='text-4xl'>
          Your Order <span className='font-bold'>#{code}</span>
        </h2>
      </div>
    );
  return (
    <div>
      <h1 className='text-xl font-bold mb-3 text-center text-red-700'>
        Order Datail
      </h1>

      <div className='mx-auto max-w-xs bg-white  shadow '>
        <table className='w-full divide-y divide-gray-200 rounded-lg'>
          <thead className='bg-red-600'>
            <tr>
              <th className='px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Item
              </th>
              <th className='px-2 py-3 text-right text-xs font-medium text-white uppercase tracking-wider'>
                Price
              </th>
              <th className='px-2 py-3 text-right text-xs font-medium text-white uppercase tracking-wider'>
                Qty
              </th>
              <th className='px-2 py-3 text-right text-xs font-medium text-white uppercase tracking-wider'>
                Total
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data.map((order) => (
              <tr key={order.id} className='hover:bg-gray-50'>
                <td className='px-2 py-4 text-sm text-gray-500 break-words'>
                  {order.name}
                </td>
                <td className='px-2 py-4 text-sm text-gray-500 text-right'>
                  {order.price}
                </td>
                <td className='px-2 py-4 text-sm text-gray-500 text-right'>
                  {order.quantity}
                </td>
                <td className='px-2 py-4 text-sm text-gray-500 text-right'>
                  {order.price * order.quantity}
                </td>
              </tr>
            ))}

            <tr className='hover:bg-gray-50'>
              <td className='px-2 py-4 text-sm text-gray-500' colSpan={2}></td>
              <td className='px-2 py-4 text-sm text-gray-500 text-right font-semibold'>
                Total Bill
              </td>
              <td className='px-2 py-4 text-sm text-gray-500 text-right font-bold'>
                {totalQuantity}
              </td>
            </tr>
          </tbody>
        </table>
        <div className='flex'>
          <Button
            onClick={handleSubmit}
            className='ml-auto mr-7 mb-5 bg-red-600 hover:bg-red-700 cursor-pointer'
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Order;
