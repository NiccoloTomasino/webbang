import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { CrmShowcase } from "@/components/sections/CrmShowcase";
import { WhyUs } from "@/components/sections/WhyUs";
import { Offer } from "@/components/sections/Offer";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { MobileOfferBar } from "@/components/sections/MobileOfferBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Offer />
        <CrmShowcase />
        <WhyUs />
        <Process />
        <Testimonials />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <MobileOfferBar />
    </>
  );
}
