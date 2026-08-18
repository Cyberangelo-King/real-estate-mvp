import { useState } from "react";
import { properties } from "./data";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Discover from "./components/Discover";
import HowItWorks from "./components/HowItWorks";
import ForAgents from "./components/ForAgents";
import Footer from "./components/Footer";
import PropertyDetail from "./components/PropertyDetail";

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = properties.find((p) => p.id === openId) ?? null;

  const goHome = () => {
    setOpenId(null);
    window.scrollTo({ top: 0 });
  };

  const openProperty = (id: string) => {
    setOpenId(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav onHome={goHome} />
      {active ? (
        <PropertyDetail property={active} onBack={goHome} />
      ) : (
        <>
          <Hero />
          <Discover onOpen={openProperty} />
          <HowItWorks />
          <ForAgents />
        </>
      )}
      <Footer />
    </div>
  );
}
