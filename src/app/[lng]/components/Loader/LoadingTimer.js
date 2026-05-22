import React, { useState, useEffect } from "react";
import Loader from "../Spinner/Loader";

function LoadingTimer({ setIsLoading, isLoading }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return isLoading ? <Loader /> : null;
}

export default LoadingTimer;