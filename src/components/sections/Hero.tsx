import { motion } from "framer-motion";
import { Link } from "wouter";

export function Hero() {
  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section className="relative min-h-screen -mt-20 pt-28 pb-12 sm:pb-16 flex items-center justify-center overflow-hidden hero-bg">
      {/* Soft translucent tint so the parlor image shines through clearly without being too dim */}
      <div className="absolute inset-0 bg-black/35 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background/90 z-0" />

      {/* Bokeh Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary/20 blur-sm"
            style={{
              width: p.size + "px",
              height: p.size + "px",
              left: p.x + "%",
              top: p.y + "%",
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-secondary font-bold tracking-[0.25em] uppercase text-xs sm:text-sm mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          The Ultimate Beauty Destination
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold leading-tight mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        >
          Unveil Your <br />
          <span className="italic font-serif font-normal bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Elegance
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium"
        >
          Premium beauty experiences crafted to perfection. Discover a sanctuary where luxury meets artistry.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="/booking"
            className="px-7 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,79,139,0.4)] text-center text-sm sm:text-base"
            data-testid="link-hero-book"
          >
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="px-7 py-3.5 bg-transparent border border-white/20 text-white rounded-full font-semibold transition-all hover:bg-white/5 hover:border-white/40 text-center text-sm sm:text-base"
            data-testid="link-hero-services"
          >
            Explore Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
