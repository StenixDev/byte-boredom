import { Cloud, CloudRain, CloudSun, Droplet, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGeolocation } from './useGeolocation';
import { convertToTime } from './utils/date-time';

type dataTypes = {
  city: string;
  countryName: string;
  temperature: string;
  condition: string;
  humidity: string;
  wind: string;
  sunrise: string;
  sunset: string;
};

const weatherCodeMap: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Heavy rain showers',
  95: 'Thunderstorm',
};

function App() {
  const [data, setData] = useState<dataTypes>({
    city: '',
    countryName: '',
    temperature: '',
    condition: '',
    humidity: '',
    wind: '',
    sunrise: '',
    sunset: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { lat, lng, error } = useGeolocation();

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsLoading(true);

        if (lat && lng) {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?
latitude=${lat}&
longitude=${lng}&
current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,weather_code,wind_speed_10m&
daily=sunrise,sunset&
timezone=auto`
          );
          const data = await res.json();
          //const result = data.current_weather.temperature;

          const temp = data?.current?.temperature_2m;

          setData((prevData) => ({
            ...prevData,
            temperature: temp,
            condition: weatherCodeMap[data.current.weather_code] || 'Unknown',
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m,
            sunrise: convertToTime(data.daily.sunrise[0]),
            sunset: convertToTime(data.daily.sunset[0]),
          }));

          const getCityResponse = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );

          const cityResult = await getCityResponse.json();

          setData((prevData) => ({
            ...prevData,
            city: cityResult.city,
            countryName: cityResult.countryName,
          }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
  }, [lat, lng]);

  const time = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
  });

  if (error) return <p>Error {error}</p>;

  return isLoading ? (
    'Loading...'
  ) : (
    <div className='w-xl mx-auto pt-20 flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold text'>{data?.city}</h1>
      <p>{data?.countryName}</p>
      <div className='text-[#68bdf2] flex my-10 items-center'>
        <CloudSun className='size-20' />
        <span className='text-7xl font-bold'>{data?.temperature}°</span>
      </div>
      <p className='text-xl font-bold text-stone-300'>{data.condition}</p>
      <div className='flex p-5 bg-stone-500 rounded-2xl my-5 text-[#c6c6c6] '>
        <div className='flex flex-col items-center p-4 border-r border-solid border-r-[#aeaeae]'>
          <Sun />
          <span className='font-bold'>{time}</span>
        </div>
        <div className='flex flex-col items-center  p-4 border-r border-solid border-r-[#aeaeae]'>
          <Cloud />
          <span className='font-bold'>{data?.temperature}°</span>
        </div>
        <div className='flex flex-col items-center  p-4 border-r border-solid border-r-[#aeaeae]'>
          <CloudRain />
          <span className='font-bold'>{data?.temperature}°</span>
        </div>
        <div className='flex flex-col items-center p-4  '>
          <Droplet />
          <span className='font-bold'>{data?.temperature}°</span>
        </div>
      </div>

      <div className='border-5 w-xs p-5 border-stone-500 rounded-2xl my-5 text-[#c6c6c6] '>
        <div>day / hourly temp</div>
        <div className='flex p-3 text-stone-300 font-bold'>
          <div className='flex-1'>
            <ul>
              <li>Humidity</li>
              <li>Wind</li>
              <li>Sunrise</li>
              <li>Sunset</li>
            </ul>
          </div>
          <div className='flex-1'>
            <ul>
              <li>{data?.humidity}%</li>
              <li>{data?.wind} km/h</li>
              <li>{data?.sunrise}</li>
              <li>{data?.sunset}</li>
            </ul>
          </div>
        </div>
        <div>body / details</div>
      </div>
    </div>
  );
}
export default App;
