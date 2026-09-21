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
import { getDictionary, getLocale } from "./i18n/dictionaries";
import { getCurrentUser, userDisplayName } from "@/lib/auth";

export default async function Home() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar
        dict={dict.nav}
        locale={locale}
        user={user ? { name: userDisplayName(user) } : null}
      />
      <main className="flex-1">
        <Hero dict={dict.hero} />
        <Features dict={dict.features} />
        <MenuShowcase dict={dict.menu} />
        <OrderTypes dict={dict.orderTypes} />
        <Booking dict={dict.booking} />
        <Loyalty dict={dict.loyalty} />
        <Branches dict={dict.branches} />
        <AppPromo dict={dict.appPromo} />
        <CtaSection dict={dict.cta} />
      </main>
      <Footer dict={dict.footer} />
    </div>
  );
}
