import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const missionsAPI = 'https://api.spacexdata.com/v3/missions';
const initialState = [];

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  const response = await axios.get(missionsAPI);
  const transformedData = response.data.map((mission) => ({
    id: mission.mission_id,
    name: mission.mission_name,
    description: mission.description,
  }));
  console.log(transformedData);
  return transformedData;
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, action) => {
      const { missionId } = action.payload;
      const updatedMissions = state.map((mission) => {
        if (mission.id === missionId
          && mission.joined !== true) {
          return { ...mission, joined: true };
        }
        return mission;
      });
      return updatedMissions;
    },
    cancelMission: (state, action) => {
      const { missionId } = action.payload;
      const updatedMissions = state.map((mission) => {
        if (mission.id === missionId
          && mission.joined !== false) {
          return { ...mission, joined: false };
        }
        return mission;
      });
      return updatedMissions;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.fulfilled, (state, action) => action.payload);
  },
});

export const { joinMission, cancelMission } = missionsSlice.actions;
export default missionsSlice.reducer;
