import React, { useState,} from 'react';

function GameScreen({ category, questions, onFinish, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null); // 사용자가 선택한 답의 인덱스
  const POINTS_PER_QUESTION = 20;

  const currentQuiz = questions[currentIndex];
  const totalQuestions = questions.length;

  // 선택지 클릭 핸들러
  const handleChoiceClick = (choiceIndex) => {
    if (selectedChoice !== null) return; // 이미 선택했으면 중복 클릭 방지

    setSelectedChoice(choiceIndex);

    // 정답 확인
    let newScore = score;
    if (choiceIndex === currentQuiz.correct) {
      newScore = score + 1;
      setScore(newScore);
    }

    // 0.8초 후 다음 문제로
    setTimeout(() => {
      if (currentIndex + 1 < totalQuestions) {
        setCurrentIndex(currentIndex + 1);
        setSelectedChoice(null);
      } else {
        // 퀴즈 종료
        onFinish(newScore);
      }
    }, 800);
  };

  // 선택지 배열을 2개씩 묶어서 렌더링 (UI 레이아웃 유지)
  const renderChoices = () => {
    const rows = [];
    for (let i = 0; i < currentQuiz.choices.length; i += 2) {
      rows.push(
        <div className="choice-row" key={i}>
          {[i, i + 1].map(idx => {
            if (idx >= currentQuiz.choices.length) return null;
            const choiceNum = idx + 1; // 1-based index
            const isSelected = selectedChoice === choiceNum;
            
            return (
              <div 
                key={idx} 
                className={`choice-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleChoiceClick(choiceNum)}
              >
                <div className="checkbox"></div>
                <div className="choice-content">
                  <p className="type-desc">{currentQuiz.choices[idx]}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="game-screen-wrapper">
      <div className="header">
        <span className="back-arrow" onClick={onBack}>↺ 카테고리 선택</span>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <span className="page-number">{currentIndex + 1}/{totalQuestions}</span>
      </div>

      <div className="score-display">
        현재 점수: <span id="currentScore">{score * POINTS_PER_QUESTION}</span>점
      </div>

      <div className="question-area">
        <p className="quiz-title" style={{color: '#fff', fontSize: '14px', marginBottom: '5px'}}>
           라푼젤 퀴즈: {category.name}
        </p>
        <p className="question-text">Q. {currentQuiz.question}</p>
      </div>

      <div className="choices-area">
        {renderChoices()}
      </div>
    </div>
  );
}

export default GameScreen;