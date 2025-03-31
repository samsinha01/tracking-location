import React from 'react';
import Paths from '../Paths';

function RouteDetails({ handleMouseDown, bottomHeight }) {
  return (
    <section 
      className='bg-white px-4 bottom-0 w-full z-50 transition-all duration-200 ease-in-out'
      style={{ height: `${bottomHeight}vh` }} 
    >
      {/* Drag Handle */}
      <div onMouseDown={handleMouseDown} className='flex justify-center cursor-row-resize pt-5 lg:hidden'>
        <p className='w-[70px] h-[4px] rounded-md bg-gray-800'></p>
      </div>

      {/* Content */}
      <div className='pt-4'>
        <h2 className='font-bold text-lg text-gray-800 '>ROUTE DETAILS</h2>
          <Paths />
      </div>
    </section>
  );
}

export default RouteDetails;
