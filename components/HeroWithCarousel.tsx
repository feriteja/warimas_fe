"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const images = [
  "/banner/banner_1.png",
  "/banner/banner_2.png",
  "/banner/banner_3.png",
];

export default function HeroWithCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true, // Enables looping
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div className="flex flex-col mx-auto   h-screen">
      {/* Carousel Section */}
      <div className="w-full  relative h-64 md:h-full">
        <div ref={sliderRef} className="keen-slider h-full">
          {images.map((src, i) => (
            <div
              key={i}
              className="keen-slider__slide relative flex items-center justify-center bg-black"
            >
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                fill
                className="h-full w-full object-fill xl:object-cover"
              />
            </div>
          ))}
        </div>

        {/* Nav Buttons */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === i ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Promotion Section */}
      <div className="w-full  flex items-center justify-center p-8 md:p-12 bg-gray-50">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold">Featured Product</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Discover our latest arrival – stylish, durable, and perfect for
            every occasion.
          </p>
          <button className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
