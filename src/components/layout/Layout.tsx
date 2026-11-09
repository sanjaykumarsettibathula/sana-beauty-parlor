import { ReactNode, useEffect, useRef } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Lenis from "lenis";
import { useLocation } from "wouter";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        {children}
      </main>
      <Footer />

      {/* Floating WhatsApp Quick Connect Button */}
      <a
        href="https://wa.me/919676642709?text=Hello%2C%20I%20am%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] transition-all hover:scale-110 flex items-center justify-center group"
      >
        <WhatsAppIcon size={26} className="text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-semibold text-sm pl-0 group-hover:pl-2">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
