import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fixOrderStructure(badData) {
  return badData.map((order) => {
    const { id, code, status, ...items } = order;

    return {
      id,
      code,
      status,
      items: Object.keys(items)
        .filter((key) => !isNaN(key))
        .map((key) => items[key]),
    };
  });
}

// Usage
