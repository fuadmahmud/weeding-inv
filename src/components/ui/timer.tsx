import React, { useEffect, useRef, useState } from 'react';

interface FlipCardProps {
  dataAttribute: string;
  value: number;
}

interface FlipCardRef extends HTMLDivElement {
  querySelector(selector: string): HTMLElement | null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ dataAttribute, value }) => {
  const cardRef = useRef<FlipCardRef>(null);

  const flip = (newNumber: number) => {
    if (!cardRef.current) return;

    const topHalf = cardRef.current.querySelector(".top") as HTMLElement;
    const bottomHalf = cardRef.current.querySelector(".bottom") as HTMLElement;
    
    if (!topHalf || !bottomHalf) return;
    
    const startNumber = parseInt(topHalf.textContent || '0');
    if (newNumber === startNumber) return;

    const topFlip = document.createElement("div");
    const bottomFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    bottomFlip.classList.add("bottom-flip");

    topHalf.textContent = startNumber.toString();
    bottomHalf.textContent = startNumber.toString();
    topFlip.textContent = startNumber.toString();
    bottomFlip.textContent = newNumber.toString();

    topFlip.addEventListener("animationstart", () => {
      topHalf.textContent = newNumber.toString();
    });

    topFlip.addEventListener("animationend", () => {
      topFlip.remove();
    });

    bottomFlip.addEventListener("animationend", () => {
      bottomHalf.textContent = newNumber.toString();
      bottomFlip.remove();
    });

    cardRef.current.append(topFlip, bottomFlip);
  };

  useEffect(() => {
    flip(value);
  }, [value]);

  return (
    <div className="flip-card" ref={cardRef} data-attribute={dataAttribute}>
      <div className="top">0</div>
      <div className="bottom">0</div>
    </div>
  );
};

const Countdown: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const countToDate = targetDate;
    countToDate.setHours(countToDate.getHours() + 24);

    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil((countToDate.getTime() - currentDate.getTime()) / 1000);

      const seconds = timeBetweenDates % 60;
      const minutes = Math.floor(timeBetweenDates / 60) % 60;
      const hours = Math.floor(timeBetweenDates / 3600) % 24;
      const days = Math.floor(timeBetweenDates / (3600 * 24));

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-container">
      <div className="flex flex-col items-center justify-center w-1/5">
        <div className="days-container">
          <FlipCard 
            dataAttribute="data-days-tens" 
            value={Math.floor(timeLeft.days / 10)} 
          />
          <FlipCard 
            dataAttribute="data-days-ones" 
            value={timeLeft.days % 10} 
          />
        </div>
        <span className="uppercase text-gray-400">Hari</span>
      </div>

      <div className="flex flex-col items-center justify-center w-1/5">
        <div className="hours-container">
          <FlipCard 
            dataAttribute="data-hours-tens" 
            value={Math.floor(timeLeft.hours / 10)} 
            />
          <FlipCard 
            dataAttribute="data-hours-ones" 
            value={timeLeft.hours % 10} 
            />
        </div>

        <span className="uppercase text-gray-400">Jam</span>
      </div>
      <div className="flex flex-col items-center justify-center w-1/5">
        <div className="minutes-container">
          <FlipCard 
            dataAttribute="data-minutes-tens" 
            value={Math.floor(timeLeft.minutes / 10)} 
          />
          <FlipCard 
            dataAttribute="data-minutes-ones" 
            value={timeLeft.minutes % 10} 
          />
        </div>

        <span className="uppercase text-gray-400">Menit</span>
      </div>
      <div className="flex flex-col items-center justify-center w-1/5">
        <div className="seconds-container">
          <FlipCard 
            dataAttribute="data-seconds-tens" 
            value={Math.floor(timeLeft.seconds / 10)} 
          />
          <FlipCard 
            dataAttribute="data-seconds-ones" 
            value={timeLeft.seconds % 10} 
          />
        </div>
        
        <span className="uppercase text-gray-400">Detik</span>
      </div>
    </div>
  );
};

export default Countdown;
