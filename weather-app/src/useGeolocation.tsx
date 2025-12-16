import { useEffect, useState } from 'react';

interface GeolocationState {
  lat: number | null;
  lng: number | null;
  error: string;
}

export function useGeolocation(): GeolocationState {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [error, setError] = useState<string>(
    !('geolocation' in navigator)
      ? 'Geolocation is not supported by this browser.'
      : ''
  );

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err: GeolocationPositionError) => {
        setError(err.message);
      }
    );
  }, []);

  return { lat, lng, error };
}
