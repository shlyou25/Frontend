'use client';

import React from 'react';

const DemoVideo: React.FC = () => (
  <section
    id="demo"
    className="w-full flex flex-col items-center pt-14 pb-20 bg-transparent"
  >
    <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-3">
      Watch the Demo —{' '}
      <span className="font-bold">See the Platform in Action</span>
    </h2>

    <p className="text-center text-gray-700 text-lg mb-10">
      A quick introduction to how our platform works and what to expect inside.
    </p>

    <div className="w-full max-w-6xl mx-auto aspect-video overflow-hidden rounded-3xl shadow-lg bg-black">
      <video
        src="/comingsoon.mp4"
        controls
        preload="metadata"
        playsInline
        className="w-full h-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  </section>
);

export default DemoVideo;
