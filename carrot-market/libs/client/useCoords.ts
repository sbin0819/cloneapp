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
      // maximumAge: 60000,
      // timeout: 10000,
      // enableHighAccuracy: true,
      enableHighAccuracy: true,
    });
    // const time = async () => {
    //   await wait(10000);
    //   console.log('waitting over...');
    // };
    // time();
  }, []);
  return coords;
}
