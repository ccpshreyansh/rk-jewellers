// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#d4af37" />

        {/* Global SEO / Meta Tags */}
        <meta name="description" content="RK Jewellers Buxar - Best jewellery shop in Buxar offering gold, silver, diamond, and premium collections." />
        <meta name="keywords" content="RK Jewellers, Raj Kishor Jewellers, Jewellery Buxar, Gold, Silver, Diamond, Rings, Necklaces, Earrings, Premium Jewellery" />
        <meta name="author" content="RK Jewellers Buxar" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="RK Jewellers Buxar - Best Jewellery Shop in Buxar" />
        <meta property="og:description" content="RK Jewellers Buxar offers premium gold, silver, and diamond jewelry with exquisite designs." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://rajkishorejewellers.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RK Jewellers Buxar - Best Jewellery Shop in Buxar" />
        <meta name="twitter:description" content="Premium jewellery store offering gold, silver, and diamond collections in Buxar." />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
