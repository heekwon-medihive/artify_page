"use client";

import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("프롬프트");

  // 카테고리별 데이터
  const categories = [
    { name: "프롬프트", description: "AI와 함께 상상하는 모든 것을 프롬프트만으로 코딩해 보세요." },
    { name: "디자인", description: "직관적인 디자인 툴로 아름다운 작품 페이지를 만들어보세요." },
    { name: "그리기", description: "자유로운 드로잉 도구로 창작의 즐거움을 느껴보세요." },
    { name: "개발", description: "코드 없이도 전문가 수준의 웹사이트를 구축하세요." },
    { name: "게시", description: "클릭 한 번으로 당신의 작품을 세상에 공개하세요." },
    { name: "홍보", description: "SNS 연동으로 더 많은 관객과 만나보세요." },
    { name: "협업", description: "팀원들과 실시간으로 작품을 공유하고 협업하세요." },
    { name: "프레젠테이션", description: "작품을 돋보이게 하는 프레젠테이션 모드를 활용하세요." },
  ];

  // 작품 카드 데이터 (8개)
  const artworks = [
    { id: 1, title: "Urban Typography", color: "bg-yellow-300", text: "OH WOW!", textColor: "text-black" },
    { id: 2, title: "Vintage Tree", color: "bg-gray-200", image: "🌳" },
    { id: 3, title: "Collectiv", color: "bg-black", text: "collectiv", textColor: "text-white" },
    { id: 4, title: "Abstract Pattern", color: "bg-gray-300", pattern: true },
    { id: 5, title: "Light Garden", color: "bg-blue-500", text: "Light Garden", textColor: "text-white" },
    { id: 6, title: "Nature Study", color: "bg-purple-900", image: "🍃" },
    { id: 7, title: "Portrait", color: "bg-orange-400", image: "👤" },
    { id: 8, title: "Commercial", color: "bg-purple-300", text: "Commer", textColor: "text-black" },
  ];

  // 2초마다 자동 슬라이드
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % artworks.length);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isPaused, artworks.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  // 카드의 위치를 계산하는 함수
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const totalCards = artworks.length;
    
    // 순환 처리
    let position = diff;
    if (diff > totalCards / 2) position = diff - totalCards;
    if (diff < -totalCards / 2) position = diff + totalCards;

    // 중앙 카드 (position === 0) - 기본 크기 유지
    if (position === 0) {
      return {
        transform: "translateX(0%) scale(1)",
        opacity: 1,
        zIndex: 30,
      };
    }
    
    // 왼쪽/오른쪽 카드들 - 조금만 작게
    const translateX = position * 103; // 카드 간격 (겹치지 않으면서 가깝게)
    const scale = 0.88; // 중앙 카드보다 조금만 작게
    const opacity = Math.max(0.4, 1 - Math.abs(position) * 0.15);
    const zIndex = 20 - Math.abs(position);

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <div className="bg-gray-50">
      <Navbar />
      
      {/* Main Carousel Section - First Screen */}
      <main className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* 3D Carousel Container */}
        <div className="relative w-full h-[550px] flex items-center justify-center mb-4">
          {artworks.map((card, index) => {
            const style = getCardStyle(index);
            return (
              <div
                key={card.id}
                className="absolute transition-all duration-700 ease-out"
                style={{
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
              >
                <div
                  className={`${card.color} rounded-2xl w-[450px] h-[550px] flex items-center justify-center text-center p-8 shadow-2xl`}
                >
                  {card.text && (
                    <span className={`text-6xl font-bold ${card.textColor}`}>
                      {card.text}
                    </span>
                  )}
                  {card.image && <span className="text-9xl">{card.image}</span>}
                  {card.pattern && (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls - Right side of carousel */}
        <div className="absolute right-8 flex items-center gap-4" style={{ top: 'calc(50% + 240px)' }}>
          <button
            onClick={handlePrevious}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
          </button>
          
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Description Text */}
        <div className="max-w-3xl text-center px-4 mt-8 mb-20">
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
            <span className="font-semibold">Artify</span>로 당신의 예술을 가장 아름답게 기록하세요.<br />
            작품에만 집중할 수 있도록, 복잡한 웹 구축은 <span className="font-semibold">Artify</span>가 대신합니다.
          </p>
        </div>
      </main>

      {/* Partner Galleries Section - Below Main Screen */}
      <section className="w-full overflow-hidden bg-white py-20">
        <div className="flex animate-scroll">
          {/* First set of galleries */}
          <div className="flex gap-12 px-6 whitespace-nowrap">
            <span className="text-xl font-semibold text-foreground/60">아트센터 나비</span>
            <span className="text-xl font-semibold text-foreground/60">리움미술관</span>
            <span className="text-xl font-semibold text-foreground/60">국립현대미술관</span>
            <span className="text-xl font-semibold text-foreground/60">서울시립미술관</span>
            <span className="text-xl font-semibold text-foreground/60">대림미술관</span>
            <span className="text-xl font-semibold text-foreground/60">아라리오갤러리</span>
            <span className="text-xl font-semibold text-foreground/60">갤러리현대</span>
            <span className="text-xl font-semibold text-foreground/60">페이스갤러리</span>
            <span className="text-xl font-semibold text-foreground/60">화이트큐브</span>
            <span className="text-xl font-semibold text-foreground/60">아트선재센터</span>
            <span className="text-xl font-semibold text-foreground/60">PKM갤러리</span>
            <span className="text-xl font-semibold text-foreground/60">가나아트갤러리</span>
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-12 px-6 whitespace-nowrap">
            <span className="text-xl font-semibold text-foreground/60">아트센터 나비</span>
            <span className="text-xl font-semibold text-foreground/60">리움미술관</span>
            <span className="text-xl font-semibold text-foreground/60">국립현대미술관</span>
            <span className="text-xl font-semibold text-foreground/60">서울시립미술관</span>
            <span className="text-xl font-semibold text-foreground/60">대림미술관</span>
            <span className="text-xl font-semibold text-foreground/60">아라리오갤러리</span>
            <span className="text-xl font-semibold text-foreground/60">갤러리현대</span>
            <span className="text-xl font-semibold text-foreground/60">페이스갤러리</span>
            <span className="text-xl font-semibold text-foreground/60">화이트큐브</span>
            <span className="text-xl font-semibold text-foreground/60">아트선재센터</span>
            <span className="text-xl font-semibold text-foreground/60">PKM갤러리</span>
            <span className="text-xl font-semibold text-foreground/60">가나아트갤러리</span>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <div className="w-full bg-gray-50 pt-20 pb-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-bold text-foreground leading-tight" style={{ fontSize: '2.75rem' }}>
            창작의 순간부터 나만의 사이트까지,<br />
            컨셉 설정·페이지 생성·도메인 연결을 한 번에
          </h2>
        </div>
      </div>

      {/* Video Demo Section with Categories */}
      <div className="w-full bg-gray-50 pt-10 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.name
                    ? "bg-black text-white"
                    : "bg-white text-foreground hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Video Container */}
          <div className="relative w-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl shadow-2xl overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg 
                  className="w-24 h-24 mx-auto mb-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <p className="text-xl font-medium text-gray-500">{activeCategory} 시연 영상</p>
                <p className="text-sm text-gray-400 mt-2">동영상이 여기에 표시됩니다</p>
              </div>
            </div>
          </div>

          {/* Category Description */}
          <div className="text-center mb-8">
            <p className="text-lg text-foreground/80">
              {categories.find((c) => c.name === activeCategory)?.description}
            </p>
          </div>

          {/* CTA Link */}
          <div className="text-center">
            <a
              href="/make"
              className="group inline-flex items-center gap-2 text-lg font-medium text-foreground border-b-2 border-foreground pb-1 hover:gap-3 transition-all duration-300"
            >
              <svg 
                className="w-5 h-5 opacity-0 group-hover:opacity-100 -ml-7 group-hover:ml-0 transition-all duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>Artify Make 살펴보기</span>
            </a>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="w-full bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-7xl mb-8 text-cyan-400">
            💬
          </div>
          <blockquote className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Artify는 창작자가 본질에만 집중할 수 있는<br />
            환경을 제공합니다.<br />
            기술적 장벽에 막히지 않고, 당신의 예술적 열정을 무한히<br />
            펼치는 데만 전념할수 있습니다.
          </blockquote>
        </div>
      </div>

      {/* New Section - Portfolio Builder */}
      <div className="w-full py-20 px-4" style={{ backgroundColor: '#F3FFE3' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-foreground leading-tight mb-16 text-center" style={{ fontSize: '2.75rem' }}>
            손 쉽게 작가님의 자사 포토폴리오<br />
            사이트를 만드세요
          </h2>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col">
            {/* Image Placeholder */}
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl mb-6 flex items-center justify-center">
              <p className="text-gray-400 text-sm">이미지 영역</p>
            </div>
            {/* Description */}
            <p className="text-foreground leading-relaxed" style={{ fontSize: '1.5rem' }}>
              템 간에 라이브러리와 디자인 시스템을 공유하세요. 재사용 가능한 컴포넌트 변수, 브랜드 에셋을 만들어 조직 전체가 동일한 비주얼 언어로 일관되게 작업할 수 있도록 지원하세요.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col">
            {/* Image Placeholder */}
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-green-200 to-yellow-200 rounded-2xl mb-6 flex items-center justify-center">
              <p className="text-gray-400 text-sm">이미지 영역</p>
            </div>
            {/* Description */}
            <p className="text-foreground leading-relaxed" style={{ fontSize: '1.5rem' }}>
              온보랜드 템플릿으로 팀의 잠재력을 발휘하세요. 조직과 템플릿을 공유하여 누구나 빠르게 소셜 미디어 에셋, 디스플레이 광고, 웹페이지 등을 만들 수 있습니다.
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Project Gallery Section */}
      <div className="w-full bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-foreground leading-tight mb-16 text-center" style={{ fontSize: '2.75rem' }}>
            다른 작가님의 완성된 웹 사이트를 살펴보세요
          </h2>

          {/* Projects Grid - 4 columns x 2 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Project 1 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-3 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  프로젝트 이미지
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Virtual Teleportation Portal</h3>
              <p className="text-sm text-muted-foreground">김작가</p>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-teal-600 to-green-600 rounded-lg mb-3 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  프로젝트 이미지
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Bubbles Design System</h3>
              <p className="text-sm text-muted-foreground">이작가</p>
            </div>

            {/* Project 3 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg mb-3 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  프로젝트 이미지
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Virtual Graffiti Wall</h3>
              <p className="text-sm text-muted-foreground">박작가</p>
            </div>

            {/* Project 4 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-lime-400 to-green-400 rounded-lg mb-3 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  프로젝트 이미지
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Pixel Editor</h3>
              <p className="text-sm text-muted-foreground">최작가</p>
            </div>

            {/* Project 5 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg mb-3 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  프로젝트 이미지
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Cursor Images</h3>
              <p className="text-sm text-muted-foreground">정작가</p>
            </div>

            {/* Project 6 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-slate-900 to-black rounded-lg mb-3 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  프로젝트 이미지
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Pattern Generator</h3>
              <p className="text-sm text-muted-foreground">강작가</p>
            </div>

            {/* Project 7 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-pink-300 to-purple-300 rounded-lg mb-3 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  프로젝트 이미지
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Flower Catcher</h3>
              <p className="text-sm text-muted-foreground">윤작가</p>
            </div>

            {/* Project 8 */}
            <div className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-800 to-green-800 rounded-lg mb-3 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  프로젝트 이미지
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Earworm Studio</h3>
              <p className="text-sm text-muted-foreground">조작가</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
