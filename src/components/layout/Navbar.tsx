import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold">LOGO</div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <Link href="#chi-siamo" className="hover:text-gray-600">Chi Siamo</Link>
            <Link href="#contatti" className="hover:text-gray-600">Contattaci</Link>
            <Link href="#servizi" className="hover:text-gray-600">I Nostri servizi</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}