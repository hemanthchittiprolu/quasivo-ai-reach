import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Industry {
  icon: string;
  stat: string;
  title: string;
  description: string;
}

interface SlidingTilesProps {
  industries: Industry[];
}

const SlidingTiles = ({ industries }: SlidingTilesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    // Duplicate industries for seamless loop
    const duplicatedIndustries = [...industries, ...industries];

    // Continuous horizontal movement for first row (right to left)
    const row1Animation = gsap.to(row1Ref.current, {
      x: "-50%",
      duration: 30,
      ease: "none",
      repeat: -1
    });

    // Continuous horizontal movement for second row (left to right)
    const row2Animation = gsap.to(row2Ref.current, {
      x: "50%",
      duration: 25,
      ease: "none",
      repeat: -1
    });

    // Staggered entrance animation for cards
    gsap.fromTo(
      ".sliding-card",
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

    return () => {
      row1Animation.kill();
      row2Animation.kill();
    };
  }, [industries]);

  const renderCard = (industry: Industry, index: number) => (
    <div
      key={index}
      className="sliding-card flex-shrink-0 w-80 mx-4 relative bg-card border border-border rounded-lg p-6 hover:bg-gradient-secondary transition-all duration-500 hover:shadow-glow hover:border-primary/50 group"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl block transform group-hover:scale-110 transition-transform duration-300">
            {industry.icon}
          </span>
          <div className="bg-gradient-primary bg-clip-text text-transparent font-bold text-sm">
            {industry.stat}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {industry.title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
          {industry.description}
        </p>
      </div>
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
    </div>
  );

  const duplicatedIndustries = [...industries, ...industries];

  return (
    <div ref={containerRef} className="overflow-hidden py-16">
      {/* First row - moving right to left */}
      <div className="mb-8">
        <div
          ref={row1Ref}
          className="flex"
          style={{ width: `${duplicatedIndustries.length * 320}px` }}
        >
          {duplicatedIndustries.map((industry, index) => renderCard(industry, index))}
        </div>
      </div>

      {/* Second row - moving left to right */}
      <div>
        <div
          ref={row2Ref}
          className="flex"
          style={{ 
            width: `${duplicatedIndustries.length * 320}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {duplicatedIndustries.slice().reverse().map((industry, index) => renderCard(industry, index + duplicatedIndustries.length))}
        </div>
      </div>
    </div>
  );
};

export default SlidingTiles;