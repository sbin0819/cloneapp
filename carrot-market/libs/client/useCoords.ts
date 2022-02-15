import { useEffect, useState } from 'react';

interface UseCoordState {
  longitude: number | null;
  latitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<UseCoordState>({
    latitude: null,
    longitude: null,
  });
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    console.log('onSuccess...');
    setCoords({ latitude, longitude });
  };
  const wait = (timeToDelay: number) =>
    new Promise((resolve) => setTimeout(resolve, timeToDelay));
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, null, {
      enableHighAccuracy: true,
    });
  }, []);
  return coords;
}
