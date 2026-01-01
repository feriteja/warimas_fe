"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useState } from "react";
import placeHolder from "../public/images/placeholder-product.png";

type SafeImageProps = ImageProps & {
  fallbackSrc?: StaticImageData;
};

export function SafeImage({
  src,
  fallbackSrc = placeHolder,
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL="/placeholder.png"
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
