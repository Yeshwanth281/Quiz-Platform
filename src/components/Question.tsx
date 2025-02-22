import React, { useState } from 'react';
import type { Question as QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string | number) => void;
  isAnswered: boolean;
  isDarkMode: boolean;
}

export default function Question({ question, onAnswer, isAnswered, isDarkMode }: QuestionProps) {
  const [integerAnswer, setIntegerAnswer] = useState('');

  const handleIntegerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAnswer = parseInt(integerAnswer, 10);
    if (!isNaN(numAnswer)) {
      onAnswer(numAnswer);
    }
  };

  if (question.type === 'multiple-choice') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{question.question}</h2>
        <div className="space-y-2">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              disabled={isAnswered}
              className={`w-full p-3 text-left rounded-lg border transition-colors
                ${isAnswered 
                  ? option === question.correctAnswer
                    ? 'bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-600'
                    : 'bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-600'
                  : isDarkMode
                    ? 'hover:bg-gray-700 border-gray-600'
                    : 'hover:bg-gray-100 border-gray-300'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.question}</h2>
      <form onSubmit={handleIntegerSubmit}>
        <input
          type="number"
          value={integerAnswer}
          onChange={(e) => setIntegerAnswer(e.target.value)}
          disabled={isAnswered}
          className={`w-full p-2 border rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300'
          }`}
          placeholder="Enter your answer"
        />
        <button
          type="submit"
          disabled={isAnswered}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
}