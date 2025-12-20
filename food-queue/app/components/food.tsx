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

  console.log(data);

  console.log(data.find((cv) => cv.id === id)?.quantity);

  return (
    <Card className='w-64  py-3 px-1 bg-lime-400 border-none rounded-md text-center'>
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
            alt='Crispy fried chicken'
            fill
            className='object-cover'
            sizes='120px'
          />
        </div>

        <CardTitle>{name}</CardTitle>
        <CardDescription className='text-black'>{description}</CardDescription>
      </CardHeader>

      <CardFooter className='flex-col gap-2 mt-auto'>
        {data.length > 0 && data.filter((cv) => cv.id === id).length ? (
          <div className=''>
            Quantity: 1{' '}
            <Button
              onClick={() =>
                setData((prev) =>
                  prev.map((item) =>
                    item.id === id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  )
                )
              }
              size='icon-sm'
              className='rounded-none w-6 h-6'
              variant={'outline'}
            >
              +
            </Button>
            {data.find((cv) => cv.id === id)?.quantity > 1 && (
              <Button
                size='icon-sm'
                className='rounded-none w-6 h-6
          '
              >
                -
              </Button>
            )}
          </div>
        ) : (
          <Button
            onClick={() =>
              setData((cv) => [
                ...cv,
                { id, name, description, price, img, quantity: 1 },
              ])
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
