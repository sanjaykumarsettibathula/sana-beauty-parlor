import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { servicesData } from "@/data/services";
import { Link } from "wouter";
import { Clock, Star } from "lucide-react";

export function ServicesCarousel() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-sans font-bold mb-4">Elite Services</h2>
            <p className="text-muted-foreground max-w-lg">
              Curated treatments performed by master artisans using the world's most exclusive products.
            </p>
          </div>
          <Link href="/services" className="hidden md:block text-primary hover:text-primary/80 transition-colors uppercase tracking-widest text-sm font-semibold">
            View All Services →
          </Link>
        </div>
      </div>

      <div className="pl-4 md:pl-[calc((100vw-1536px)/2+2rem)] xl:pl-[calc((100vw-1280px)/2+2rem)] 2xl:pl-[calc((100vw-1536px)/2+2rem)]">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={24}
          freeMode={true}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4.2 },
          }}
          modules={[FreeMode]}
          className="pb-12"
        >
          {servicesData.map((service, idx) => (
            <SwiperSlide key={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative rounded-2xl overflow-hidden glassmorphism bg-card border border-border transition-all hover:border-primary/50 hover:shadow-[0_10px_40px_rgba(255,79,139,0.15)] flex flex-col h-full"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
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
                <div className="p-6 flex-1 flex flex-col justify-between relative z-20 bg-gradient-to-t from-card via-card/90 to-transparent -mt-20 pt-16">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Clock size={14} /> {service.duration} min</span>
                      <span>•</span>
                      <span className="text-primary font-semibold">₹{service.price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <Link href={`/booking?service=${service.id}`} className="block w-full py-3 text-center border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-medium mt-4">
                    Book Now
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
