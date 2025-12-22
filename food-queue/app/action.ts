// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function submitOrder(orderData: any) {
  // 1. Save to your database here
  // await db.order.create({ data: orderData });

  const result = await fetch('http://localhost:3000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  // 2. Clear the cache for the page where the orders are displayed
  // If your list is on the home page, use '/'. If it's at /orders, use '/orders'
  revalidatePath('/orders');

  return { success: true };
}
