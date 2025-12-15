import { CloudSun } from 'lucide-react';
import { useEffect, useState } from 'react';

type dataTypes = {
  city: string;
  countryName: string;
  temperature: number;
  condition: string;
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

const params = {
  latitude: 7.0731,
  longitude: 125.6128,
  daily: 'weather_code',
  hourly: 'temperature_2m',
};

function App() {
  const [data, setData] = useState<dataTypes>({
    city: '',
    countryName: '',
    temperature: 0,
    condition: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?
latitude=${params.latitude}&
longitude=${params.longitude}&
current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,weather_code,wind_speed_10m&
timezone=auto`
        );
        const data = await res.json();
        //const result = data.current_weather.temperature;

        console.log(
          data.current.temperature_2m,
          data.current_units['temperature_2m']
        );

        // setData((prevData) => ({
        //   ...prevData,
        //   temperature: result,
        //   condition:
        //     weatherCodeMap[data.current_weather.weathercode] || 'Unknown',
        // }));

        const getCityResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${params.latitude}&longitude=${params.longitude}`
        );

        const cityResult = await getCityResponse.json();

        setData((prevData) => ({
          ...prevData,
          city: cityResult.city,
          countryName: cityResult.countryName,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return isLoading ? (
    'Loading...'
  ) : (
    <div className='w-xl mx-auto pt-20 flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold text'>{data?.city}</h1>
      <p>{data?.countryName}</p>

      <div className='text-[#68bdf2] flex my-10 items-center'>
        <CloudSun className='size-20' />
        <span className='text-7xl font-bold'>{data?.temperature} °C</span>
      </div>

      <p>{data.condition}</p>
    </div>
  );
}
export default App;
