import { useState, useCallback, useRef } from 'react';

export const useThrottledHover = (delay = 100) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    // Clear any pending leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    // If already hovered, don't create new timeout
    if (isHovered) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set hover state with throttling
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      timeoutRef.current = null;
    }, delay);
  }, [isHovered, delay]);

  const handleMouseLeave = useCallback(() => {
    // Clear enter timeout if user leaves quickly
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Add small delay before removing hover to prevent flickering
    leaveTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      leaveTimeoutRef.current = null;
    }, 50);
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  }, []);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    cleanup
  };
};