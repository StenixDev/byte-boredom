import { OrderType } from '@/app/components/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fixOrderStructure(badData: OrderType[]) {
  return badData.map((order) => {
    const { id, code, status, ...items } = order;

    const newItems = Object.keys(items)
      .filter((key) => !isNaN(parseInt(key)))
      .map((key) => (items as any)[key]);

    return {
      id,
      code,
      status,
      items: newItems,
      total: newItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      customer: {
        name: 'test',
        address: 'test',
        phone: 'test',
      },
    };
  });
}

// Usage
