

import Image from 'next/image';
import Link from 'next/link';

const reels = [
  {
    src: '/assets/insta11.png',
    link: 'https://www.instagram.com/reel/DOdy81YgfRF/?igsh=OW15ZXF4ZWg3cnFm', // replace with real link
  },
 
   {
    src:'/assets/insta3.png',
    link: 'https://www.instagram.com/reel/DQb3qtEgTM3/?igsh=MWJ0MjRvM2p3M3hkNA%3D%3D', // replace with real link
  },
  {
    src: '/assets/insta2.png',
    link: 'https://www.instagram.com/reel/DROz4SjEz-d/?igsh=a3JmajVqZm83eG50',
  },
 {
    src: '/assets/insta4.png',
    link: 'https://www.instagram.com/reel/DPeMPuRAfv-/?igsh=aGN2czA1OGo5OW94', // replace with real link
  },
];

const InstagramReels = () => {
  return (
    <section id="blog" className="w-full py-16 px-4 sm:px-10 bg-[#FCF5F3] text-center relative overflow-hidden">
      {/* Hologram Background Text */}
      <h2 className="text-[10vw] sm:text-[7vw] font-bold text-[#EDDFC6] absolute top-8 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none">
        INSTAGRAM
      </h2>

      {/* Foreground Heading */}
      <div className="relative z-10 mb-4">
        <h3 className="text-3xl sm:text-4xl font-bold text-[#163535] mb-4">
          Follow Us On Instagram
        </h3>
        <p className="text-[#BDC2BE] max-w-xl mx-auto text-base sm:text-lg">
          Stay connected and inspired! Explore our latest jewellery reels, behind-the-scenes shots,
          and exclusive designs. Join our journey of elegance and craftsmanship.
        </p>
      </div>

      {/* Grid of Reels */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 relative z-10">
        {reels.map((reel, index) => (
          <Link
            key={index}
            href={reel.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-lg shadow-md"
          >
            {/* Thumbnail Image */}
            <Image
              src={reel.src}
              alt={`Reel ${index + 1}`}
              width={250}
              height={300}
              className="shadow-md border border-[#D2AB67] rounded-xl object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />

            {/* Instagram Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
              <Image
                src="/assets/instalogo.png" // use white or red insta icon
                alt="Instagram"
                width={50}
                height={50}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InstagramReels;
