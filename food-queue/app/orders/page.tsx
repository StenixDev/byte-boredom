// app/orders/OrdersClient.js
'use client';

import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
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

  console.log(orders);

  return (
    <Table className='bg-white'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-25'>Order #</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className='text-right'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
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

            <TableCell className='text-right'>
              <Button className='bg-red-600 cursor-pointer hover:bg-red-700'>
                Complete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}></TableCell>
          <TableCell className='text-right'></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
