import React, { useEffect, useState } from 'react';

function Paths() {
  const [routeDetails, setRouteDetails] = useState([]);

  useEffect(() => {
    fetch("https://roadlyne.xyz/api/v1/tracking/share/live?token=Q0cxMEJMNTY3OC10cmFjay04NjQwMA==")
      .then(res => res.json())
      .then(data => {
        if (data.status && data.data && data.data.data.history) {
          setRouteDetails(data.data.data.history);
        }
      })
      .catch(err => console.error("Error fetching route details:", err));
  }, []);

  // useEffect(() => {
  //   console.log("Route details updated:");
  //   routeDetails.forEach((item, index) => console.log(`Object ${index + 1}:`, item));
  // }, [routeDetails]);

  return (
    <>
      <div className='bg-white overflow-y-scroll h-[70vh] pb-8 lg:pb-2'>
        {routeDetails.length > 0 ? (
          routeDetails.map((entry, index) => {
            // Check if it's the first stoppage
            const isFirstStoppage = index === 0 && entry.type === "stoppage";
            // Check if it's the last entry (Current Location)
            const isCurrentLocation = index === routeDetails.length - 1;

            return (
              <section key={index} className='pr-3'>
                <div>
                  <div className='flex gap-3'>
                    {/* Icon and Color Logic */}
                    {entry.type === "running" ? (
                      <>
                        <span className='text-[#008000] transform -rotate-90'>
                          <i className="fa-solid fa-play"></i>
                        </span>
                        <p className='text-[#008000]'>
                          Running {isFirstStoppage && "( Current Location )"}
                        </p>
                      </>
                    ) : (
                      <>
                        <span className='text-[red] transform -rotate-90'>
                          <i className="fa-solid fa-square"></i>
                        </span>
                        <p className='text-[red]'>
                          Stopped {isFirstStoppage && "( Current Location )"}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className='flex gap-3'>
                    <p className='border-dashed border-[1px] border-gray-500 ms-[6px]'></p>
                    <div className='flex flex-col gap-1 text-gray-400 text-sm'>
                      <p>{entry.address}</p>
                      {entry.type === "running" && <p>Covered {entry.covered_distance || "N/A"} Km</p>}
                      <p>{entry.from_datetime} - {entry.to_datetime}</p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        ) : (
          <p>Loading route details...</p>
        )}
      </div>
    </>
  );
}

export default Paths;
