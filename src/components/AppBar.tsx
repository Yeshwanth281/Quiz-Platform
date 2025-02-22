import React from 'react';
import { Brain, History, Home, Sun, Moon } from 'lucide-react';

interface AppBarProps {
  onHistoryClick: () => void;
  onHomeClick: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  showHistoryButton: boolean;
  showHomeButton: boolean;
}

export default function AppBar({
  onHistoryClick,
  onHomeClick,
  onThemeToggle,
  isDarkMode,
  showHistoryButton,
  showHomeButton
}: AppBarProps) {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold">Interactive Quiz Platform</h1>
          </div>
          <div className="flex items-center gap-2">
            {showHomeButton && (
              <button
                onClick={onHomeClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
            )}
            {showHistoryButton && (
              <button
                onClick={onHistoryClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <History className="w-5 h-5" />
                <span>History</span>
              </button>
            )}
            <button
              onClick={onThemeToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}