'use client';

import React, { useState, useEffect } from 'react';
import { benefits } from './benefit_data';

const Benefits = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= benefits.length - (visibleCards - 1) ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? benefits.length - visibleCards : prevIndex - 1
    );
  };

  return (
    <section className="bg-black text-white py-16 px-6 md:px-12 mt-8 mb-8">
      <h2 className="text-center text-3xl md:text-4xl font-moranga mb-16">
        Who Benefits from{' '}
        <span className="bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent">
          simplecx
        </span>
        ?
      </h2>
      <div className="overflow-hidden relative m-8">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[100%] sm:w-[49%] md:w-[49%] lg:w-[23%] h-auto px-2"
            >
              <div className="bg-gray-950 rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4 flex-1">
                  <h3 className="font-serif text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs font-light">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button onClick={handlePrevious} className="flex items-center">
          <img
            src="/pre.png"
            alt="Previous"
            className="w-4 h-4 cursor-pointer hover:opacity-80"
          />
        </button>
        <button onClick={handleNext} className="flex items-center ml-9">
          <img
            src="/next.png"
            alt="Next"
            className="w-4 h-4 cursor-pointer hover:opacity-80"
          />
        </button>
      </div>
    </section>
  );
  // return (
  //   <section className="bg-black text-white py-16 px-6 md:px-12 mt-8 mb-8">
  //     <h2 className="text-center text-3xl md:text-4xl font-moranga mb-16">
  //       Who Benefits from{' '}
  //       <span className="bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent">
  //         simplecx
  //       </span>
  //       ?
  //     </h2>
  //     <div className="overflow-hidden relative m-8">
  //       <div
  //         className="flex transition-transform duration-500"
  //         style={{
  //           transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
  //         }}
  //       >
  //         {benefits.map((benefit, index) => (
  //           <div
  //             key={index}
  //             className={`flex-shrink-0 w-[100%] ${
  //               visibleCards > 1
  //                 ? 'sm:w-[49%] md:w-[49%] lg:w-[23%]'
  //                 : 'sm:w-full'
  //             } h-auto px-2`}
  //           >
  //             <div className="bg-gray-950 rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
  //               <img
  //                 src={benefit.image}
  //                 alt={benefit.title}
  //                 className="h-40 w-full object-cover"
  //               />
  //               <div className="p-4 flex-1">
  //                 <h3 className="font-serif text-lg font-semibold mb-2">
  //                   {benefit.title}
  //                 </h3>
  //                 <p className="text-xs font-light">{benefit.description}</p>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //     <div className="flex justify-center mt-10">
  //       <button
  //         onClick={handlePrevious}
  //         className="flex items-center hover:opacity-80"
  //       >
  //         <img
  //           src="/pre.png"
  //           alt="Previous"
  //           className="w-4 h-4 cursor-pointer"
  //         />
  //       </button>
  //       <button
  //         onClick={handleNext}
  //         className="flex items-center ml-9 hover:opacity-80"
  //         type="button"
  //       >
  //         <img src="/next.png" alt="Next" className="w-4 h-4 cursor-pointer" />
  //       </button>
  //     </div>
  //   </section>
  // );
};

export default Benefits;
