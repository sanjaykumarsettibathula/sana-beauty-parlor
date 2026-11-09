import { Hero } from "@/components/sections/Hero";
import { ServicesCarousel } from "@/components/sections/ServicesCarousel";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { InspirationGallery } from "@/components/sections/InspirationGallery";
import { Cta } from "@/components/sections/Cta";

export function Home() {
  return (
    <>
      <Hero />
      <ServicesCarousel />
      <BeforeAfter />
      <Features />
      <Testimonials />
      <InspirationGallery />
      <Cta />
    </>
  );
}
