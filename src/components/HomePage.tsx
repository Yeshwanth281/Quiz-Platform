import React from 'react';
import QuizCard from './QuizCard';
import QuizHistory from './QuizHistory';
import type { QuizAttempt } from '../types';

interface HomePageProps {
  onStartQuiz: () => void;
  showHistory: boolean;
  attempts: QuizAttempt[];
  isDarkMode: boolean;
}

export default function HomePage({ onStartQuiz, showHistory, attempts, isDarkMode }: HomePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {showHistory ? (
        <div className="max-w-2xl mx-auto">
          <QuizHistory attempts={attempts} isDarkMode={isDarkMode} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuizCard
            title="General Knowledge Quiz"
            description="Test your knowledge across various topics including science, history, and mathematics in this comprehensive quiz."
            questionCount={10}
            timePerQuestion={30}
            onStart={onStartQuiz}
            isDarkMode={isDarkMode}
          />
        </div>
      )}
    </div>
  );
}