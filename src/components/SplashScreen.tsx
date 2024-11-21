import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const images = [
  {
    url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
  }
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isStartingTransition, setIsStartingTransition] = useState(false);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7500);

    const timer = setTimeout(() => {
      setIsStartingTransition(true);
    }, 30000);

    return () => {
      clearInterval(imageInterval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isStartingTransition) {
      const transitionTimer = setTimeout(() => {
        onComplete();
      }, 2500);
      return () => clearTimeout(transitionTimer);
    }
  }, [isStartingTransition, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 w-full h-full bg-black z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: isStartingTransition ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <motion.div
              key={image.url}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ 
                opacity: currentImageIndex === index ? 1 : 0,
                scale: currentImageIndex === index ? 1 : 1.2
              }}
              transition={{ 
                duration: 3.5, 
                ease: "easeInOut",
                scale: {
                  duration: 7.5,
                  ease: "linear"
                }
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${image.url}')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
              </div>
            </motion.div>
          ))}

          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <div className="text-center text-white px-4 max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw]">
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1.5 }}
              >
                <span className="block sm:inline">Bons</span>
                <span className="block sm:inline">Plans</span>
                <span className="block sm:inline">Jerusalem</span>
              </motion.h1>
            </div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-3">
              {images.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-1000 ${
                    currentImageIndex === index ? 'w-12 sm:w-16 bg-white' : 'w-3 sm:w-4 bg-white/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}