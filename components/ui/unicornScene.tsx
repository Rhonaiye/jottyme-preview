import React, { useEffect, useRef } from 'react';

interface UnicornSceneProps {
  projectId: string;
  width?: string;
  height?: string;
  scale?: number;
  dpi?: number;
  fps?: number;
  className?: string;
  altText?: string;
  lazyLoad?: boolean;
  isVisible?: boolean; // replaces isActive
}

declare global {
  interface Window {
    unicornStudio?: {
      scene?: {
        init: (element: HTMLElement, options?: any) => void;
        destroy: () => void;
      };
    };
  }
}

const UnicornScene: React.FC<UnicornSceneProps> = ({
  projectId,
  width = '100%',
  height = '100%',
  scale = 1,
  dpi = 1,
  fps = 30,
  className = '',
  altText,
  lazyLoad = false,
  isVisible = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneInitialized = useRef(false);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const initializeScene = () => {
      if (window.unicornStudio?.scene && !sceneInitialized.current) {
        try {
          window.unicornStudio.scene.init(containerRef.current!, {
            projectId,
            width,
            height,
            scale,
            dpi,
            fps,
            responsive: true,
            alpha: true,
            background: 'transparent',
          });
          sceneInitialized.current = true;
        } catch (error) {
          console.log('UnicornStudio initialization handled:', error);
        }
      }
    };

    initializeScene();

    const checkInterval = setInterval(() => {
      if (window.unicornStudio?.scene) {
        initializeScene();
        clearInterval(checkInterval);
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(checkInterval), 5000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
      if (sceneInitialized.current && window.unicornStudio?.scene?.destroy) {
        try {
          window.unicornStudio.scene.destroy();
          sceneInitialized.current = false;
        } catch (error) {
          console.log('UnicornStudio cleanup handled:', error);
        }
      }
    };
  }, [isVisible, projectId, width, height, scale, dpi, fps]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      aria-label={altText}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ width, height, background: 'transparent', overflow: 'hidden' }}
    />
  );
};

export default UnicornScene;
