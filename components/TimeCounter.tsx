"use client";

import { useEffect, useState } from "react";

export default function TimeCounter() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      // 29 de mayo de 2026 a las 7:16 PM (19:16)
      const startDate = new Date(2026, 4, 29, 19, 16, 0); // Mes es 0-indexed, así que mayo es 4
      const now = new Date();

      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (
    <div className="time-unit">
      <div className="time-value">{String(value).padStart(2, "0")}</div>
      <div className="time-label">{label}</div>
    </div>
  );

  return (
    <div className="time-counter-container">
      <p className="counter-title">Tiempo desde que nos conocemos</p>
      <div className="time-counter">
        <TimeUnit value={time.days} label="Días" />
        <span className="time-separator">:</span>
        <TimeUnit value={time.hours} label="Horas" />
        <span className="time-separator">:</span>
        <TimeUnit value={time.minutes} label="Minutos" />
        <span className="time-separator">:</span>
        <TimeUnit value={time.seconds} label="Segundos" />
      </div>
    </div>
  );
}
