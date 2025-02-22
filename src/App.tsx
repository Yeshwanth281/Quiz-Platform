import React, { useState, useEffect } from 'react';
import AppBar from './components/AppBar';
import HomePage from './components/HomePage';
import Question from './components/Question';
import Timer from './components/Timer';
import Scoreboard from './components/Scoreboard';
import { questions } from './data/questions';
import { saveAttempt, getAttempts } from './utils/db';
import type { QuizState, QuizAttempt } from './types';

const SECONDS_PER_QUESTION = 30;

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: SECONDS_PER_QUESTION,
    isComplete: false,
    score: 0,
  });

  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadAttempts = async () => {
      const savedAttempts = await getAttempts();
      setAttempts(savedAttempts);
    };
    loadAttempts();

    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    // Update theme
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    if (!quizStarted || quizState.isComplete || quizState.answers[quizState.currentQuestionIndex] !== undefined) {
      return;
    }

    const timer = setInterval(() => {
      setQuizState((prev) => ({
        ...prev,
        timeRemaining: prev.timeRemaining - 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizState.currentQuestionIndex, quizState.answers, quizState.isComplete]);

  const handleAnswer = async (answer: string | number) => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    const timeSpent = SECONDS_PER_QUESTION - quizState.timeRemaining;

    setTimePerQuestion((prev) => [...prev, timeSpent]);

    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = answer;

    const isLastQuestion = quizState.currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      const finalScore = newAnswers.reduce((score, answer, index) => 
        answer === questions[index].correctAnswer ? score + 1 : score, 0
      );

      const attempt: QuizAttempt = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        score: finalScore,
        totalQuestions: questions.length,
        timePerQuestion: [...timePerQuestion, timeSpent],
      };

      await saveAttempt(attempt);
      setAttempts((prev) => [...prev, attempt]);

      setQuizState((prev) => ({
        ...prev,
        answers: newAnswers,
        isComplete: true,
        score: finalScore,
      }));
    } else {
      setQuizState((prev) => ({
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeRemaining: SECONDS_PER_QUESTION,
        score: isCorrect ? prev.score + 1 : prev.score,
      }));
    }
  };

  const handleTimeUp = () => {
    handleAnswer('');
  };

  const handleRetry = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: SECONDS_PER_QUESTION,
      isComplete: false,
      score: 0,
    });
    setTimePerQuestion([]);
    setQuizStarted(false);
    setShowHistory(false);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setShowHistory(false);
  };

  const handleHistoryClick = () => {
    if (!quizStarted || quizState.isComplete) {
      setShowHistory(true);
      setQuizStarted(false);
    }
  };

  const handleHomeClick = () => {
    if (!quizStarted || quizState.isComplete) {
      setShowHistory(false);
      setQuizStarted(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <AppBar 
        onHistoryClick={handleHistoryClick}
        onHomeClick={handleHomeClick}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
        showHistoryButton={!quizStarted || quizState.isComplete}
        showHomeButton={showHistory}
      />
      
      {!quizStarted ? (
        <HomePage
          onStartQuiz={handleStartQuiz}
          showHistory={showHistory}
          attempts={attempts}
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            {!quizState.isComplete ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-lg">
                    Question {quizState.currentQuestionIndex + 1} of {questions.length}
                  </p>
                  <Timer
                    timeRemaining={quizState.timeRemaining}
                    onTimeUp={handleTimeUp}
                  />
                </div>

                <Question
                  question={questions[quizState.currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  isAnswered={quizState.answers[quizState.currentQuestionIndex] !== undefined}
                  isDarkMode={isDarkMode}
                />
              </div>
            ) : (
              <Scoreboard
                score={quizState.score}
                totalQuestions={questions.length}
                onRetry={handleRetry}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;