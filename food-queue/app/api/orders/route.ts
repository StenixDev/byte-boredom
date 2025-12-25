import { OrderType } from '../../components/types';

let orders: OrderType[] = [];

export async function GET() {
  return Response.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newOrder: OrderType = {
    id: Date.now(),
    status: 'not-completed',
    ...body,
  };

  orders.push(newOrder);

  return Response.json(newOrder, { status: 201 });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { code, status } = body;

  orders = orders.map((order) =>
    order.code === code ? { ...order, status } : order
  );

  const updatedOrder = orders.find((order) => order.code === code);

  return Response.json(updatedOrder);
}

export async function PUT(req: Request) {
  const body = await req.json();

  orders = orders.map((order) => (order.id === body.id ? body : order));

  return Response.json(body);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  orders = orders.filter((order) => order.id !== id);

  return Response.json({ success: true });
}
