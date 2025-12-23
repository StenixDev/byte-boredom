// app/orders/OrdersClient.js
'use client';

import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fixOrderStructure } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('not-completed');

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('http://localhost:3000/api/orders');
      const data = await res.json();

      setOrders(fixOrderStructure(data));
    }

    fetchOrders(); // initial load

    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  async function handleClick(code: string) {
    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, status: 'completed' }),
    });

    if (res.ok) {
      const updatedOrder = await res.json();
      setOrders(
        orders.map((order) => (order.code === code ? updatedOrder : order))
      );
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'completed') {
      return order.status === 'completed';
    }
    return order.status !== 'completed';
  });

  return (
    <div>
      <div className='flex justify-center my-4'>
        <Button
          onClick={() => setActiveTab('not-completed')}
          className={`px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer ${
            activeTab === 'not-completed'
              ? 'bg-red-600 text-white'
              : 'bg-red-900'
          }`}
        >
          Not Completed
        </Button>
        <Button
          onClick={() => setActiveTab('completed')}
          className={`ml-4 px-4 py-2 rounded-md  hover:bg-red-700 cursor-pointer ${
            activeTab === 'completed' ? 'bg-red-600 text-white' : 'bg-red-900'
          }`}
        >
          Completed
        </Button>
      </div>
      {filteredOrders.length === 0 ? (
        <h2 className='text-3xl text-center font-bold'>
          No orders in this category
        </h2>
      ) : (
        <Table className='bg-white'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-25'>Order #</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Quantity</TableHead>
              {activeTab === 'not-completed' && (
                <TableHead className='text-right'>Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className='font-medium'>{order.code}</TableCell>
                <TableCell>
                  {order.items.map((item) => (
                    <p key={item.name}>{item.name}</p>
                  ))}
                </TableCell>
                <TableCell>
                  {order.items.map((item) => (
                    <p key={Math.random()}>{item.quantity}</p>
                  ))}
                </TableCell>
                {activeTab === 'not-completed' && (
                  <TableCell className='text-right'>
                    <Button
                      onClick={() => handleClick(order.code)}
                      className='bg-red-600 cursor-pointer hover:bg-red-700'
                    >
                      Complete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={activeTab === 'not-completed' ? 4 : 3}
              ></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
