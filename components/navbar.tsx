"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50">
        <div className="flex h-16 items-center justify-between px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">Artify</span>
          </Link>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors"
            >
              로그인
            </Link>
            <button
              onClick={() => setIsContactOpen(true)}
              className="hidden md:inline-flex items-center justify-center rounded-md text-base font-medium border border-input bg-background px-5 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Contact
            </button>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-md text-base font-medium bg-black text-white px-5 py-2.5 hover:bg-black/90 transition-colors"
            >
              지금 무료로 시작하기
            </Link>
          </div>
        </div>
      </nav>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsContactOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            {/* Close Button */}
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="px-12 pt-12 pb-8">
              <h2 className="text-4xl font-bold mb-4">Artify에 문의</h2>
            </div>

            {/* Form */}
            <form className="px-12 pb-12 space-y-6">
              {/* 업무 이메일 주소 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  업무 이메일 주소*
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder=""
                />
              </div>

              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  이름*
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder=""
                />
              </div>

              {/* 성 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  성*
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder=""
                />
              </div>

              {/* 회사명 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  회사명*
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder=""
                />
              </div>

              {/* 어떤 종류의 문의사항이신가요? */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  어떤 종류의 문의사항이신가요?*
                </label>
                <div className="relative">
                  <select
                    required
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                  >
                    <option value="">선택하세요</option>
                    <option value="sales">영업 문의</option>
                    <option value="support">기술 지원</option>
                    <option value="partnership">파트너십</option>
                    <option value="other">기타</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 전화 번호 */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  전화 번호
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder=""
                />
              </div>

              {/* 무엇을 도와드릴까요? */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  무엇을 도와드릴까요?
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder=""
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-lg font-medium text-lg hover:bg-black/90 transition-colors"
                >
                  제출
                </button>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-500 leading-relaxed">
                이 양식을 제출하면 Artify가 귀하의 개인 정보를 수집하고 사용하는 것에 동의하게 됩니다. 
                자세한 내용은 개인정보 보호정책을 참조하세요.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

