import { ActiveSectionProvider } from "@/context/ActiveSectionContext";
import Navbar from "@/components/Navbar";
import DotNav from "@/components/DotNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import BackgroundEffect from "@/components/BackgroundEffect";
import FluidCursor from "@/components/FluidCursor";
import DecryptionEffect from "@/components/DecryptionEffect";

export default function Home() {
  return (
    <ActiveSectionProvider>
      <DecryptionEffect />
      {/* Visual background layers */}
      <BackgroundEffect />
      
      {/* Interactive elements */}
      <FluidCursor />
      <Navbar />
      <DotNav />

      {/* Main Snap Scrolling Container */}
      <main id="main" className="snap-container relative z-10 w-full no-scrollbar">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </ActiveSectionProvider>
  );
}
