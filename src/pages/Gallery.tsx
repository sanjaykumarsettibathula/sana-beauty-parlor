import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Gallery() {
  // We'll reuse the images we have
  const allImages = [
    { id: 1, src: "/images/gallery-1.png", category: "Editorial" },
    { id: 2, src: "/images/gallery-2.png", category: "Makeup" },
    { id: 3, src: "/images/gallery-3.png", category: "Skincare" },
    { id: 4, src: "/images/gallery-4.png", category: "Hair" },
    { id: 5, src: "/images/gallery-1.png", category: "Editorial" },
    { id: 6, src: "/images/gallery-2.png", category: "Makeup" },
    { id: 7, src: "/images/gallery-3.png", category: "Skincare" },
    { id: 8, src: "/images/gallery-4.png", category: "Hair" },
  ];

  const categories = ["All", "Editorial", "Makeup", "Hair", "Skincare"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeCategory === "All"
    ? allImages
    : allImages.filter(img => img.category === activeCategory);

  return (
    <div className="pt-10 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-sans font-bold mb-6"
          >
            The <span className="italic font-serif text-secondary">Gallery</span>
          </motion.h1>
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
                ? "bg-secondary text-background font-bold shadow-[0_0_20px_rgba(216,154,179,0.3)]"
                : "bg-card border border-border text-muted-foreground hover:border-secondary/50"
                }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Masonry Grid Simulation (Columns) */}
        <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group rounded-xl overflow-hidden cursor-pointer mb-4 break-inside-avoid border border-border/50"
                onClick={() => setSelectedImage(img.src)}
              >
                <img src={img.src} alt="Gallery item" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium tracking-wider uppercase text-sm border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl bg-transparent border-none shadow-none p-0">
          <VisuallyHidden>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription>A full screen view of the selected gallery image.</DialogDescription>
          </VisuallyHidden>
          {selectedImage && (
            <img src={selectedImage} alt="Preview" className="w-full h-auto max-h-[90vh] object-contain rounded-xl" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
