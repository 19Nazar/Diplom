import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';


import sensorReducer from './slices/sensorActions';

const store = configureStore({
    reducer: {
        auth: authReducer,
        sensor: sensorReducer
    },
});

export default store;