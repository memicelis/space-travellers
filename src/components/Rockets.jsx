import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRockets, reserveRocket, cancelRocket } from '../redux/rockets/rocketsSlice';

const Rockets = () => {
  const rocketsData = useSelector((state) => state.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRockets());
  }, []);

  console.log(rocketsData);
  const handleReserveClick = (rocketId) => {
    dispatch(reserveRocket({ rocketId }));
  };

  const handleCancelClick = (rocketId) => {
    dispatch(cancelRocket({ rocketId }));
  };
  return (
    <div className="flex">
      {rocketsData ? (
        <ul className="flex flex-col gap-6 p-6">
          {rocketsData.map((rocket) => (
            <li className="flex gap-2 max-w-full p-6" key={rocket.id}>
              <div className="w-1/4 flex items-center justify-center">
                {rocket.flickr_images.length > 0 && (
                  <img className="w-46 h-46" src={rocket.flickr_images[0]} alt={rocket.rocket_name} />
                )}
              </div>
              <div className="flex flex-col w-3/4 text-start gap-3">
                <h2 className="font-bold">{rocket.rocket_name}</h2>
                <p>
                  {rocket.reserved ? (
                    <span className="bg-blue-500 text-white w-auto rounded-md p-1 mr-2">
                      Reserved
                    </span>
                  ) : ''}
                  {rocket.description}
                </p>
                {rocket.reserved ? (
                  <button className="max-w-fit bg-white hover:bg-slate-50 text-gray-800 py-2 px-4 rounded-md border border-gray-600" type="button" onClick={() => handleCancelClick(rocket.id)}>
                    Cancel Reservation
                  </button>
                ) : (
                  <button className="max-w-fit bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" type="button" onClick={() => handleReserveClick(rocket.id)}>Reserve Rocket</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Rockets;
