import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';


function Details() {
  const [copied, setCopied] = useState(false);
  const [driver,setDriver] = useState("");

  useEffect(()=>{
    fetch("https://roadlyne.xyz/api/v1/tracking/share/live?token=Q0cxMEJMNTY3OC10cmFjay04NjQwMA==")
    .then(res=>res.json())
    .then(data=>setDriver(data.data.data.driver))
  },[]);

  const copyToClipboard = () => {
    const textToCopy = "9285581104"; // The driver number you want to copy
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true); // Show notification

      // Hide notification after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <>
      <section className='flex flex-col gap-2 lg:pb-10 pb-2 border-b-[1px] relative'>
        <div>
          <img src={logo} alt="logo" width={120} height={60}/>
        </div>

        <div>
          <div className='flex items-center relative justify-between lg:justify-start'>
            <p className='text-gray-400 text-[0.8rem] lg:border-r-[1px] pr-2 border-gray-400'>
              Vehicle: <span className='text-black'>CG04PV9088</span>
            </p>
            <a href="#" className='text-gray-400 text-[0.8rem] hidden lg:block ps-2'>
              Driver: <span className='text-black'>{driver.mob}</span>
              <i
                className="fa-regular fa-clone text-[blue] text-lg cursor-pointer ms-2"
                onClick={copyToClipboard} // Copy function on click
              ></i>
            </a>

            {/* Show 'Link Copied' Notification */}
            {copied && (
              <div className="absolute top-[-20px] right-[-310%] transform bg-black text-white text-xs py-1 px-3 rounded shadow-lg animate-fade-in z-40">
                ✅ Link Copied!
              </div>
            )}

            <div className='block lg:hidden'>
              <a href={`tel:+91${driver.mob}`} className='text-[green] py-2 px-3 rounded-full border border-gray flex gap-3 items-center'>
                <i className="fa-solid fa-phone"></i>
                <span>Driver</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Details;
