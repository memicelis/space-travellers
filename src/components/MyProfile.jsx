import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const rockets = useSelector((state) => state.rockets.data);
  const missions = useSelector((state) => state.missions.data);
  console.log(rockets.filter((rocket) => rocket.reserved));
  console.log(missions);
  return (

    <div className="flex w-full px-12 py-8 gap-6">
      <div className="w-1/2">
        <h1 className="text-left text-3xl mb-4"> My Missions</h1>
        {missions ? (
          <table className="w-full">
            <tbody>
              {missions.filter((mission) => mission.joined).map((joinedMission) => (
                <tr key={joinedMission.id}>
                  <td className="text-left border border-gray-300 p-4">{joinedMission.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No missions available.</p>
        )}
      </div>
      <div className="w-1/2">
        <h1 className="text-left text-3xl mb-4">My Rockets</h1>
        {rockets ? (
          <table className="w-full">
            <tbody>
              {rockets.filter((rocket) => rocket.reserved).map((reservedRocket) => (
                <tr key={reservedRocket.id}>
                  <td className="text-left border border-gray-300 p-4">{reservedRocket.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No missions available.</p>
        )}
      </div>
    </div>

  );
};

export default MyProfile;
