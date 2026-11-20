'use client';

import Image from 'next/image';

export default function GardenImage() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <Image
        src="/images/garden.png"
        alt="Illustrated garden artwork in Sofia Botechia Hernandes portfolio"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
