import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver not supported, falling back to immediate loading');
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    let observer;
    
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry) {
            setIsIntersecting(entry.isIntersecting);
            if (entry.isIntersecting && !hasIntersected) {
              setHasIntersected(true);
            }
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
          ...options,
        }
      );

      observer.observe(target);
    } catch (error) {
      console.warn('IntersectionObserver failed, falling back to immediate loading:', error);
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    return () => {
      try {
        if (observer && target) {
          observer.unobserve(target);
        }
      } catch (error) {
        console.warn('Error cleaning up IntersectionObserver:', error);
      }
    };
  }, [hasIntersected, options]);

  return { targetRef, isIntersecting, hasIntersected };
};