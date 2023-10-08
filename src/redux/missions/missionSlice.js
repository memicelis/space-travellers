import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const missionsAPI = 'https://api.spacexdata.com/v3/missions';
const initialState = [];

export const fetchMissions = createAsyncThunk('missions/fetchmissions', async () => {
  const response = await axios.get(missionsAPI);
  console.log(response.data);
  return response.data;
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.fulfilled, (action) => action.payload);
  },
});

export default missionsSlice.reducer;
