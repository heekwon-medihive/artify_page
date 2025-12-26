import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50">
      <div className="flex h-16 items-center justify-between px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">Artify</span>
        </Link>

        {/* Navigation Links - Center */}
        <div className="hidden lg:flex items-center space-x-8">
          <button className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors flex items-center gap-1">
            제품
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors flex items-center gap-1">
            솔루션
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors flex items-center gap-1">
            커뮤니티
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors flex items-center gap-1">
            리소스
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <Link
            href="/pricing"
            className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            가격
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            로그인
          </Link>
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center rounded-md text-base font-medium border border-input bg-background px-5 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            영업팀에 문의
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md text-base font-medium bg-black text-white px-5 py-2.5 hover:bg-black/90 transition-colors"
          >
            지금 무료로 시작하기
          </Link>
        </div>
      </div>
    </nav>
  );
}

