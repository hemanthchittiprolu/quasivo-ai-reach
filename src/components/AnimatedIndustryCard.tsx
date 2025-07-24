import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IndustryCardProps {
  icon: string;
  stat: string;
  title: string;
  description: string;
  index: number;
}

const AnimatedIndustryCard = ({ icon, stat, title, description, index }: IndustryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Initial state - cards start from the right
    gsap.set(cardRef.current, {
      x: 100,
      opacity: 0,
      scale: 0.8
    });

    // Animate in with staggered timing
    gsap.to(cardRef.current, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: index * 0.15,
      ease: "back.out(1.7)",
    });

    // Continuous floating animation
    gsap.to(cardRef.current, {
      y: -10,
      duration: 2 + (index * 0.3),
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: index * 0.2
    });

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(cardRef.current, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        scale: 1,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const element = cardRef.current;
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="relative bg-card border border-border rounded-lg p-6 cursor-pointer overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl block transform transition-transform duration-300 hover:scale-110">
            {icon}
          </span>
          <div className="bg-gradient-primary bg-clip-text text-transparent font-bold text-sm">
            {stat}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default AnimatedIndustryCard;