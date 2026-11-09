import { motion } from "framer-motion";

export function About() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/gallery-1.png" alt="Background" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold mb-6"
          >
            The <span className="italic font-serif text-primary">Sana</span> Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Founded on the belief that beauty is an art form, Sana Beauty Parlor has redefined the luxury salon experience.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-secondary">Our Mission</h2>
            <p className="text-2xl leading-relaxed italic text-white/90">
              &quot;To empower individuals through transformative artistry, using only the finest products in an environment that whispers absolute luxury and exclusivity.&quot;
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
