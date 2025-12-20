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
  quantity?: number;
};

function Food({ id, name, description, price, img }: FoodType) {
  const { data, setData } = useGlobal();

  const item = data.find((cv) => cv.id === id);
  const itemQuantity = item?.quantity ?? 0;

  const increment = () => {
    setData((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: (i.quantity ?? 0) + 1 } : i
      )
    );
  };

  const decrement = () => {
    setData(
      (prev) =>
        prev
          .map((i) =>
            i.id === id ? { ...i, quantity: (i.quantity ?? 0) - 1 } : i
          )
          .filter((i) => (i.quantity ?? 0) > 0) // remove items with 0
    );
  };

  const addToCart = () => {
    setData((prev) => [
      ...prev,
      { id, name, description, price, img, quantity: 1 },
    ]);
  };

  return (
    <Card className='w-64 py-3 px-1 bg-lime-400 border-none rounded-md text-center'>
      <CardHeader className='flex flex-col items-center'>
        <Badge
          className='h-5 min-w-5 rounded-full font-mono tabular-nums px-4 py-2 bg-red-600 text-white'
          variant='outline'
        >
          ₱ {price}
        </Badge>

        <div className='relative w-30 h-30'>
          <Image
            src={img}
            alt={name}
            fill
            className='object-cover'
            sizes='120px'
          />
        </div>

        <CardTitle>{name}</CardTitle>
        <CardDescription className='text-black'>{description}</CardDescription>
      </CardHeader>

      <CardFooter className='flex-col gap-2 mt-auto'>
        {itemQuantity > 0 ? (
          <div>
            Quantity: {itemQuantity}{' '}
            <Button
              onClick={increment}
              size='icon-sm'
              className='rounded-none w-6 h-6'
              variant='outline'
            >
              +
            </Button>
            <Button
              onClick={decrement}
              size='icon-sm'
              className='rounded-none w-6 h-6'
            >
              -
            </Button>
          </div>
        ) : (
          <Button
            onClick={addToCart}
            type='submit'
            className='max-w-xs bg-red-600 hover:bg-red-700 cursor-pointer'
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Food;
