'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { usePathname } from 'next/navigation';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationProgress, setNavigationProgress] = useState(0);

  const progressIntervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const isCleaningUpRef = useRef(false);
  const lastPathnameRef = useRef(null);
  const pathname = usePathname();

  const clearTimers = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    let progress = 0;
    progressIntervalRef.current = setInterval(() => {
      if (progress < 30) progress += Math.random() * 8 + 2;
      else if (progress < 60) progress += Math.random() * 5 + 1;
      else if (progress < 85) progress += Math.random() * 3 + 0.5;
      else progress += Math.random() * 1;

      if (progress > 92) progress = 92;
      setNavigationProgress(progress);
    }, 150);
  }, []);

  const startNavigation = useCallback(() => {
    if (isCleaningUpRef.current || isNavigating) return;
    clearTimers();
    setIsNavigating(true);
    setNavigationProgress(0);
    startProgress();
  }, [clearTimers, startProgress, isNavigating]);

  const stopNavigation = useCallback(() => {
    clearTimers();
    setNavigationProgress(100);
    timeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
      setNavigationProgress(0);
    }, 300);
  }, [clearTimers]);

  // Detect pathname change and complete loading
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;

      // Delay slightly for smoother transition
      const delay = setTimeout(() => {
        stopNavigation();
      }, 800); // adjust for perceived load time

      return () => clearTimeout(delay);
    }
  }, [pathname, stopNavigation]);

  // Detect link clicks to start navigation early
  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a');

      if (
        anchor &&
        anchor.href &&
        anchor.target !== '_blank' &&
        !anchor.hasAttribute('download') &&
        anchor.origin === window.location.origin &&
        anchor.pathname !== window.location.pathname
      ) {
        startNavigation();
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [startNavigation]);

  const value = {
    isNavigating,
    navigationProgress,
    startNavigation,
    stopNavigation,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
