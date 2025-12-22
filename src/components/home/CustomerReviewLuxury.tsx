import { useEffect, useState } from "react";
import Image from "next/image";

type Review = {
  id: number;
  reviewer_name: string;
  reviewer_picture_url: string;
  rating: number;
  text: string;
};

type ApiResponse = {
  status: string;
  result: {
    data: Review[];
  };
};

export default function CustomerReviewLuxury() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          "https://service-reviews-ultimate.elfsight.com/data/reviews?uris%5B%5D=ChIJTcusshwWCTkR3H4M7RpRF9Y&filter_content=text_required&min_rating=5&page_length=100&order=date"
        );
        const data: ApiResponse = await res.json();
        setReviews(data.result.data.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  if (!reviews.length) return null;

  return (
    <section className="py-28 bg-[#faf7f3]">
      {/* HEADER */}
      <div className="text-center mb-20">
        <p className="text-xs tracking-[0.35em] uppercase text-[#c9a24d] mb-4">
          Testimonials
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-[#4a0f0b]">
          Words That Carry Trust
        </h2>

        {/* GOLD LINE */}
        <div className="mt-6 flex justify-center">
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#c9a24d] to-transparent" />
        </div>
      </div>

      {/* SCROLL AREA */}
      <div className="relative">
        <div
          className="
            flex gap-8 px-6
            overflow-x-auto
            scroll-smooth
            snap-x snap-mandatory
            scrollbar-hide
          "
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="
                snap-center
                flex-shrink-0
                w-[85%] sm:w-[55%] lg:w-[32%]
              "
            >
              <div className="relative bg-white rounded-[1.8rem] px-7 pt-10 pb-8 border border-[#efe4d6] shadow-md hover:shadow-xl transition-shadow duration-500">
                {/* Quote */}
                <span className="absolute top-5 right-6 text-4xl text-[#e7d8c6]">
                  “
                </span>

                {/* Reviewer */}
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={review.reviewer_picture_url}
                    alt={review.reviewer_name}
                    width={52}
                    height={52}
                    className="rounded-full object-cover border border-[#c9a24d]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#4a0f0b]">
                      {review.reviewer_name}
                    </p>
                    <div className="text-[#d4af37] text-xs">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-600 text-sm leading-relaxed italic line-clamp-4">
                  “{review.text}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {/* <div className="mt-24 text-center">
        <button
          className="
            px-10 py-3 rounded-full
            bg-gradient-to-r from-yellow-400 via-[#4a0f0b] to-yellow-600
            text-white font-medium shadow-xl
            hover:scale-105 transition-transform duration-300
          "
        >
          Visit Our Store
        </button>
      </div> */}
    </section>
  );
}
