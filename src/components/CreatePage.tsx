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
    
    try {
      const beerData = await generateBeerRecipe(data);
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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-8 bg-vb-bg">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-t-2 border-vb-primary-container border-r-2"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Beer size={40} className="text-vb-on-surface" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-headline font-black uppercase tracking-tighter">Brewing...</h2>
          <p className="text-vb-on-surface/50">{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vb-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-vb-bg px-6 py-4 max-w-[1440px] mx-auto flex justify-between items-center">
        <div className="text-3xl font-black text-vb-on-surface tracking-tighter font-headline uppercase">
          Vibe Brewery
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 pt-8 pb-32">
        {/* Progress Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-headline text-sm uppercase tracking-widest text-vb-primary font-bold">
              The Brew Wizard — Step {step} of 7
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter mt-4 uppercase italic">
              {step === 1 && <>Craft Your <br/><span className="text-vb-primary-container bg-vb-on-surface px-4 py-1 not-italic">Identity.</span></>}
              {step === 2 && <>Current <br/><span className="text-vb-primary-container bg-vb-on-surface px-4 py-1 not-italic">Mood.</span></>}
              {step === 3 && <>Your <br/><span className="text-vb-primary-container bg-vb-on-surface px-4 py-1 not-italic">Setting.</span></>}
              {step === 4 && <>Flavor <br/><span className="text-vb-primary-container bg-vb-on-surface px-4 py-1 not-italic">Profile.</span></>}
              {step === 5 && <>ABV <br/><span className="text-vb-primary-container bg-vb-on-surface px-4 py-1 not-italic">Impact.</span></>}
              {step === 6 && <>The <br/><span className="text-vb-primary-container bg-vb-on-surface px-4 py-1 not-italic">Foundation.</span></>}
              {step === 7 && <>The <br/><span className="text-vb-primary-container bg-vb-on-surface px-4 py-1 not-italic">Soul.</span></>}
            </h1>
          </div>
          {/* Step Indicators */}
          <div className="flex gap-2 h-1 items-center">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className={`h-full rounded-full transition-all duration-500 ${
                  i + 1 <= step ? 'w-12 bg-vb-primary-container' : 'w-8 bg-vb-surface-container'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {step === 1 && <Step1 data={data} updateData={updateData} />}
            {step === 2 && <Step2 data={data} updateData={updateData} toggleTag={toggleTag} />}
            {step === 3 && <Step3 data={data} updateData={updateData} />}
            {step === 4 && <Step4 data={data} updateData={updateData} />}
            {step === 5 && <Step5 data={data} updateData={updateData} />}
            {step === 6 && <Step6 data={data} updateData={updateData} />}
            {step === 7 && <Step7 data={data} updateData={updateData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-16 flex justify-between items-center max-w-3xl">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 border-vb-on-surface/10 text-vb-on-surface/60 font-headline font-bold uppercase transition-all hover:border-vb-on-surface/30 disabled:opacity-0 disabled:pointer-events-none`}
          >
            <ChevronLeft size={18} />
            Back
          </button>
          
          {step < 7 ? (
            <button
              onClick={nextStep}
              className="group flex items-center gap-2 px-10 py-3 rounded-full bg-vb-primary-container text-vb-on-surface font-headline font-black uppercase tracking-tighter transition-all hover:scale-105 active:scale-95"
            >
              Next
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-12 py-4 rounded-full bg-vb-primary-container text-vb-on-surface font-headline font-black text-xl uppercase italic tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Submit Blueprint
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

/* --- Pill Button Component --- */
function PillButton({ selected, onClick, children, className = '' }: { selected: boolean, onClick: () => void, children: React.ReactNode, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-headline font-bold uppercase transition-all hover:scale-105 ${
        selected
          ? 'bg-vb-on-surface text-vb-bg'
          : 'bg-vb-surface-container text-vb-on-surface hover:bg-vb-surface-high'
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* --- Card Button Component --- */
function CardButton({ selected, onClick, children, className = '' }: { selected: boolean, onClick: () => void, children: React.ReactNode, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 rounded-xl border-2 font-headline text-2xl font-black transition-colors ${
        selected
          ? 'border-vb-on-surface bg-vb-primary-container'
          : 'border-vb-on-surface/5 bg-vb-surface hover:bg-vb-primary-container/50'
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* --- Step Components --- */
function Step1({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const genders = ['남성', '여성', '논바이너리', '선택 안 함'];
  const ages = ['20대', '30대', '40대', '50대+'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
      <div className="md:col-span-5 space-y-12">
        <div>
          <p className="text-lg text-vb-on-surface/60 mb-12 max-w-sm">
            Every great brew starts with the soul. Tell us who's holding the glass.
          </p>
        </div>

        <div>
          <span className="block text-xs font-black uppercase tracking-widest mb-4">Identity</span>
          <div className="flex flex-wrap gap-3">
            {genders.map((g) => (
              <PillButton key={g} selected={data.gender === g} onClick={() => updateData({ gender: g })}>
                {g}
              </PillButton>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-xs font-black uppercase tracking-widest mb-4">Age Group</span>
          <div className="grid grid-cols-2 gap-3">
            {ages.map((a) => (
              <CardButton key={a} selected={data.ageGroup === a} onClick={() => updateData({ ageGroup: a })}>
                {a}
              </CardButton>
            ))}
          </div>
        </div>
      </div>

      <div className="md:col-span-7 relative hidden md:block">
        <div className="aspect-[4/5] bg-vb-surface-container rounded-xl overflow-hidden flex items-center justify-center" style={{ marginRight: '-10%' }}>
          <div className="text-center p-12">
            <User size={80} className="text-vb-on-surface/20 mx-auto mb-8" />
            <p className="font-headline text-4xl font-black text-vb-on-surface/10 uppercase">Persona</p>
          </div>
        </div>
        <div className="absolute -bottom-10 -left-10 bg-vb-primary-container p-10 rounded-xl max-w-xs rotate-3">
          <p className="font-headline font-bold text-lg uppercase leading-tight text-vb-on-surface">
            The character defines the chemistry.
          </p>
        </div>
      </div>
    </div>
  );
}

function Step2({ data, updateData, toggleTag }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void, toggleTag: (tag: string) => void }) {
  const emotions = ['지친', '설레는', '우울한', '신나는', '차분한', '감성적인', '여유로운', '도전적인', '그리운', '행복한'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="space-y-8">
        <p className="text-xl italic font-light mb-8 text-vb-on-surface/60">
          How are we feeling right now? Select all that apply.
        </p>

        <div className="flex flex-wrap gap-3">
          {emotions.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-6 py-2 rounded-full border-2 font-headline font-bold uppercase transition-all ${
                data.emotionTags.includes(tag)
                  ? 'border-vb-on-surface bg-vb-primary-container'
                  : 'border-vb-on-surface/10 hover:border-vb-on-surface'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="pt-8">
          <label className="block text-xs font-black uppercase tracking-widest mb-4">오늘 하루를 들려주세요</label>
          <textarea
            value={data.moodText}
            onChange={(e) => updateData({ moodText: e.target.value })}
            placeholder="오늘 어떤 하루를 보내셨나요..."
            className="w-full bg-vb-surface-container border-none rounded-xl p-6 focus:ring-2 focus:ring-vb-primary-container text-lg resize-none outline-none"
            rows={4}
          />
        </div>
      </div>

      <div className="bg-vb-secondary p-12 rounded-xl flex flex-col justify-end min-h-[400px] hidden md:flex">
        <Smile size={80} className="text-vb-bg mb-8" />
        <h3 className="font-headline text-5xl font-black text-vb-bg uppercase leading-none italic">
          Emotion<br />Driven<br />Extracts
        </h3>
      </div>
    </div>
  );
}

function Step3({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const companions = ['혼자', '연인과', '친구들과', '동료와', '가족과'];
  const locations = ['집 거실', '루프탑 바', '야외 피크닉', '아늑한 펍', '해변', '캠핑장'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-vb-surface-container p-8 rounded-xl">
        <span className="block text-xs font-black uppercase tracking-widest mb-8">Who are you with?</span>
        <div className="space-y-3">
          {companions.map((c) => (
            <label
              key={c}
              onClick={() => updateData({ companion: c })}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                data.companion === c ? 'bg-vb-primary-container' : 'bg-vb-surface hover:bg-vb-surface-dim'
              }`}
            >
              <span className="font-headline font-bold uppercase">{c}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                data.companion === c ? 'border-vb-on-surface bg-vb-on-surface' : 'border-vb-on-surface/20'
              }`}>
                {data.companion === c && <Check size={12} className="text-vb-bg" />}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {locations.map((l) => (
          <button
            key={l}
            onClick={() => updateData({ location: l })}
            className={`aspect-square rounded-xl flex items-center justify-center font-headline font-bold uppercase tracking-widest text-sm transition-all ${
              data.location === l
                ? 'bg-vb-primary-container ring-4 ring-vb-primary-container text-vb-on-surface'
                : 'bg-vb-surface-container text-vb-on-surface/60 hover:bg-vb-surface-high'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step4({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const sliders = [
    { key: 'bitterness', label: 'Bitterness', desc: '홉의 쌉싸름함', minLabel: 'Smooth', maxLabel: 'Abrasive' },
    { key: 'sweetness', label: 'Sweetness', desc: '몰트의 달콤함', minLabel: 'Bone Dry', maxLabel: 'Dessert' },
    { key: 'fruitiness', label: 'Fruitiness', desc: '산뜻하고 화사함', minLabel: 'Earthy', maxLabel: 'Tropical' },
    { key: 'carbonation', label: 'Carbonation', desc: '청량한 목넘김', minLabel: 'Flat', maxLabel: 'Effervescent' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-center text-vb-on-surface/50 mb-16 uppercase tracking-[0.2em] text-sm font-bold">
        Fine-tune the sensory variables
      </p>

      <div className="space-y-16">
        {sliders.map((s) => (
          <div key={s.key} className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-headline text-2xl font-black uppercase italic">{s.label}</span>
                <p className="text-xs text-vb-on-surface/40 mt-1">{s.desc}</p>
              </div>
              <span className="font-headline text-4xl font-black text-vb-primary">
                {String((data as any)[s.key]).padStart(2, '0')}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={(data as any)[s.key]}
              onChange={(e) => updateData({ [s.key]: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] font-black uppercase text-vb-on-surface/20">
              <span>{s.minLabel}</span>
              <span>{s.maxLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step5({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const abvs = [
    { id: 'light', label: '가볍게', range: '1–3.9%', desc: 'Sessionable, crisp, and ready for a long afternoon.' },
    { id: 'medium', label: '적당히', range: '4–5.9%', desc: 'The balanced middle ground. The gold standard.' },
    { id: 'strong', label: '강하게', range: '6%+', desc: 'Bold, heavy-hitting, and deeply complex profiles.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {abvs.map((a) => (
        <div
          key={a.id}
          onClick={() => updateData({ abvPreference: a.label })}
          className="group cursor-pointer"
        >
          <div className={`h-64 rounded-xl mb-6 flex items-center justify-center transition-all ${
            data.abvPreference === a.label
              ? 'bg-vb-on-surface text-vb-bg'
              : 'bg-vb-surface-container text-vb-on-surface group-hover:bg-vb-primary-container'
          }`}>
            <div className="text-center">
              <span className="font-headline text-5xl md:text-6xl font-black block">{a.range}</span>
              <span className={`font-headline font-bold uppercase tracking-widest ${
                data.abvPreference === a.label ? 'text-vb-primary-container' : 'opacity-40'
              }`}>
                {a.id}
              </span>
            </div>
          </div>
          <p className="text-sm uppercase font-bold leading-tight">{a.desc}</p>
        </div>
      ))}
    </div>
  );
}

function Step6({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  const styles = [
    { name: '라거', icon: '🍺' },
    { name: '에일', icon: '🍷' },
    { name: '위트', icon: '🌾' },
    { name: 'IPA', icon: '🌿' },
    { name: '스타우트', icon: '☕' },
    { name: '사워', icon: '🍋' },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
        <div />
        <p className="text-sm font-bold uppercase text-vb-on-surface/40 max-w-xs md:text-right">
          Select your preferred base style. We'll build your custom vibe from here.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-vb-on-surface/5 rounded-xl overflow-hidden border border-vb-on-surface/5">
        {styles.map((s) => (
          <button
            key={s.name}
            onClick={() => updateData({ beerStyle: s.name })}
            className={`p-10 flex flex-col items-center justify-center transition-colors ${
              data.beerStyle === s.name
                ? 'bg-vb-primary-container'
                : 'bg-vb-bg hover:bg-vb-primary-container/30'
            }`}
          >
            <span className="text-4xl mb-4">{s.icon}</span>
            <span className="font-headline font-black uppercase text-xl">{s.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step7({ data, updateData }: { data: PersonaData, updateData: (u: Partial<PersonaData>) => void }) {
  return (
    <div className="max-w-4xl">
      <div className="flex items-baseline gap-4 mb-12">
        <div className="h-px flex-grow bg-vb-on-surface/10" />
      </div>

      <div className="bg-vb-surface-container p-1 rounded-xl">
        <label className="block p-8 pb-2 text-xs font-black uppercase tracking-[0.3em] text-vb-on-surface/30">
          이 맥주에 담고 싶은 특별한 이야기가 있나요?
        </label>
        <textarea
          value={data.extraNote}
          onChange={(e) => updateData({ extraNote: e.target.value })}
          placeholder="예: '첫사랑의 아련함을 담아주세요'..."
          className="w-full bg-transparent border-none p-8 font-headline text-2xl md:text-4xl font-bold placeholder:text-vb-on-surface/10 focus:ring-0 min-h-[250px] resize-none outline-none"
        />
      </div>

      <div className="mt-12 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-vb-on-surface flex items-center justify-center">
          <Zap size={20} />
        </div>
        <p className="text-xs font-black uppercase tracking-widest max-w-[280px] text-vb-on-surface/50">
          AI가 당신의 페르소나를 분석하여 레시피를 생성합니다.
        </p>
      </div>
    </div>
  );
}