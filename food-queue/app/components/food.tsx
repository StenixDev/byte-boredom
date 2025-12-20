'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGlobal } from '@/context/global-state';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

type FoodType = {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
};

function Food({ id, name, description, price, img }: FoodType) {
  const { data, setData } = useGlobal();

  console.log(data[0], data.filter((cv) => cv.id === id).length, id);

  return (
    <Card className='w-64  py-3 px-1 bg-lime-400 border-none rounded-md text-center'>
      <CardHeader className='flex flex-col items-center'>
        <Badge
          className='h-5 min-w-5 rounded-full font-mono tabular-nums px-4 py-2 bg-red-600 text-white'
          variant='outline'
        >
          ₱ {price}
        </Badge>

        <Image src={img} alt='Crispy fried chicken' width={120} height={20} />
        <CardTitle>{name}</CardTitle>
        <CardDescription className='text-black'>{description}</CardDescription>
      </CardHeader>

      <CardFooter className='flex-col gap-2 mt-auto'>
        {data.length > 0 && data.filter((cv) => cv.id === id).length ? (
          <div className=''>
            Quantity: 1{' '}
            <Button
              onClick={() => setData((cv) => [...cv, { name: 'sting' }])}
              size='icon-sm'
              className='rounded-none w-6 h-6'
              variant={'outline'}
            >
              +
            </Button>
            <Button
              size='icon-sm'
              className='rounded-none w-6 h-6
          '
            >
              -
            </Button>
          </div>
        ) : (
          <Button
            onClick={() =>
              setData((cv) => [...cv, { id, name, description, price, img }])
            }
            type='submit'
            className='max-w-xs bg-red-600 hover:bg-red-700 cursor-pointer '
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
export default Food;
