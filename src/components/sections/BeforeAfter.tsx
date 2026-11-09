import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleDrag = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startDrag = () => {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <section className="py-24 bg-[#18070d]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-sans font-bold mb-4"
          >
            See the <span className="italic font-serif text-primary">Transformation</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Drag the slider to experience the difference our master artisans create.
          </motion.p>
        </div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative max-w-4xl mx-auto aspect-[4/5] md:aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-border shadow-2xl"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          onTouchMove={handleDrag}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0">
            <img src="/images/after.png" alt="After" className="w-full h-full object-cover" draggable={false} />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/10">After</div>
          </div>

          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden border-r-2 border-primary"
            style={{ width: `${sliderPosition}%` }}
          >
            <img src="/images/before.png" alt="Before" className="absolute top-0 left-0 w-full h-full object-cover max-w-none" style={{ width: containerRef.current?.offsetWidth || '100vw' }} draggable={false} />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/10">Before</div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 flex items-center justify-center -ml-4 w-8"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(255,79,139,0.8)] border-2 border-white">
              <div className="flex gap-1">
                <div className="w-0.5 h-3 bg-white rounded-full" />
                <div className="w-0.5 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
