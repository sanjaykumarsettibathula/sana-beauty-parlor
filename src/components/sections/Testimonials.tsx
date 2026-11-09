import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Isabella V.",
      role: "Bride",
      content: "The level of artistry at Sana Beauty Parlor is unmatched. My bridal makeup remained flawless for 14 hours. It wasn't just a service, it was a serene, luxurious experience on my most stressful day.",
      rating: 5
    },
    {
      name: "Sarah M.",
      role: "Regular Client",
      content: "I've been to luxury salons in Paris and New York, and Sana Beauty Parlor rivals them all. The color work is precise, and the ambiance makes you want to stay all day.",
      rating: 5
    },
    {
      name: "Victoria H.",
      role: "Fashion Editor",
      content: "When I need my hair to look editorial-ready, this is the only place I trust. Their attention to detail and understanding of modern aesthetics is phenomenal.",
      rating: 5
    }
  ];

  return (
    <section className="py-32 bg-[#12050b] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-sans font-bold mb-4"
          >
            Client <span className="italic font-serif text-secondary">Stories</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
              <div className="flex gap-1 mb-6">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-lg text-muted-foreground italic mb-8 leading-relaxed">
                "{test.content}"
              </p>
              <div>
                <h4 className="font-bold text-white">{test.name}</h4>
                <p className="text-sm text-secondary">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
