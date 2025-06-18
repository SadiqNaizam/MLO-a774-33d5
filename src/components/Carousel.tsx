import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarouselSlide {
  id: string | number;
  imageUrl?: string; // Optional image
  title: string;
  description?: string;
  link: string; // Link for the call to action
  category?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 5000, stopOnInteraction: false },
}) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  console.log("Rendering Carousel with slides:", slides.length);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No featured content available.</div>;
  }

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0 p-1" key={slide.id}>
            <Card className="w-full h-full flex flex-col md:flex-row overflow-hidden">
              {slide.imageUrl && (
                <div className="md:w-1/2 h-64 md:h-auto">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails
                  />
                </div>
              )}
              <div className={`flex flex-col p-6 justify-center ${slide.imageUrl ? 'md:w-1/2' : 'w-full'}`}>
                <CardHeader className="p-0 mb-2">
                  {slide.category && <p className="text-sm text-muted-foreground mb-1">{slide.category}</p>}
                  <CardTitle className="text-2xl lg:text-3xl">{slide.title}</CardTitle>
                </CardHeader>
                {slide.description && (
                  <CardContent className="p-0 mb-4">
                    <CardDescription className="line-clamp-3">{slide.description}</CardDescription>
                  </CardContent>
                )}
                <CardFooter className="p-0">
                  <Link to={slide.link}>
                    <Button>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            </Card>
          </div>
        ))}
      </div>
      {/* Optional: Add Embla prev/next buttons and dots for navigation */}
    </div>
  );
};

export default Carousel;