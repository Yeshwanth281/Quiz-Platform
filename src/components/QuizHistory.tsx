import React from 'react';
import { format } from 'date-fns';
import { History } from 'lucide-react';
import type { QuizAttempt } from '../types';

interface QuizHistoryProps {
  attempts: QuizAttempt[];
  isDarkMode: boolean;
}

export default function QuizHistory({ attempts, isDarkMode }: QuizHistoryProps) {
  if (attempts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold dark:text-white">Previous Attempts</h2>
      </div>
      <div className="space-y-4">
        {attempts.map((attempt) => (
          <div
            key={attempt.id}
            className={`p-4 rounded-lg shadow border ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">
                  {format(attempt.timestamp, 'PPpp')}
                </p>
                <p className="font-semibold">
                  Score: {attempt.score} / {attempt.totalQuestions}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  Average Time: {(attempt.timePerQuestion.reduce((a, b) => a + b, 0) / attempt.timePerQuestion.length).toFixed(1)}s per question
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}