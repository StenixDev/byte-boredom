import { CloudSun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 7.0731,
  longitude: 125.6128,
  daily: 'weather_code',
  hourly: 'temperature_2m',
};

function App() {
  const [data, setData] = useState<{ city: string; countryName: string }>({
    city: '',
    countryName: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsLoading(true);
        const url = 'https://api.open-meteo.com/v1/forecast';
        const responses = await fetchWeatherApi(url, params);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const getCityResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
        );

        const cityResult = await getCityResponse.json();
        console.log(cityResult);
        setData({
          city: cityResult.city,
          countryName: cityResult.countryName,
        });

        console.log(
          `\nCoordinates: ${latitude}°N ${longitude}°E`,
          `\nElevation: ${elevation}m asl`,
          `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
        );

        const hourly = response.hourly()!;
        const daily = response.daily()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
          hourly: {
            time: Array.from(
              {
                length:
                  (Number(hourly.timeEnd()) - Number(hourly.time())) /
                  hourly.interval(),
              },
              (_, i) =>
                new Date(
                  (Number(hourly.time()) +
                    i * hourly.interval() +
                    utcOffsetSeconds) *
                    1000
                )
            ),
            temperature_2m: hourly.variables(0)!.valuesArray(),
          },
          daily: {
            time: Array.from(
              {
                length:
                  (Number(daily.timeEnd()) - Number(daily.time())) /
                  daily.interval(),
              },
              (_, i) =>
                new Date(
                  (Number(daily.time()) +
                    i * daily.interval() +
                    utcOffsetSeconds) *
                    1000
                )
            ),
            weather_code: daily.variables(0)!.valuesArray(),
          },
        };

        // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
        console.log('\nHourly data:\n', weatherData.hourly);
        console.log('\nDaily data:\n', weatherData.daily);
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

      <div className='text-[#68bdf2]'>
        <CloudSun />
        icon 18 deg
      </div>

      <p>Partly Cloudy</p>
    </div>
  );
}
export default App;
