import { motion } from "framer-motion";
import { Link } from "wouter";

export function Cta() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/images/gallery-1.png" alt="Background" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold mb-6">
            Ready For Your <br />
            <span className="italic font-serif text-primary">Transformation?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book your session today and step into a world of unparalleled luxury and artistry.
          </p>
          <Link
            href="/booking"
            className="inline-block px-10 py-5 bg-primary text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,79,139,0.5)] relative overflow-hidden group"
          >
            <span className="relative z-10">Book Your Session</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
