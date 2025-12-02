import React from 'react';

function ResultScreen({ finalScore, totalCount, correctCount, onRestart }) {
  const percentage = (finalScore / 100) * 100;
  
  let message = '';
  if (percentage === 100) {
    message = "정답률 100%! 당신은 라푼젤의 마법에 통달했습니다!";
  } else if (percentage >= 80) {
    message = "환상적입니다! 라푼젤의 모험을 깊이 이해하고 계시네요!";
  } else if (percentage >= 60) {
    message = "잘하셨어요! 라푼젤에 대한 지식이 꽤 탄탄합니다.";
  } else {
    message = "다음 모험에서는 마법의 꽃을 찾아 더 좋은 성과를 기대합니다!";
  }

  return (
    <div className="control-screen">
      <h2 style={{marginTop: '50px'}}>👑 퀴즈 종료! 👑</h2>
      <p id="finalScoreText">{finalScore}점</p>
      <p style={{fontSize: '18px', backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px'}}>
        (총 {totalCount}문제 중 <strong>{correctCount}</strong> 문제 정답)
      </p>
      <p style={{margin: '20px 0', lineHeight: '1.6' , backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px'}}>{message}</p>
      <button className="result-btn" onClick={onRestart}>
        새로운 퀴즈 시작하기
      </button>
    </div>
  );
}

export default ResultScreen;