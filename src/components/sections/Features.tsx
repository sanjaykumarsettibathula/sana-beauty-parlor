import { motion } from "framer-motion";
import { Award, Gem, Sparkles, Heart } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Certified Experts",
      description: "Our master artisans are globally trained and continuously educated in the latest techniques."
    },
    {
      icon: <Gem className="w-8 h-8 text-primary" />,
      title: "Premium Products",
      description: "We use only the most exclusive, high-performance luxury brands for your hair and skin."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Luxury Experience",
      description: "From champagne on arrival to ergonomic seating, every detail is designed for your comfort."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Personalized Care",
      description: "Every service begins with a comprehensive consultation to tailor the result to you."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section className="py-24 bg-background relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-sans font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We don't just provide services; we craft unforgettable experiences.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="bg-card border border-border p-8 rounded-2xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="mb-6 w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
