'use client';

import Image from 'next/image';

export default function HomeImage() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <Image
        src="/images/home.png"
        alt="Home"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
