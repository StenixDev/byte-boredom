// app/orders/page.tsx
export const dynamic = 'force-dynamic';

export default async function Orders() {
  // Fetch from DB directly or use the API
  const res = await fetch('http://localhost:3000/api/orders', {
    cache: 'no-store',
  });
  const orders = await res.json();

  return <div>{orders.length} orders found</div>;
}
