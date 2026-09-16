import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { MenuShowcase } from "./components/MenuShowcase";
import { OrderTypes } from "./components/OrderTypes";
import { Booking } from "./components/Booking";
import { Loyalty } from "./components/Loyalty";
import { Branches } from "./components/Branches";
import { AppPromo } from "./components/AppPromo";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <MenuShowcase />
        <OrderTypes />
        <Booking />
        <Loyalty />
        <Branches />
        <AppPromo />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
