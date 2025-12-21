import Order from '../components/order';

type Props = {
  searchParams: {
    code?: string;
  };
};

export default async function ProceedPage({ searchParams }: Props) {
  const params = await searchParams; // unwrap the Promise
  console.log(params.code);

  return (
    <div>
      <Order />
    </div>
  );
}
