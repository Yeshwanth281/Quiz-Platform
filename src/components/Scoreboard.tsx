import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreboardProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  isDarkMode: boolean;
}

export default function Scoreboard({ score, totalQuestions, onRetry, isDarkMode }: ScoreboardProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="text-center space-y-6">
      <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
      <h2 className="text-2xl font-bold">Quiz Complete!</h2>
      <div className="space-y-2">
        <p className="text-xl">
          Your Score: <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> out of {totalQuestions}
        </p>
        <p className="text-lg">
          Percentage: <span className="font-bold">{percentage.toFixed(1)}%</span>
        </p>
      </div>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}