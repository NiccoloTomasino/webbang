import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ChiSiamo from '@/components/sections/ChiSiamo';
import Servizi from '@/components/sections/Servizi';
import FormContatti from '@/components/sections/FormContatti';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ChiSiamo />
        <Servizi />
        <FormContatti />
      </main>
      <Footer />
    </>
  );
}