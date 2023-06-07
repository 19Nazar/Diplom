import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) =>{
    const { data } = await axios.post('/authorisation/login', params);
    return data;
});

export const fetchRegistMe = createAsyncThunk('auth/fetchRegistMe', async (params) =>{
    const { data } = await axios.post('/authorisation/regist', params);
    return data;
});

export const fetchMeData = createAsyncThunk('auth/fetchMeData', async () =>{
    const { data } = await axios.get('/authorisation/my');
    return data;
});



const initialState = {
    data: null,
    status: 'loading',
};
const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            logout: (state) => {
                state.data = null;
            },
       },
        extraReducers: {
            [fetchUserData.pending]: (state) => {
                state.status = 'loading';
                state.data = null;
            },
            [fetchUserData.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            },
            [fetchUserData.rejected]: (state) => {
                state.status = 'error';
                state.data = null;
            },
            [fetchMeData.pending]: (state) => {
                state.status = 'loading';
                state.data = null;
            },
            [fetchMeData.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            },
            [fetchMeData.rejected]: (state) => {
                state.status = 'error';
                state.data = null;
            },            
            [fetchRegistMe.pending]: (state) => {
                state.status = 'loading';
                state.data = null;
            },
            [fetchRegistMe.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
            },
            [fetchRegistMe.rejected]: (state) => {
                state.status = 'error';
                state.data = null;
            },


        },
});

export const Authornot = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;