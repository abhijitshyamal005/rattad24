'use client';

import React, { useState } from 'react';

const VideoPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mb-10 py-10"> 
      {/* Thumbnail or video placeholder */}
      <div
        className="rounded-lg overflow-hidden max-w-5xl w-full bg-black cursor-pointer mt-6"
        onClick={handleOpen}
        style={{
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        }}
      >
        <img
          src="/video-img.png"
          alt="Video Thumbnail"
          className="w-full h-auto rounded-lg"
        />
      </div>




      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="relative rounded-lg overflow-hidden shadow-lg max-w-3xl w-full">
            <iframe
              className="w-full h-[315px] md:h-[560px] rounded-lg"
              src="https://www.youtube.com/embed/wYeusrRpUUM?autoplay=1"
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-2 right-2 text-white bg-gradient-to-r from-[#ea0022] to-[#754de8] hover:bg-red-700 rounded-full p-2"
              onClick={handleClose}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
