import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSensorData } from '../../reduxe/slices/sensorActions';

export const SensorDataComponent = () => {
  const [isParkingFull, setParkingValue] = useState(null);
  const dispatch = useDispatch();
  const sensor = useSelector(state => state.sensor);
  const state = useSelector(state => state);

  console.log("STATE --> ", state);

  useEffect(() => {
    dispatch(fetchSensorData());
  }, []);

  useEffect(() => {
    if (sensor?.sensorData?.[0]?.value)
    setParkingValue(!!sensor?.sensorData?.[0]?.value)
  }, [sensor]);

  console.log("sensor", sensor);

  return (
    <div>
      <h1>Дані датчика:</h1>
        {isParkingFull !=null ?
          isParkingFull ? 
          <h1>ПАРКОВКА ПОВНА: МІСЦЬ НЕМАЄ</h1> : <h1>ПАРКОВКА НЕ ПОВНА: Є МІСЦЯ !!!</h1>
         : ''}
    </div>
  );
};
