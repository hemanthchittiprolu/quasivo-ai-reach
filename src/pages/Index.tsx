import { Button } from "@/components/ui/button";
import IndustryCard from "@/components/IndustryCard";
import quasivoLogo from "@/assets/quasivo-logo.png";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="p-6">
        <div className="flex items-center">
          <img 
            src={quasivoLogo} 
            alt="Quasivo" 
            className="h-12 w-auto animate-glow-pulse"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-flow-right">
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

          {/* Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {industries.map((industry, index) => (
              <IndustryCard
                key={index}
                icon={industry.icon}
                stat={industry.stat}
                title={industry.title}
                description={industry.description}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center animate-flow-right" style={{ animationDelay: '800ms' }}>
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
        </div>
      </main>
    </div>
  );
};

export default Index;
