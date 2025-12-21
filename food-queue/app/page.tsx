import { Button } from '@/components/ui/button';
import Food from './components/food';
import ProceedOrder from './components/proceed-order';

const foodList = [
  {
    id: 1,
    name: 'Crispy Fried',
    description:
      'Juicy, tender chicken cooked to perfection with rich, savory flavors in every bite.',
    price: 120,
    img: '/chicken.png',
  },

  {
    id: 2,
    name: 'Yum Burger',
    description:
      'A juicy, flavorful hamburger with a perfectly grilled patty, fresh toppings, and a soft, toasted bun.',
    price: 79,
    img: '/humberger.png',
  },
];

function Home() {
  return (
    <div className='flex flex-col justify-center'>
      <h1 className='font-semibold text-center'>
        <span className='inline-block bg-red-600 text-white px-5 py-1 rounded-md text-2xl'>
          Menu
        </span>
      </h1>

      <div className='py-5 flex gap-4 flex-wrap items-stretch justify-center'>
        {foodList.map((food) => (
          <Food
            key={food.id}
            name={food.name}
            price={food.price}
            img={food.img}
            description={food.description}
            id={food.id}
          />
        ))}
      </div>

      {}
      <ProceedOrder />
    </div>
  );
}
export default Home;
