import React from "react";
import { useRouter } from "next/router";

interface CardProps {
  children: React.ReactNode;
  contentWidth?: string;
  style?: string;
  href?: string;
}

const CarouselCard = ({ children, contentWidth, style, href }: CardProps) => {
  const router = useRouter();

  return (
    <div
      style={{ width: contentWidth }}
      onClick={() => href && router.push(href)}
      className={`h-36 rounded-lg shadow-sm flex-shrink-0 bg-white p-3 px-5 ${style}`}
    >
      {children}
    </div>
  );
};

export default React.memo(CarouselCard);
