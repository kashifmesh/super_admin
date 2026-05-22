'use client';

import { useRouter } from 'next/navigation';
import { useNavigation } from './NavigationContext';

/**
 * Custom hook that provides navigation methods with automatic loading states
 * @returns {Object} Navigation methods with loading states
 */
export const useNavigationLoader = () => {
  const { startNavigation, stopNavigation, isNavigating } = useNavigation();
  const router = useRouter();

  /**
   * Navigate to a new route with loading state
   * @param {string} href - The route to navigate to
   * @param {Object} options - Navigation options
   */
  const navigateTo = async (href, options = {}) => {
    try {
      if (options.replace) {
        router.replace(href);
      } else {
        router.push(href);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      stopNavigation();
    }
  };

  /**
   * Navigate back with loading state
   */
  const goBack = () => {
    try {
      startNavigation();
      router.back();
    } catch (error) {
      console.error('Navigation error:', error);
      stopNavigation();
    }
  };

  /**
   * Navigate forward with loading state
   */
  const goForward = () => {
    try {
      startNavigation();
      router.forward();
    } catch (error) {
      console.error('Navigation error:', error);
      stopNavigation();
    }
  };

  /**
   * Refresh the current page with loading state
   */
  const refresh = () => {
    try {
      startNavigation();
      router.refresh();
    } catch (error) {
      console.error('Navigation error:', error);
      stopNavigation();
    }
  };

  return {
    navigateTo,
    goBack,
    goForward,
    refresh,
    isNavigating,
    startNavigation,
    stopNavigation,
  };
};
