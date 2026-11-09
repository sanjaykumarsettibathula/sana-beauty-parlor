import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/data/services";
import { Link } from "wouter";
import { Clock, Star } from "lucide-react";

export function Services() {
  const categories = ["All", ...Array.from(new Set(servicesData.map(s => s.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = activeCategory === "All"
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  return (
    <div className="pt-10 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-sans font-bold mb-6"
          >
            Our <span className="italic font-serif text-primary">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover our curated menu of luxury treatments, designed to elevate your natural beauty.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === cat
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(255,79,139,0.3)]"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50"
                }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden glassmorphism bg-card border border-border transition-all hover:border-primary/50 hover:shadow-[0_10px_40px_rgba(255,79,139,0.15)] flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={14} className="text-primary fill-primary" />
                    <span className="text-sm font-semibold">{service.rating}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold">{service.name}</h3>
                      <span className="text-primary font-semibold text-lg">₹{service.price.toLocaleString("en-IN")}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                      <Clock size={16} className="text-secondary" />
                      <span>{service.duration} minutes</span>
                    </div>
                  </div>
                  <Link href={`/booking?service=${service.id}`} className="block w-full py-3 text-center bg-transparent border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-medium">
                    Book Appointment
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
