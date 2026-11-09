import { motion } from "framer-motion";
import { BeforeAfter } from "@/components/sections/BeforeAfter";

export function Transformations() {
  return (
    <div className="pt-10 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-sans font-bold mb-6"
          >
            Real <span className="italic font-serif text-primary">Transformations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Witness the artistry of our master stylists. Drag the sliders to see the incredible before and after results.
          </motion.p>
        </div>

        <div className="flex flex-col gap-24">
          <BeforeAfter />
        </div>
      </div>
    </div>
  );
}
