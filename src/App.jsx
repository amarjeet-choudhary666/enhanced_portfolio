import { useEffect } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import CustomCursor from "@/components/fx/CustomCursor";
import ParticleBackground from "@/components/fx/ParticleBackground";
import { installPointer } from "@/lib/pointer";

/**
 * Sections are imported directly rather than lazily. Together they are only
 * ~7 KB gz — splitting them would buy nothing and cost real problems: the
 * scroll-spy observer would find no section elements on first paint, and the
 * Suspense placeholder would shift layout as each chunk resolved.
 *
 * The weight worth splitting is three.js (~128 KB gz), and that is handled
 * inside ParticleBackground with a post-idle dynamic import.
 */
export default function App() {
  // One pointer listener for the entire site, installed once.
  useEffect(() => installPointer(), []);

  return (
    // reducedMotion="user" makes framer strip transform and layout animation
    // from every m.* component automatically, instead of auditing each one.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        {/* Fixed behind every section, so the depth carries through the page. */}
        <ParticleBackground />
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Contact />
        </main>

        <Footer />
      </LazyMotion>
    </MotionConfig>
  );
}
