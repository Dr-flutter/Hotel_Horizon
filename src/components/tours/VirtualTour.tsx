import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';

interface VirtualTourProps {
  imageUrl: string;
}

export default function VirtualTour({ imageUrl }: VirtualTourProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (containerRef.current && !viewerRef.current) {
      viewerRef.current = new Viewer({
        container: containerRef.current,
        panorama: imageUrl,
        navbar: [
          'zoom',
          'move',
          'fullscreen',
        ],
        defaultZoomLvl: 0,
        touchmoveTwoFingers: true,
        mousewheelCtrlKey: true,
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [imageUrl]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[500px] rounded-lg overflow-hidden"
    />
  );
}