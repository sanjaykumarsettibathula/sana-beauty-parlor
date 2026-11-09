import { Link } from "wouter";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Footer() {
  return (
    <footer className="bg-background/95 border-t border-border/50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex flex-col mb-6">
              <span className="font-script text-4xl text-white leading-none" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontStyle: 'italic' }}>
                Sana<span className="text-primary">.</span>
              </span>
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-primary mt-1">
                Beauty Parlor
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              An ultra-premium beauty experience crafted to perfection. Step into a world of luxury, precision, and unforgettable transformations.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/919676642709"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#25D366] hover:border-[#25D366] transition-colors"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Hair Styling</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Skin Treatments</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Nail Art</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Bridal Makeup</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/transformations" className="text-muted-foreground hover:text-primary transition-colors">Transformations</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
