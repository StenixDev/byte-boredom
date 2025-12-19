import Food from './components/food';

function Home() {
  return (
    <div className=''>
      <h1 className='font-semibold text-center'>
        <span className='inline-block bg-red-600 text-white px-5 py-1 rounded-md text-2xl'>
          Menu
        </span>
      </h1>

      <div className='py-5 flex gap-4'>
        <Food name='Crispy Fried' price={120} img='/chicken.png' />
        <Food name='Yum Burger' price={79} img='/humberger.png' />
      </div>
    </div>
  );
}
export default Home;
