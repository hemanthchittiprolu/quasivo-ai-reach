import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from "@/components/ui/button";
import SlidingTiles from "@/components/SlidingTiles";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import quasivoLogo from "@/assets/quasivo-logo.png";

const Index = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const industries = [
    {
      icon: "🏥",
      stat: "99% Accuracy",
      title: "Healthcare",
      description: "AI-powered diagnostics, patient care optimization, and medical research acceleration"
    },
    {
      icon: "💰",
      stat: "Real-time Analysis",
      title: "Finance",
      description: "Fraud detection, algorithmic trading, risk assessment, and financial planning"
    },
    {
      icon: "🛍️",
      stat: "40% Sales Increase",
      title: "Retail & E-commerce",
      description: "Personalized recommendations, inventory management, and customer insights"
    },
    {
      icon: "🏭",
      stat: "60% Efficiency Gain",
      title: "Manufacturing",
      description: "Predictive maintenance, quality control, and supply chain optimization"
    },
    {
      icon: "🚗",
      stat: "Smart Navigation",
      title: "Transportation",
      description: "Route optimization, autonomous systems, and logistics management"
    },
    {
      icon: "📚",
      stat: "Adaptive Learning",
      title: "Education",
      description: "Personalized learning, automated grading, and educational content creation"
    },
    {
      icon: "🌱",
      stat: "30% Yield Increase",
      title: "Agriculture",
      description: "Crop monitoring, yield prediction, and precision farming solutions"
    },
    {
      icon: "🎮",
      stat: "Immersive Experience",
      title: "Entertainment",
      description: "Content recommendation, gaming AI, and creative content generation"
    }
  ];

  useEffect(() => {
    // Animate header elements on load
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    if (titleRef.current) {
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          delay: 0.5,
          ease: "back.out(1.7)" 
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header with Logo */}
      <header ref={headerRef} className="p-6 relative z-10">
        <div className="flex items-center">
          <img 
            src={quasivoLogo} 
            alt="Quasivo" 
            className="h-12 w-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 px-6">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Industries We Serve
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            AI Across All Domains
          </p>
          <p className="text-lg text-foreground/80">
            From healthcare to entertainment, our AI solutions are revolutionizing every industry
          </p>
        </div>

        {/* Sliding Tiles Animation */}
        <SlidingTiles industries={industries} />

        {/* Call to Action */}
        <div className="text-center px-6 py-16">
          <p className="text-lg text-foreground/80 mb-6">
            Don't see your industry? We adapt our AI solutions to any domain.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 text-lg px-8 py-3"
          >
            Contact us for custom solutions →
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
