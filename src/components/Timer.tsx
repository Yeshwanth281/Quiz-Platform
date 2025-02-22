import React, { useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export default function Timer({ timeRemaining, onTimeUp }: TimerProps) {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <TimerIcon className="w-6 h-6 text-blue-600" />
      <span className={timeRemaining <= 5 ? 'text-red-600' : 'text-blue-600'}>
        {timeRemaining}s
      </span>
    </div>
  );
}