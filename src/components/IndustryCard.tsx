import { ReactNode } from 'react';

interface IndustryCardProps {
  icon: string;
  stat: string;
  title: string;
  description: string;
  delay: number;
}

const IndustryCard = ({ icon, stat, title, description, delay }: IndustryCardProps) => {
  return (
    <div 
      className="group relative bg-card border border-border rounded-lg p-6 hover:bg-gradient-secondary transition-all duration-500 hover:shadow-glow hover:border-primary/50 animate-flow-right hover:scale-105"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl animate-float" style={{ animationDelay: `${delay + 200}ms` }}>
            {icon}
          </span>
          <div className="bg-gradient-primary bg-clip-text text-transparent font-bold text-sm">
            {stat}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
    </div>
  );
};

export default IndustryCard;