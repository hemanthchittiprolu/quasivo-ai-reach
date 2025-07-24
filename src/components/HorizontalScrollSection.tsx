import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedIndustryCard from './AnimatedIndustryCard';

gsap.registerPlugin(ScrollTrigger);

interface Industry {
  icon: string;
  stat: string;
  title: string;
  description: string;
}

interface HorizontalScrollSectionProps {
  industries: Industry[];
}

const HorizontalScrollSection = ({ industries }: HorizontalScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scrollSection = scrollRef.current;

    // Calculate the scroll distance
    const scrollWidth = scrollSection.scrollWidth - container.clientWidth;

    // Create horizontal scroll animation
    const horizontalScroll = gsap.to(scrollSection, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Parallax effect for cards
    gsap.set(scrollSection.children, {
      transformOrigin: "center center"
    });

    ScrollTrigger.batch(scrollSection.children, {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 50,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        });
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0.7,
          scale: 0.95,
          duration: 0.3
        });
      },
      onEnterBack: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        });
      }
    });

    return () => {
      horizontalScroll.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex items-center gap-8 h-full px-8"
        style={{ width: `${industries.length * 400}px` }}
      >
        {industries.map((industry, index) => (
          <div key={index} className="flex-shrink-0 w-80">
            <AnimatedIndustryCard
              icon={industry.icon}
              stat={industry.stat}
              title={industry.title}
              description={industry.description}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollSection;