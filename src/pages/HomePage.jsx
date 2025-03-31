import React, { useState, useRef, useEffect } from 'react';
import Details from '../components/Home/details';
import RouteDetails from '../components/Home/RouteDetails';
import MapSite from '../components/Home/MapSite';

function HomePage() {
  const [bottomHeight, setBottomHeight] = useState(25); // Initial height in vh
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      const newHeight = ((window.innerHeight - e.clientY) / window.innerHeight) * 100;
      if (newHeight >= 10 && newHeight <= 2000) {
        setBottomHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  return (
    <div className='flex flex-col lg:flex-row bg-gray-800 relative w-full h-screen overflow-hidden'>
      {/* Left Sidebar */}
      <div className='flex flex-col lg:w-[25vw] lg:h-[100vh] bg-white p-3'>
        <Details />
        <div className='hidden lg:block'>
          <RouteDetails />
        </div>
      </div>

      {/* Map Section */}
      <div className='flex-grow lg:h-[100vh] h-[75vh] z-10'>
        <MapSite />
      </div>

      {/* Draggable RouteDetails Section */}
      <div className='block lg:hidden overflow-y-scroll bg-white z-20'>
        <RouteDetails handleMouseDown={handleMouseDown} bottomHeight={bottomHeight} />
      </div>
    </div>
  );
}

export default HomePage;
