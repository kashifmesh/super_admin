'use client';

import React from 'react';
import { Spin } from 'antd';
import { useNavigation } from './NavigationContext';
import './NavigationLoader.css';

const NavigationLoader = () => {
  const { isNavigating, navigationProgress } = useNavigation();

  console.log('🎯 NavigationLoader render:', {
    isNavigating,
    navigationProgress,
  });

  if (!isNavigating) {
    return null;
  }

  return (
    <>
      <div className="navigation-progress-bar">
        <div
          className="navigation-progress-fill"
          style={{ width: `${navigationProgress}%` }}
        />
      </div>

      <div className="navigation-overlay">
        <div className="navigation-spinner-container">
          <Spin size="large" />
          <div className="navigation-loading-text">Loading...</div>
        </div>
      </div>
    </>
  );
};

export default NavigationLoader;
