import React from 'react';
import { cn } from '@/lib/utils';

type DividerType = 'wave' | 'angle' | 'curve' | 'none';
type DividerPosition = 'top' | 'bottom' | 'both';
type DividerColor = 'white' | 'light' | 'dark';

interface SectionDividerProps {
  type?: DividerType;
  position?: DividerPosition;
  color?: DividerColor;
  height?: number;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  type = 'wave',
  position = 'bottom',
  color = 'white',
  height = 50,
  className,
}) => {
  // Get color based on the color prop
  const getColor = () => {
    switch (color) {
      case 'light':
        return '#F8F9FA';
      case 'dark':
        return '#171928';
      case 'white':
      default:
        return '#FFFFFF';
    }
  };

  // Get SVG path based on the type
  const getSvgPath = () => {
    const fillColor = encodeURIComponent(getColor());
    
    switch (type) {
      case 'wave':
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='${fillColor}'%3E%3C/path%3E%3C/svg%3E")`;
      case 'angle':
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M1200 120L0 16.48 0 0 1200 0 1200 120z' fill='${fillColor}'%3E%3C/path%3E%3C/svg%3E")`;
      case 'curve':
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z' fill='${fillColor}'%3E%3C/path%3E%3C/svg%3E")`;
      case 'none':
      default:
        return 'none';
    }
  };

  // Render top divider
  const renderTopDivider = () => {
    if (type === 'none' || (position !== 'top' && position !== 'both')) return null;
    
    return (
      <div 
        className="w-full absolute top-0 left-0 right-0 overflow-hidden"
        style={{ 
          height: `${height}px`,
          backgroundImage: getSvgPath(),
          backgroundSize: '100% 100%',
          transform: 'rotate(180deg)',
          zIndex: 10,
        }}
      />
    );
  };

  // Render bottom divider
  const renderBottomDivider = () => {
    if (type === 'none' || (position !== 'bottom' && position !== 'both')) return null;
    
    return (
      <div 
        className="w-full absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ 
          height: `${height}px`,
          backgroundImage: getSvgPath(),
          backgroundSize: '100% 100%',
          zIndex: 10,
        }}
      />
    );
  };

  return (
    <div className={cn("relative", className)}>
      {renderTopDivider()}
      {renderBottomDivider()}
    </div>
  );
};

export default SectionDivider;
