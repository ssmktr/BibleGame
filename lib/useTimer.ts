"use client";
import { useState, useRef, useEffect, useCallback } from "react";

export function useTimer() {
  const [displayMs, setDisplayMs] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    startTimeRef.current = Date.now();
    setDisplayMs(0);
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        setDisplayMs(Date.now() - startTimeRef.current);
      }
    }, 10);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const getElapsed = useCallback((): number => {
    if (startTimeRef.current !== null) {
      return Date.now() - startTimeRef.current;
    }
    return displayMs;
  }, [displayMs]);

  return { displayMs, start, stop, getElapsed };
}
