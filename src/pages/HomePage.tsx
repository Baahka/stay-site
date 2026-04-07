import { HeroSection } from '@/sections/HeroSection';
import { CategoriesSection } from '@/sections/CategoriesSection';
import { FeaturedProductsSection } from '@/sections/FeaturedProductsSection';
import { HowItWorksSection } from '@/sections/HowItWorksSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { FAQSection } from '@/sections/FAQSection';
import { SupportSection } from '@/sections/SupportSection';
import { FooterSection } from '@/sections/FooterSection';

export function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <SupportSection />
      <FooterSection />
    </main>
  );
}
