import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions, joinMission, cancelMission } from '../redux/missions/missionSlice';

const Missions = () => {
  const missionsData = useSelector((state) => state.missions.data);
  const isFetched = useSelector((state) => state.missions.isFetched);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchMissions());
    }
  }, [dispatch, isFetched]);

  const handleJoinClick = (missionId) => {
    dispatch(joinMission({ missionId }));
  };

  const handleCancelClick = (missionId) => {
    dispatch(cancelMission({ missionId }));
  };

  return (
    <div className="flex w-full">
      {missionsData ? (
        <table className="table">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Mission</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2"> </th>
            </tr>
          </thead>
          <tbody>
            {missionsData.slice(0, 4).map((mission, index) => (
              <tr key={mission.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border px-4 py-2">{mission.name}</td>
                <td className="border px-4 py-2">{mission.description}</td>
                {index !== 3 ? (
                  <>
                    <td className="border px-4 py-2 w-1/6">
                      {mission.joined ? (
                        <span className="bg-blue-500 text-white w-auto rounded-md p-1 mr-2">Active Member</span>
                      ) : (
                        <span className="bg-gray-500 text-white w-auto rounded-md p-1 mr-2">NOT A MEMBER</span>
                      )}
                    </td>
                    <td className="border px-4 py-2 w-1/6">
                      {mission.joined ? (
                        <button
                          className="border border-red-500 hover:bg-red-200 text-red-500 py-2 px-4 rounded-md"
                          type="button"
                          onClick={() => handleCancelClick(mission.id)}
                        >
                          Leave Mission
                        </button>
                      ) : (
                        <button
                          className="border border-gray-500 hover:bg-gray-200 text-gray-500 py-2 px-4 rounded-md"
                          type="button"
                          onClick={() => handleJoinClick(mission.id)}
                        >
                          Join Mission
                        </button>
                      )}
                    </td>
                  </>
                ) : null}
              </tr>
            ))}
          </tbody>

        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Missions;
