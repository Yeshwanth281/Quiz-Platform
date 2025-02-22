export interface Question {
  id: number;
  type: 'multiple-choice' | 'integer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
}

export interface QuizAttempt {
  id: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  timePerQuestion: number[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: (string | number)[];
  timeRemaining: number;
  isComplete: boolean;
  score: number;
}