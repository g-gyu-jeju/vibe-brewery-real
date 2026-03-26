import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Smile, 
  MapPin, 
  Beer, 
  Zap, 
  MessageSquare,
  Check,
  Loader2
} from 'lucide-react';

type PersonaData = {
  gender: string;
  ageGroup: string;
  moodText: string;
  emotionTags: string[];
  companion: string;
  location: string;
  bitterness: number;
  sweetness: number;
  fruitiness: number;
  carbonation: number;
  abvPreference: string;
  beerStyle: string;
  extraNote: string;
};

const INITIAL_DATA: PersonaData = {
  gender: '',
  ageGroup: '',
  moodText: '',
  emotionTags: [],
  companion: '',
  location: '',
  bitterness: 5,
  sweetness: 5,
  fruitiness: 5,
  carbonation: 5,
  abvPreference: '',
  beerStyle: '',
  extraNote: '',
};

import { generateBeerRecipe } from '../services/geminiService';

export default function CreatePage({ onComplete }: { onComplete: (result: any) => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PersonaData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateData = (updates: Partial<PersonaData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const toggleTag = (tag: string) => {
    setData((prev) => ({
      ...prev,
      emotionTags: prev.emotionTags.includes(tag)
        ? prev.emotionTags.filter((t) => t !== tag)
        : [...prev.emotionTags, tag],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setLoadingText('페르소나를 분석하여 레시피를 설계 중입니다...');
    console.log('Starting recipe generation with data:', data);
    
    try {
      // 1. Generate Recipe
      const beerData = await generateBeerRecipe(data);
      console.log('Recipe generated successfully:', beerData);

      if (!beerData || Object.keys(beerData).length === 0) {
        throw new Error('Generated recipe is empty.');
      }

      onComplete(beerData);
    } catch (error: any) {
      console.error('Generation failed:', error);
      alert(`생성에 실패했습니다: ${error.message || '알 수 없는 오류'}. 다시 시도해주세요.`);
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 7) * 100;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-8">
        <div className="grain-overlay" />
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-t-2 border-brew-amber"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Beer size={40} className="text-brew-amber animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-display text-brew-amber">Brewing in Progress...</h2>
          <p className="text-brew-cream/60">{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 relative overflow-hidden">
      <div className="grain-overlay" />
      
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-12">
        <div className="flex justify-between items-end mb-2">
          <span className="text-brew-amber font-display text-sm tracking-widest uppercase">Step {step} of 7</span>
          <span className="text-brew-cream/40 text-xs font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full bg-brew-cream/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brew-amber"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "circOut" }}
          />
        </div>
      </div>

      <main className="w-full max-w-2xl flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-grow flex flex-col"
          >
            {step === 1 && (
              <Step1 data={data} updateData={updateData} />
            )}
            {step === 2 && (
              <Step2 data={data} updateData={updateData} toggleTag={toggleTag} />
            )}
            {step === 3 && (
              <Step3 data={data} updateData={updateData} />
            )}
            {step === 4 && (
              <Step4 data={data} updateData={updateData} />
            )}
            {step === 5 && (
              <Step5 data={data} updateData={updateData} />
            )}
            {step === 6 && (
              <Step6 data={data} updateData={updateData} />
            )}
            {step === 7 && (
              <Step7 data={data} updateData={updateData} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border border-brew-cream/20 text-brew-cream/60 transition-all hover:bg-brew-cream/5 disabled:opacity-0 disabled:pointer-events-none`}
          >
            <ChevronLeft size={18} />
            Back
          </button>
          
          {step < 7 ? (
            <button
              onClick={nextStep}
              className="group flex items-center gap-2 px-8 py-3 rounded-full bg-brew-amber text-brew-black font-bold transition-all hover:bg-brew-gold hover:scale-105 active:scale-95"
            >
              Next
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-10 py-3 rounded-full bg-brew-amber text-brew-black font-bold transition-all hover:bg-brew-gold hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,129,26,0.3)]"
            >
              Brew My Beer
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

/* --- Step Components (Same as before) --- */
function Step1({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const genders = ['남성', '여성', '논바이너리', '선택 안 함'];
  const ages = ['20대', '30대', '40대', '50대+'];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl mb-2">나는 누구인가</h2>
        <p className="text-brew-cream/60">당신에 대해 조금 더 알려주세요.</p>
      </header>

      <div className="space-y-8">
        <section>
          <h3 className="text-xs uppercase tracking-widest text-brew-amber mb-4 flex items-center gap-2">
            <User size={14} /> 성별
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {genders.map((g) => (
              <button
                key={g}
                onClick={() => updateData({ gender: g })}
                className={`p-4 rounded-xl border transition-all text-left ${
                  data.gender === g 
                    ? 'border-brew-amber bg-brew-amber/10 text-brew-amber' 
                    : 'border-brew-cream/10 bg-brew-cream/5 hover:border-brew-cream/30'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-widest text-brew-amber mb-4">연령대</h3>
          <div className="grid grid-cols-2 gap-3">
            {ages.map((a) => (
              <button
                key={a}
                onClick={() => updateData({ ageGroup: a })}
                className={`p-4 rounded-xl border transition-all text-left ${
                  data.ageGroup === a 
                    ? 'border-brew-amber bg-brew-amber/10 text-brew-amber' 
                    : 'border-brew-cream/10 bg-brew-cream/5 hover:border-brew-cream/30'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Step2({ data, updateData, toggleTag }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void, toggleTag: (t: string) => void }) {
  const tags = ['설렘', '피곤함', '행복함', '쓸쓸함', '신남', '차분함', '성취감', '그리움'];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl mb-2">지금 나의 기분</h2>
        <p className="text-brew-cream/60">현재의 감정이 맥주의 풍미가 됩니다.</p>
      </header>

      <div className="space-y-8">
        <section>
          <h3 className="text-xs uppercase tracking-widest text-brew-amber mb-4 flex items-center gap-2">
            <Smile size={14} /> 자유롭게 적어주세요
          </h3>
          <textarea
            value={data.moodText}
            onChange={(e) => updateData({ moodText: e.target.value })}
            placeholder="지금 기분을 자유롭게 적어주세요..."
            className="w-full h-32 p-4 rounded-xl bg-brew-cream/5 border border-brew-cream/10 focus:border-brew-amber outline-none transition-all resize-none"
          />
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-widest text-brew-amber mb-4">감정 태그 (다중 선택)</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  data.emotionTags.includes(t)
                    ? 'border-brew-amber bg-brew-amber text-brew-black font-medium'
                    : 'border-brew-cream/10 bg-brew-cream/5 hover:border-brew-cream/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Step3({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const companions = ['혼자', '연인과', '친구들과', '동료와', '가족과'];
  const locations = ['집 거실', '루프탑 바', '야외 피크닉', '아늑한 펍', '해변', '캠핑장'];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl mb-2">지금 나의 상황</h2>
        <p className="text-brew-cream/60">어디서 누구와 함께하고 있나요?</p>
      </header>

      <div className="space-y-8">
        <section>
          <h3 className="text-xs uppercase tracking-widest text-brew-amber mb-4 flex items-center gap-2">
            동행자
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {companions.map((c) => (
              <button
                key={c}
                onClick={() => updateData({ companion: c })}
                className={`p-4 rounded-xl border transition-all text-center ${
                  data.companion === c 
                    ? 'border-brew-amber bg-brew-amber/10 text-brew-amber' 
                    : 'border-brew-cream/10 bg-brew-cream/5 hover:border-brew-cream/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-widest text-brew-amber mb-4 flex items-center gap-2">
            <MapPin size={14} /> 장소/분위기
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {locations.map((l) => (
              <button
                key={l}
                onClick={() => updateData({ location: l })}
                className={`p-4 rounded-xl border transition-all text-left ${
                  data.location === l 
                    ? 'border-brew-amber bg-brew-amber/10 text-brew-amber' 
                    : 'border-brew-cream/10 bg-brew-cream/5 hover:border-brew-cream/30'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Step4({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const sliders = [
    { key: 'bitterness', label: '쓴맛 강도', desc: '홉의 쌉싸름함' },
    { key: 'sweetness', label: '단맛 강도', desc: '몰트의 달콤함' },
    { key: 'fruitiness', label: '신맛/과일향 강도', desc: '산뜻하고 화사함' },
    { key: 'carbonation', label: '탄산감', desc: '청량한 목넘김' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl mb-2">원하는 맛의 느낌</h2>
        <p className="text-brew-cream/60">당신이 상상하는 그 맛을 조절해보세요.</p>
      </header>

      <div className="space-y-12 py-4">
        {sliders.map((s) => (
          <section key={s.key} className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-lg font-medium">{s.label}</h3>
                <p className="text-xs text-brew-cream/40">{s.desc}</p>
              </div>
              <span className="text-brew-amber font-mono text-xl">{(data as any)[s.key]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={(data as any)[s.key]}
              onChange={(e) => updateData({ [s.key]: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-brew-cream/10 rounded-full appearance-none cursor-pointer accent-brew-amber"
            />
            <div className="flex justify-between text-[10px] text-brew-cream/20 uppercase tracking-tighter">
              <span>Mild</span>
              <span>Intense</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Step5({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const abvs = [
    { id: 'light', label: '가볍게', range: '1–3.9%', desc: '낮에도 부담 없이 즐기는 청량함' },
    { id: 'medium', label: '적당히', range: '4–5.9%', desc: '가장 대중적이고 밸런스 좋은 도수' },
    { id: 'strong', label: '강하게', range: '6%+', desc: '풍부한 바디감과 묵직한 타격감' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl mb-2">도수 선택</h2>
        <p className="text-brew-cream/60">맥주의 무게감을 결정합니다.</p>
      </header>

      <div className="space-y-4">
        {abvs.map((a) => (
          <button
            key={a.id}
            onClick={() => updateData({ abvPreference: a.label })}
            className={`w-full p-6 rounded-2xl border transition-all text-left flex justify-between items-center group ${
              data.abvPreference === a.label 
                ? 'border-brew-amber bg-brew-amber/10' 
                : 'border-brew-cream/10 bg-brew-cream/5 hover:border-brew-cream/30'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className={`text-xl font-bold ${data.abvPreference === a.label ? 'text-brew-amber' : ''}`}>{a.label}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-brew-cream/10 text-brew-cream/60">{a.range}</span>
              </div>
              <p className="text-sm text-brew-cream/40">{a.desc}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
              data.abvPreference === a.label ? 'bg-brew-amber border-brew-amber' : 'border-brew-cream/20'
            }`}>
              {data.abvPreference === a.label && <Check size={14} className="text-brew-black" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step6({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const styles = [
    { name: '라거', desc: '청량하고 깔끔한 맛', icon: '🍺' },
    { name: '에일', desc: '풍부하고 향긋한 풍미', icon: '🍷' },
    { name: '위트', desc: '부드럽고 은은한 밀 향', icon: '🌾' },
    { name: 'IPA', desc: '홉 향이 강렬하고 쌉싸름', icon: '🌿' },
    { name: '스타우트', desc: '진하고 묵직한 흑맥주', icon: '☕' },
    { name: '사워', desc: '새콤하고 독특한 매력', icon: '🍋' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl mb-2">맥주 스타일</h2>
        <p className="text-brew-cream/60">기본이 되는 맥주의 성격을 골라주세요.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {styles.map((s) => (
          <button
            key={s.name}
            onClick={() => updateData({ beerStyle: s.name })}
            className={`p-6 rounded-2xl border transition-all text-left flex gap-4 items-start ${
              data.beerStyle === s.name 
                ? 'border-brew-amber bg-brew-amber/10' 
                : 'border-brew-cream/10 bg-brew-cream/5 hover:border-brew-cream/30'
            }`}
          >
            <span className="text-3xl">{s.icon}</span>
            <div className="space-y-1">
              <h3 className={`text-lg font-bold ${data.beerStyle === s.name ? 'text-brew-amber' : ''}`}>{s.name}</h3>
              <p className="text-xs text-brew-cream/40 leading-relaxed">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step7({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl mb-2">마지막 한 마디</h2>
        <p className="text-brew-cream/60">이 맥주에 담고 싶은 특별한 이야기가 있나요?</p>
      </header>

      <div className="space-y-6">
        <section>
          <h3 className="text-xs uppercase tracking-widest text-brew-amber mb-4 flex items-center gap-2">
            <MessageSquare size={14} /> 특별 요청 (선택 사항)
          </h3>
          <textarea
            value={data.extraNote}
            onChange={(e) => updateData({ extraNote: e.target.value })}
            placeholder="예: '첫사랑의 아련함을 담아주세요', '캠핑장에서 마시기 좋은 맥주였으면 해요' 등..."
            className="w-full h-48 p-6 rounded-2xl bg-brew-cream/5 border border-brew-cream/10 focus:border-brew-amber outline-none transition-all resize-none text-lg"
          />
        </section>

        <div className="p-6 rounded-2xl bg-brew-amber/5 border border-brew-amber/20 flex gap-4 items-start">
          <Zap size={20} className="text-brew-amber shrink-0 mt-1" />
          <p className="text-sm text-brew-cream/60 leading-relaxed">
            이제 AI가 당신의 페르소나를 분석하여 세상에 단 하나뿐인 맥주 레시피를 생성합니다. 
            잠시만 기다려주세요!
          </p>
        </div>
      </div>
    </div>
  );
}
