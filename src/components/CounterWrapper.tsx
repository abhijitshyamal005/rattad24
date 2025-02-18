'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import AnimatedCount from './AnimatedCount';

const SECONDS_IN_MONTH = 30 * 24 * 60 * 60;
const END_TIME_KEY = 'countdownEndTime';

export default function Counter() {
  const [secondsRemaining, setSecondsRemaining] = useState(SECONDS_IN_MONTH);

  useEffect(() => {
    const storedEndTime = localStorage.getItem(END_TIME_KEY);
    let endTime = storedEndTime ? parseInt(storedEndTime, 10) : null;

    if (!endTime) {
      // If no end time in storage, set it now
      endTime = Date.now() + SECONDS_IN_MONTH * 1000;
      localStorage.setItem(END_TIME_KEY, endTime.toString());
    }

    const updateRemainingTime = () => {
      const currentTime = Date.now();
      const remainingTime = Math.max(
        0,
        Math.floor((endTime - currentTime) / 1000)
      );
      setSecondsRemaining(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(countdown);
      }
    };

    updateRemainingTime();

    const countdown = setInterval(updateRemainingTime, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  const days = Math.floor(secondsRemaining / (24 * 60 * 60));
  const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="flex  flex-col justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Countdown Timer */}
      <div>
        <Card className="w-[350px] bg-[#121212] text-white shadow-lg shadow-white/30">
          <CardHeader>
            <CardTitle className="text-center ">
              Do not lose this offer!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl flex justify-center gap-4">
              <div className="flex flex-col items-center">
                <div>
                  <AnimatedCount value={days} />
                </div>
                <span className="text-[16px]">Days</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <div>
                  <AnimatedCount value={hours} />
                </div>
                <span className="text-[16px]">Hours</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <div>
                  <AnimatedCount value={minutes} />
                </div>
                <span className="text-[16px]">Minutes</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <div>
                  <AnimatedCount value={seconds} />
                </div>
                <span className="text-[16px]">Seconds</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
