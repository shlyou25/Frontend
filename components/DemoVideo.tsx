import React from 'react';

const DemoVideo: React.FC = () => (
  <section className="w-full flex flex-col items-center pt-14 pb-20 bg-transparent">
    <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-3">
      Watch the Demo — <span className="font-bold">See the Platform in Action</span>
    </h2>
    <p className="text-center text-gray-700 text-lg mb-10">
      A quick introduction to how our platform works and what to expect inside.
    </p>
    <div className="w-full max-w-6xl mx-auto aspect-video overflow-hidden rounded-3xl shadow-lg">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/pRpeEdMmmQ0?si=ZXWS4xCSFKGuR0C6"
        title="Platform Demo Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-none"
      />
    </div>
  </section>
);

export default DemoVideo;
