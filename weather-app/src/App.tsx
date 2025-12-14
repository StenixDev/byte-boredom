import { CloudSun } from 'lucide-react';


function App() {

  console.log("test");

  return (
    <div className='w-xl mx-auto pt-20 flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold text'>The Cityx</h1>
      <p>a brgy? maybe</p>

      <div className='text-[#68bdf2]'>
        <CloudSun />
        icon 18 deg
      </div>

      <p>Partly Cloudy</p>
    </div>
  );
}
export default App;
