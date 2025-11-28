import React from 'react';

function StartScreen({ categories, quizData, onStartQuiz }) {
  
  // 카테고리별 설명 가져오기
  const getCategoryDescription = (categoryName) => {
    const descriptions = {
      "라푼젤 주요 인물 및 설정": "주인공, 주변 인물, 탑 속 생활 설정",
      "마법의 힘과 요소": "황금빛 머리카락, 치유의 노래, 빌런의 목적",
      "플린 라이더와 여정": "왕관 도난 사건과 라푼젤과의 모험",
      "후반부와 주제": "랜턴 축제, 라푼젤의 정체성, 영화의 결말"
    };
    return descriptions[categoryName] || '퀴즈 내용 설명';
  };

  return (
    <div className="control-screen">
      <img 
        src="https://wrtn-image-user-output.s3.ap-northeast-2.amazonaws.com/gen-image/68ad43d95bebe691666b9b2e/ff480741-312c-46ab-bad5-b972d8701f5e.png" 
        alt="Rapunzel Quiz" 
        style={{ width: '120px', height: 'auto', marginBottom: '10px', alignSelf: 'center', borderRadius: '50%' }}
      />
      <h1>👸<span className="title-highlight"> 라푼젤 퀴즈</span></h1>
      <p><span>풀고 싶은 카테고리를 선택해 주세요.</span></p>
      
      <div className="category-grid">
        {categories.map((cat, index) => {
          const count = quizData.filter(q => q.category === cat.name).length;
          return (
            <div 
              key={index} 
              className={`category-card theme-${cat.theme}`}
              onClick={() => onStartQuiz(cat)}
            >
              <p className="type-main">{cat.name}</p>
              <p className="type-desc">{getCategoryDescription(cat.name)} ({count}문제)</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StartScreen;