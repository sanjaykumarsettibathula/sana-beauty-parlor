import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/transformations", label: "Transformations" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="font-script text-3xl text-white leading-none" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontStyle: 'italic' }}>
            Sana<span className="text-primary">.</span>
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-primary mt-0.5">
            Beauty Parlor
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/booking" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(255,79,139,0.3)] hover:shadow-[0_0_25px_rgba(255,79,139,0.5)]">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} data-testid="button-menu-toggle">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50 p-4 flex flex-col gap-4"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`text-lg font-medium p-2 ${location === link.href ? "text-primary" : "text-muted-foreground"}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/booking" onClick={() => setIsOpen(false)} className="bg-primary text-center hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-semibold mt-2">
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
