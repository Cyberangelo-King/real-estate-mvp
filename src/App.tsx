import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Discover from "./components/Discover";
import LiveDecayDemo from "./components/LiveDecayDemo";
import HowItWorks from "./components/HowItWorks";
import ForAgents from "./components/ForAgents";
import Footer from "./components/Footer";
import PropertyDetail from "./components/PropertyDetail";
import SavedPage from "./components/SavedPage";

function Home() {
  return (
    <>
      <Hero />
      <LiveDecayDemo />
      <Discover />
      <HowItWorks />
      <ForAgents />
    </>
  );
}

function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // wait a tick for the route's content to mount
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink grain">
      <ScrollToHash />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<PropertyDetail />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}
