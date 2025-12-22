import Collections from "@/components/home/Collections";
import HeroSilder from "@/components/home/HeroSilder";
import InstagramReels from "@/components/home/InstagramView";
import WhyChooseUs from "@/components/home/ChooseUsSection";
import PremiumProductSlider from "@/components/product/PremiumProductSlider";
import LuxuryStats from "@/components/ui/LuxuryStats";
import CustomerReviewLuxury from "@/components/home/CustomerReviewLuxury";


export default function Home() {
  return (
  <>
    
   <HeroSilder />
   <Collections />
   <InstagramReels />
   <PremiumProductSlider />
   <WhyChooseUs />
   <LuxuryStats />
   <CustomerReviewLuxury />
 
    </>
 
    
  );
}
