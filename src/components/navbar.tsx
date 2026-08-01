import Image from 'next/image';
import Link from 'next/link';

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
          <Link href="/">
            <Image
              alt="Apple Logo"
              src="/images/apple-logo.png"
              width={14}
              height={14}
            />
          </Link>

          <nav className="hidden md:flex gap-5">
            <span>Finder</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
            <span>Window</span>
            <span>Help</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span>{getDatetime()}</span>
        </div>
      </div>
    </header>
  );
}
