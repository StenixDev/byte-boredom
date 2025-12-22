// app/orders/OrdersClient.js
'use client';

import { useEffect, useState } from 'react';

export default function OrdersClient() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setCount(data.length);
    }

    fetchOrders(); // initial load

    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div>Total orders: {count}</div>;
}
