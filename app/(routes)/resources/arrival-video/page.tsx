import React from "react";

const ArrivalVideo = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Mohan Arrival Area Introduction Video
        </h1>
      </div>
      <div className="py-12 bg-gray-800 text-white text-center">
        <h2 className="text-3xl mb-4">Welcome Video</h2>
        <div className="flex justify-center my-8">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/L-vXWTJN0BA?si=p4uwMZajGRx7Go3Z"
            title="YouTube video player"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; full-screen"
           
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ArrivalVideo;
