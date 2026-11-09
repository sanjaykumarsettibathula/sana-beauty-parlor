import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function InspirationGallery() {
  const images = [
    { src: "/images/gallery-1.png", title: "Editorial Look", span: "md:col-span-2 md:row-span-2" },
    { src: "/images/gallery-2.png", title: "Flawless Base", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/gallery-3.png", title: "Premium Skincare", span: "md:col-span-1 md:row-span-2" },
    { src: "/images/gallery-4.png", title: "Sleek Styling", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/service-nails.png", title: "Nail Art", span: "md:col-span-1 md:row-span-1" },
    { src: "/images/service-bridal.png", title: "Bridal Artistry", span: "md:col-span-1 md:row-span-1" },
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-sans font-bold mb-4"
          >
            Inspiration <span className="italic font-serif text-secondary">Gallery</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            A curated collection of our finest work, showcasing the pinnacle of modern luxury beauty.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative group rounded-2xl overflow-hidden cursor-pointer ${img.span}`}
              onClick={() => setSelectedImage(img.src)}
            >
              <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Plus />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
          <VisuallyHidden>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription>A full screen view of the selected gallery image.</DialogDescription>
          </VisuallyHidden>
          {selectedImage && (
            <img src={selectedImage} alt="Preview" className="w-full h-auto max-h-[85vh] object-contain rounded-xl" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
