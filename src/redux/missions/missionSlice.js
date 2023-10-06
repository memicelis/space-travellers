import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const missionsAPI = 'https://api.spacexdata.com/v3/missions';
const initialState = {
  data: [],
  isFetched: false,
};

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async (_, { getState }) => {
  const { missions } = getState();
  if (missions.isFetched) {
    return [];
  }

  const response = await axios.get(missionsAPI);
  const transformedData = response.data.map((mission) => ({
    id: mission.mission_id,
    name: mission.mission_name,
    description: mission.description,
  }));
  return transformedData;
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, action) => {
      const { missionId } = action.payload;
      const updatedMissions = state.data.map((mission) => {
        if (mission.id === missionId && mission.joined !== true) {
          return { ...mission, joined: true };
        }
        return mission;
      });
      return { ...state, data: updatedMissions };
    },
    cancelMission: (state, action) => {
      const { missionId } = action.payload;
      const updatedMissions = state.data.map((mission) => {
        if (mission.id === missionId && mission.joined !== true) {
          return { ...mission, joined: false };
        }
        return mission;
      });
      return { ...state, data: updatedMissions };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.fulfilled,
      (state, action) => ({ ...state, data: action.payload, isFetched: true }));
  },
});

export const { joinMission, cancelMission } = missionsSlice.actions;
export default missionsSlice.reducer;
