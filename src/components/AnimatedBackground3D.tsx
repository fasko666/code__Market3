import { useEffect, useState } from 'react';

interface Shape {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  type: 'sphere' | 'cube' | 'ring' | 'pyramid';
}

const AnimatedBackground3D = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: Shape[] = [];
      const types: Shape['type'][] = ['sphere', 'cube', 'ring', 'pyramid'];
      
      for (let i = 0; i < 12; i++) {
        newShapes.push({
          id: i,
          size: Math.random() * 60 + 30,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 10,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  const renderShape = (shape: Shape) => {
    const baseStyle = {
      width: shape.size,
      height: shape.size,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      animationDelay: `${shape.delay}s`,
      animationDuration: `${shape.duration}s`,
    };

    switch (shape.type) {
      case 'sphere':
        return (
          <div
            key={shape.id}
            className="absolute rounded-full animate-float3D opacity-20"
            style={{
              ...baseStyle,
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
              boxShadow: '0 0 40px hsl(var(--primary) / 0.3), inset -10px -10px 30px hsl(var(--primary) / 0.2)',
            }}
          />
        );
      case 'cube':
        return (
          <div
            key={shape.id}
            className="absolute animate-spin3D opacity-15"
            style={{
              ...baseStyle,
              background: 'linear-gradient(45deg, hsl(var(--primary)) 0%, transparent 100%)',
              borderRadius: '8px',
              border: '2px solid hsl(var(--primary) / 0.3)',
            }}
          />
        );
      case 'ring':
        return (
          <div
            key={shape.id}
            className="absolute rounded-full animate-pulse3D opacity-20"
            style={{
              ...baseStyle,
              background: 'transparent',
              border: '3px solid hsl(var(--accent) / 0.4)',
              boxShadow: '0 0 20px hsl(var(--accent) / 0.2)',
            }}
          />
        );
      case 'pyramid':
        return (
          <div
            key={shape.id}
            className="absolute animate-morph opacity-15"
            style={{
              ...baseStyle,
              background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Orbs */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 animate-pulse3D"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-15 animate-float3D"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
          bottom: '20%',
          right: '15%',
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] opacity-10 animate-morph"
        style={{
          background: 'radial-gradient(circle, hsl(263 70% 58%) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 3D Shapes */}
      {shapes.map(renderShape)}

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground3D;
