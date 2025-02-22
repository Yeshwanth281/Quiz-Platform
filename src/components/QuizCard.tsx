import React from 'react';
import { Clock, FileQuestion } from 'lucide-react';

interface QuizCardProps {
  title: string;
  description: string;
  questionCount: number;
  timePerQuestion: number;
  onStart: () => void;
  isDarkMode: boolean;
}

export default function QuizCard({
  title,
  description,
  questionCount,
  timePerQuestion,
  onStart,
  isDarkMode,
}: QuizCardProps) {
  return (
    <div className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <FileQuestion className="w-6 h-6 text-blue-600" />
      </div>
      <p className="mb-6">{description}</p>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <FileQuestion className="w-5 h-5 text-gray-500" />
          <span>{questionCount} questions</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>{timePerQuestion}s per question</span>
        </div>
      </div>
      <button
        onClick={onStart}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Start Quiz
      </button>
    </div>
  );
}