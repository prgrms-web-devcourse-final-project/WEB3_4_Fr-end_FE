import Image from 'next/image';
import React from 'react';

export default function MainBanner() {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-screen h-[700px] z-[-1]">
        <Image
          src="/main/banner.jpg"
          alt="hero image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="h-[1000px]" />
    </div>
  );
}
