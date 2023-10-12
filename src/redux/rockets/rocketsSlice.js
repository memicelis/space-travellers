import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketsAPI = 'https://api.spacexdata.com/v3/rockets';
const initialState = {
  data: [],
  isFetched: false,
};

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async (_, { getState }) => {
  const { rockets } = getState(); // Get the current state
  if (rockets.isFetched) {
    return [];
  }

  const response = await axios.get(rocketsAPI);
  const transformedData = response.data.map((rocket) => ({
    id: rocket.id,
    name: rocket.rocket_name,
    description: rocket.description,
    flickr_images: rocket.flickr_images,
  }));
  return transformedData;
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const { rocketId } = action.payload;
      const updatedRockets = state.data.map((rocket) => {
        if (rocket.id === rocketId && rocket.reserved !== true) {
          return { ...rocket, reserved: true };
        }
        return rocket;
      });
      return { ...state, data: updatedRockets };
    },
    cancelRocket: (state, action) => {
      const { rocketId } = action.payload;
      const updatedRockets = state.data.map((rocket) => {
        if (rocket.id === rocketId && rocket.reserved !== false) {
          return { ...rocket, reserved: false };
        }
        return rocket;
      });
      return { ...state, data: updatedRockets };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.fulfilled,
        (state, action) => ({ ...state, data: action.payload, isFetched: true }));
  },
});

export const { reserveRocket, cancelRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;
