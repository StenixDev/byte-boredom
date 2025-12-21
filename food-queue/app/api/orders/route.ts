let orders = [];

export async function GET() {
  return Response.json(orders);
}

export async function POST(req) {
  const body = await req.json();

  const newOrder = {
    id: Date.now(),
    ...body,
  };

  orders.push(newOrder);

  return Response.json(newOrder, { status: 201 });
}

export async function PUT(req) {
  const body = await req.json();

  orders = orders.map((order) => (order.id === body.id ? body : order));

  return Response.json(body);
}

export async function DELETE(req) {
  const { id } = await req.json();

  orders = orders.filter((order) => order.id !== id);

  return Response.json({ success: true });
}
