import Dock from './dock';
import Navbar from './navbar';

const Desktop = () => {
  return (
    <main className="relative h-screen overflow-hidden bg-gray-100">
      <Navbar />
      <section className="h-full w-full">{/* Content */}</section>
      <Dock />
    </main>
  );
};

export default Desktop;
