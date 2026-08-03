import Image from 'next/image';

import { Inter } from 'next/font/google';
import Link from 'next/link';
const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Navbar() {
  const getDatetime = (): string => {
    const date = new Date();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const dayName = days[date.getDay()];
    const dayNum = date.getDate().toString().padStart(2, ' ');
    const monthName = months[date.getMonth()];

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${dayName} ${dayNum} ${monthName} ${hours}:${minutes}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-8 bg-white backdrop-blur-md select-none">
      <div className="flex h-full items-center justify-between px-4 text-sm">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="transition-all duration-200 hover:opacity-60"
          >
            <Image
              alt="Apple Logo"
              src="/images/apple-logo.png"
              width={12}
              height={12}
            />
          </Link>

          <nav className="hidden md:flex gap-5">
            <span className="transition-all duration-200 hover:opacity-60">
              Finder
            </span>
            <span className="transition-all duration-200 hover:opacity-60">
              File
            </span>
            <span className="transition-all duration-200 hover:opacity-60">
              Edit
            </span>
            <span className="transition-all duration-200 hover:opacity-60">
              View
            </span>
            <span className="transition-all duration-200 hover:opacity-60">
              Go
            </span>
            <span className="transition-all duration-200 hover:opacity-60">
              Window
            </span>
            <span className="transition-all duration-200 hover:opacity-60">
              Help
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span>{getDatetime()}</span>
        </div>
      </div>
    </header>
  );
}
