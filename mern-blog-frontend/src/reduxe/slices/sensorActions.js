import axios from '../../axios';

const initialState = {
    sensorData: []
  };
  
  const sensorReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SENSOR_DATA':
        return {
          ...state,
          sensorData: action.payload
        };
      default:
        return state;
    }
  };

  export const fetchSensorData = () => {
    return (dispatch) => {
      axios.get('/sensor-data')
        .then((response) => {
          console.log("RESPONSE DATA SENSOR --> ", response);
          dispatch({
            type: 'FETCH_SENSOR_DATA',
            payload: response.data
          });
        })
        .catch((error) => {
          console.error('Помилка отримання даних датчика:', error);
        });
    };
  };
  
  export default sensorReducer;