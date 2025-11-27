import React, { useState,} from 'react';
import './App.css';
import quizDataJson from './data/quizData.json';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  // 화면 상태: 'start', 'game', 'result'
  const [screen, setScreen] = useState('start');
  // 선택된 카테고리 객체
  const [currentCategory, setCurrentCategory] = useState(null);
  // 선택된 카테고리의 문제 목록
  const [quizList, setQuizList] = useState([]);
  // 최종 결과 저장용
  const [resultData, setResultData] = useState({ finalScore: 0, correctCount: 0 });

  const POINTS_PER_QUESTION = 20;

  // 카테고리 선택 시 테마 색상 적용 함수
  const applyTheme = (themeId) => {
    const root = document.documentElement.style;
    const themes = {
      'a': { main: '#3498db', bg: '#e8f5ff', border: '#3498db' },
      'b': { main: '#9b59b6', bg: '#f5eef9', border: '#9b59b6' },
      'c': { main: '#e67e22', bg: '#fef4e8', border: '#e67e22' },
      'd': { main: '#2ecc71', bg: '#e6faed', border: '#2ecc71' }
    };
    const selected = themes[themeId] || themes['a'];
    
    root.setProperty('--color-progress', selected.main);
    root.setProperty('--color-active-bg', selected.bg);
    root.setProperty('--color-active-border', selected.border);
  };

  // 퀴즈 시작 핸들러
  const handleStartQuiz = (category) => {
    setCurrentCategory(category);
    // 해당 카테고리 문제 필터링
    const filteredQuizzes = quizDataJson.quizzes.filter(q => q.category === category.name);
    setQuizList(filteredQuizzes);
    
    // 테마 적용
    applyTheme(category.theme);
    setScreen('game');
  };

  // 퀴즈 종료 핸들러
  const handleFinishQuiz = (correctCount) => {
    const finalScore = correctCount * POINTS_PER_QUESTION;
    setResultData({ finalScore, correctCount });
    setScreen('result');
  };

  // 처음으로 돌아가기
  const handleBackToStart = () => {
    setScreen('start');
    setCurrentCategory(null);
  };

  return (
    <div className="quiz-container">
      {screen === 'start' && (
        <StartScreen 
          categories={quizDataJson.categories}
          quizData={quizDataJson.quizzes}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {screen === 'game' && (
        <GameScreen 
          category={currentCategory}
          questions={quizList}
          onFinish={handleFinishQuiz}
          onBack={handleBackToStart}
        />
      )}

      {screen === 'result' && (
        <ResultScreen 
          finalScore={resultData.finalScore}
          correctCount={resultData.correctCount}
          totalCount={quizList.length}
          onRestart={handleBackToStart}
        />
      )}
    </div>
  );
}

export default App;