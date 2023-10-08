import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketsAPI = 'https://api.spacexdata.com/v3/rockets';
const initialState = [];

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  const response = await axios.get(rocketsAPI);
  return response.data;
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const { rocketId } = action.payload;
      const updatedRockets = state.map((rocket) => {
        if (rocket.id === rocketId && rocket.reserved !== true) {
          return { ...rocket, reserved: true };
        }
        return rocket;
      });
      return updatedRockets;
    },
    cancelRocket: (state, action) => {
      const { rocketId } = action.payload;
      const updatedRockets = state.map((rocket) => {
        if (rocket.id === rocketId && rocket.reserved !== false) {
          return { ...rocket, reserved: false };
        }
        return rocket;
      });
      return updatedRockets;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRockets.fulfilled, (state, action) => action.payload);
  },
});

export const { reserveRocket, cancelRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;
