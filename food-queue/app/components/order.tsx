'use client';
import { useGlobal } from '@/context/global-state';
import OrderDetails from './order-detail';
function Order() {
  const { data } = useGlobal();
  const totalQuantity = data.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
  console.log(data);
  return (
    <div>
      <h1 className='text-xl font-bold mb-3'>Order Datail</h1>

      <div className='mx-auto overflow-x-auto max-w-2xl bg-white rounded-lg shadow'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-red-600'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'></th>
              <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Price
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Quantity
              </th>

              <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                Total
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data.map((order) => (
              <tr key={order.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {order.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {order.price}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {order.quantity}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {order.price * order.quantity}
                </td>
              </tr>
            ))}

            <tr className='hover:bg-gray-50'>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'></td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'></td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                Total Bill
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold'>
                {totalQuantity}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Order;
