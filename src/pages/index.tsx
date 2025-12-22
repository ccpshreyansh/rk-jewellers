import Head from "next/head";
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
      <Head>
        <title>RK Jewellers Buxar - Best Jewellery Shop in Buxar</title>
        <meta name="description" content="RK Jewellers Buxar offers premium gold, silver, and diamond jewelry with exquisite designs." />
        <meta name="keywords" content="RK Jewellers, Raj Kishor Jewellers, Jewellery Buxar, Gold, Silver, Diamond, Rings, Necklaces, Earrings, Premium Jewellery" />
      </Head>

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
