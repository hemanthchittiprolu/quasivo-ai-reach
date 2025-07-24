import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface Industry {
  icon: string;
  stat: string;
  title: string;
  description: string;
}

interface IndustryTileProps {
  industry: Industry;
  position: [number, number, number];
  index: number;
}

const IndustryTile = ({ industry, position, index }: IndustryTileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Circular rotation around Y axis
      const time = state.clock.getElapsedTime();
      const radius = 8;
      const speed = 0.3;
      
      meshRef.current.position.x = Math.cos(time * speed + (index * Math.PI * 2) / 8) * radius;
      meshRef.current.position.z = Math.sin(time * speed + (index * Math.PI * 2) / 8) * radius;
      meshRef.current.position.y = Math.sin(time * 0.5 + index) * 2; // Floating up and down
      
      // Make tiles face the center
      meshRef.current.lookAt(0, meshRef.current.position.y, 0);
      
      // Add slight rotation for dynamic effect
      meshRef.current.rotation.z = Math.sin(time + index) * 0.1;
    }
  });

  useEffect(() => {
    if (htmlRef.current) {
      // Staggered entrance animation
      gsap.fromTo(htmlRef.current, 
        { opacity: 0, scale: 0.5, y: 50 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [index]);

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[4, 5]} />
      <meshStandardMaterial transparent opacity={0} />
      
      <Html
        transform
        occlude
        position={[0, 0, 0.1]}
        style={{
          width: '320px',
          height: '200px',
          pointerEvents: 'auto'
        }}
      >
        <div 
          ref={htmlRef}
          className="w-80 h-48 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-gradient-secondary transition-all duration-500 hover:shadow-glow hover:border-primary/50 group cursor-pointer"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl block transform group-hover:scale-110 transition-transform duration-300">
                {industry.icon}
              </span>
              <div className="bg-gradient-primary bg-clip-text text-transparent font-bold text-xs">
                {industry.stat}
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {industry.title}
            </h3>
            
            <p className="text-muted-foreground text-xs leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 line-clamp-3">
              {industry.description}
            </p>
          </div>
          
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
        </div>
      </Html>
    </mesh>
  );
};

interface CircularTiles3DProps {
  industries: Industry[];
}

const Scene = ({ industries }: { industries: Industry[] }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Industry Tiles in circular formation */}
      {industries.map((industry, index) => (
        <IndustryTile
          key={index}
          industry={industry}
          position={[0, 0, 0]} // Initial position, will be animated
          index={index}
        />
      ))}
      
      {/* Controls for interaction */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        autoRotate={false}
      />
    </>
  );
};

const CircularTiles3D = ({ industries }: CircularTiles3DProps) => {
  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene industries={industries} />
      </Canvas>
    </div>
  );
};

export default CircularTiles3D;