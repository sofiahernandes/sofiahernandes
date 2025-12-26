"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { personalImages } from "@/lib/personal-images"

export default function ScaleCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  console.log("current :", current);
  
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  
  return (
    <div className="mx-auto max-w-[750px] py-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="w-full">
          {personalImages.map((item, index) => (
            <CarouselItem key={item.id} className={cn("basis-[58%]", {})}>
              <Card
                className={cn("transition-transform duration-500", {
                  "scale-[0.6]": index !== current - 1,
                })}
              >
                <CardContent className="flex p-0 aspect-square items-center justify-center">
                  <Image className="object-cover w-[100%] rounded-lg" src={item.src} alt={item.alt} width={400} height={400} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-4 flex items-center justify-center gap-2">
        {personalImages.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn("h-3.5 w-3.5 rounded-full border-2", {
              "shadow-md border-primary/50 shadow-primary": current === index + 1,
            })}
          />
        ))}
      </div>
    </div>
  );
}