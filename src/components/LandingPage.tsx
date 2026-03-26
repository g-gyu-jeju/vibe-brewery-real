import React from 'react';
import { motion } from 'motion/react';
import { Beer, Sparkles, Share2, TrendingUp, ChevronRight } from 'lucide-react';

export default function LandingPage({ onStart, onGoToGallery }: { onStart: () => void, onGoToGallery: () => void }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-brew-amber flex items-center justify-center text-brew-black">
            <Beer size={24} />
          </div>
          <span className="text-2xl font-display tracking-tight">Vibe Brewery</span>
        </div>
        <button 
          onClick={onGoToGallery}
          className="text-sm text-brew-cream/60 hover:text-brew-amber transition-all uppercase tracking-widest"
        >
          Brewery Gallery
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          <h1 className="text-7xl md:text-9xl leading-tight">
            당신의 <span className="text-brew-amber italic">바이브</span>가<br />
            맥주가 되는 순간
          </h1>
          <p className="text-xl md:text-2xl text-brew-cream/60 font-light max-w-2xl mx-auto leading-relaxed">
            맥주를 전혀 몰라도 괜찮습니다. 당신의 기분과 상황만 들려주세요.<br />
            AI 마스터 브루어가 당신만을 위한 완벽한 레시피를 설계합니다.
          </p>
          
          <div className="pt-8">
            <button
              onClick={onStart}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-brew-amber text-brew-black text-xl font-bold transition-all hover:bg-brew-gold hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,129,26,0.4)]"
            >
              나만의 맥주 만들기
              <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-brew-amber/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[15%] w-96 h-96 bg-brew-amber/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </main>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-8 py-24 border-t border-brew-cream/10 bg-brew-black/50 backdrop-blur-sm">
        <FeatureCard 
          icon={<Sparkles className="text-brew-amber" />}
          title="AI Persona Analysis"
          desc="Claude 3.5 기반의 정교한 분석으로 감정을 맛으로 치환합니다."
        />
        <FeatureCard 
          icon={<Share2 className="text-brew-amber" />}
          title="Custom Label Art"
          desc="DALL-E 3가 생성하는 세상에 하나뿐인 맥주 아트 라벨."
        />
        <FeatureCard 
          icon={<TrendingUp className="text-brew-amber" />}
          title="Revenue Share"
          desc="레시피를 공개하고 실제 생산 시 수익의 지분을 공유받으세요."
        />
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 text-center border-t border-brew-cream/5 text-brew-cream/20 text-xs tracking-widest uppercase">
        © 2026 Vibe Brewery Platform. All Rights Reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl border border-brew-cream/5 bg-brew-cream/5 space-y-4 hover:border-brew-amber/20 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-brew-cream/5 flex items-center justify-center group-hover:bg-brew-amber/20 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-brew-cream/40 leading-relaxed">{desc}</p>
    </div>
  );
}
