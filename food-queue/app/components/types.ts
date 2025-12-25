export type FoodType = {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  quantity?: number;
};

export type OrderType = {
  id: number;
  status: string;
  code?: string;
  items: FoodType[];
  total: number;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
};