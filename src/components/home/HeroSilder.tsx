import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./HeroSlider.module.css";

const slides = [
  {
    desktop: "/images/slider5.png",
    mobile: "/images/slider10.png",
  },
   {
    desktop: "/images/slider5.png",
    mobile: "/images/slider1.png",
  },
   {
    desktop: "/images/slider5.png",
    mobile: "/images/slider2.png",
  },
  {
      desktop: "/images/slider4.png",
    mobile: "/assets/insta4.png",
  },
  {
      desktop: "/images/slider4.png",
    mobile: "/assets/insta2.png",
  },
];

export default function HeroSilder() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3500 })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <div className={styles.heroWrapper}>
      <div ref={emblaRef} className={styles.embla}>
        <div className={styles.emblaContainer}>
          {slides.map((slide, index) => (
            <div className={styles.emblaSlide} key={index}>
              {/* Responsive Image */}
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={slide.mobile}
                />
                <img
                  src={slide.desktop}
                  alt="Jewellery Banner"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </picture>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === selectedIndex ? styles.active : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
