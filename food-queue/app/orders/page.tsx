async function Orders() {
  const res = await fetch('http://localhost:3000/api/orders', {
    next: { revalidate: 5 },
  });

  const orders = await res.json();
  return <div>{orders.length}</div>;
}

export default Orders;
