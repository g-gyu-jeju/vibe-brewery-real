import React from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  Globe, 
  Lock, 
  Thermometer, 
  GlassWater, 
  Utensils,
  Scale,
  Droplets,
  Flame,
  Wind,
  Zap
} from 'lucide-react';

type BeerResult = {
  beer_name: string;
  style: string;
  abv: number;
  ibu: number;
  srm: number;
  description: string;
  recipe: {
    batch_size_liters: number;
    boil_time_min: number;
    mash_temp_celsius: number;
    og: number;
    fg: number;
    fermentables: Array<{ name: string; amount_kg: number; type: string; description: string }>;
    hops: Array<{ name: string; amount_g: number; alpha_acid_percent: number; timing: string; purpose: string }>;
    yeast: { name: string; lab: string; attenuation_percent: number; description: string };
    brewing_steps: string[];
  };
  glass_type: string;
  color_hex: string;
  serving_temp_celsius: number;
  food_pairing: string[];
};

export default function ResultPage({ beer, onReset }: { beer: BeerResult, onReset: () => void }) {
  return (
    <div className="min-h-screen bg-vb-bg pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-vb-bg px-6 py-4 max-w-[1440px] mx-auto">
        <div className="text-3xl font-black text-vb-on-surface tracking-tighter font-headline uppercase">
          Vibe Brewery
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 pt-8 space-y-16">
        {/* Hero Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-6"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-vb-primary-container text-vb-on-surface font-headline font-bold text-xs tracking-widest uppercase">
            {beer.style}
          </span>
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter uppercase">
            {beer.beer_name}
          </h1>
        </motion.div>

        {/* Stats — Typography driven, no cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-vb-on-surface/10 divide-x divide-vb-on-surface/10"
        >
          {[
            { label: 'ABV', value: `${beer.abv || 0}%` },
            { label: 'IBU', value: beer.ibu || 0 },
            { label: 'SRM', value: beer.srm || 0 },
            { label: 'Batch', value: `${beer.recipe?.batch_size_liters || 20}L` },
          ].map((stat) => (
            <div key={stat.label} className="py-8 px-6 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-vb-on-surface/30 font-black mb-2">{stat.label}</p>
              <p className="text-4xl md:text-5xl font-headline font-black text-vb-primary">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Description & Pairings */}
        <motion.section 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 pt-8"
        >
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-headline text-3xl font-black uppercase">브루어의 노트</h3>
            <p className="text-lg text-vb-on-surface/60 leading-relaxed italic">
              "{beer.description}"
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-headline font-black uppercase flex items-center gap-2">
              <Utensils size={20} className="text-vb-primary" /> Pairings
            </h3>
            <ul className="space-y-3">
              {beer.food_pairing.map((food) => (
                <li key={food} className="text-vb-on-surface/60 border-b border-vb-on-surface/5 pb-3 flex items-center gap-3">
                  <span className="w-2 h-2 bg-vb-primary-container rounded-full flex-shrink-0" />
                  {food}
                </li>
              ))}
            </ul>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-vb-on-surface/50">
                <Thermometer size={16} className="text-vb-primary" />
                <span>Serving Temp: {beer.serving_temp_celsius}°C</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-vb-on-surface/50">
                <GlassWater size={16} className="text-vb-primary" />
                <span>Glass: {beer.glass_type}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Recipe Card */}
        <motion.section 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-xl bg-vb-surface border border-vb-on-surface/5 overflow-hidden"
        >
          <div className="p-8 border-b border-vb-on-surface/5 bg-vb-primary-container/20 flex justify-between items-center">
            <h3 className="font-headline text-2xl font-black uppercase">상세 레시피 (20L 기준)</h3>
            <div className="flex gap-4 text-xs font-mono text-vb-on-surface/40 font-bold">
              <span>OG: {beer.recipe?.og || '-'}</span>
              <span>FG: {beer.recipe?.fg || '-'}</span>
            </div>
          </div>
          
          <div className="p-8 space-y-12">
            {/* Fermentables */}
            <div className="space-y-4">
              <h4 className="text-vb-primary text-xs uppercase tracking-widest font-black flex items-center gap-2">
                <Scale size={14} /> Fermentables
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-vb-on-surface/10 text-vb-on-surface/30">
                      <th className="pb-3 font-black uppercase text-xs tracking-wider">Name</th>
                      <th className="pb-3 font-black uppercase text-xs tracking-wider">Amount</th>
                      <th className="pb-3 font-black uppercase text-xs tracking-wider">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-vb-on-surface/5 font-mono">
                    {beer.recipe?.fermentables?.map((f, i) => (
                      <tr key={i}>
                        <td className="py-3 font-body">{f.name}</td>
                        <td className="py-3">{f.amount_kg} kg</td>
                        <td className="py-3 text-vb-on-surface/40">{f.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hops */}
            <div className="space-y-4">
              <h4 className="text-vb-primary text-xs uppercase tracking-widest font-black flex items-center gap-2">
                <Wind size={14} /> Hops
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-vb-on-surface/10 text-vb-on-surface/30">
                      <th className="pb-3 font-black uppercase text-xs tracking-wider">Name</th>
                      <th className="pb-3 font-black uppercase text-xs tracking-wider">Amount</th>
                      <th className="pb-3 font-black uppercase text-xs tracking-wider">Time</th>
                      <th className="pb-3 font-black uppercase text-xs tracking-wider">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-vb-on-surface/5 font-mono">
                    {beer.recipe?.hops?.map((h, i) => (
                      <tr key={i}>
                        <td className="py-3 font-body">{h.name}</td>
                        <td className="py-3">{h.amount_g} g</td>
                        <td className="py-3">{h.timing}</td>
                        <td className="py-3 text-vb-on-surface/40">{h.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <h4 className="text-vb-primary text-xs uppercase tracking-widest font-black flex items-center gap-2">
                <Flame size={14} /> Brewing Process
              </h4>
              <div className="space-y-3">
                {beer.recipe?.brewing_steps?.map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-vb-surface-dim/50">
                    <span className="font-mono text-vb-primary font-black">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm text-vb-on-surface/70">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Public/Private Choice */}
        <motion.section 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6"
        >
          <button className="p-8 rounded-xl bg-vb-primary-container text-left space-y-4 group hover:scale-[1.02] transition-all active:scale-[0.98]">
            <div className="w-12 h-12 rounded-full bg-vb-on-surface flex items-center justify-center text-vb-bg">
              <Globe size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-headline font-black uppercase">브루어리에 공개하기</h4>
              <p className="text-sm text-vb-on-surface/60">
                이 맥주를 커뮤니티에 공개합니다. 실제 판매 시 수익의 10%를 지분으로 받습니다.
              </p>
            </div>
          </button>

          <button className="p-8 rounded-xl border-2 border-vb-on-surface/10 bg-vb-surface text-left space-y-4 group hover:border-vb-on-surface/30 hover:scale-[1.02] transition-all active:scale-[0.98]">
            <div className="w-12 h-12 rounded-full border-2 border-vb-on-surface/20 flex items-center justify-center text-vb-on-surface">
              <Lock size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-headline font-black uppercase">나만 보기</h4>
              <p className="text-sm text-vb-on-surface/60">
                레시피와 이미지를 개인 보관함에 저장합니다. 언제든 다시 확인할 수 있습니다.
              </p>
            </div>
          </button>
        </motion.section>

        <div className="text-center pt-8">
          <button 
            onClick={onReset}
            className="text-vb-on-surface/30 hover:text-vb-on-surface transition-all font-headline font-bold uppercase tracking-widest text-sm underline underline-offset-4"
          >
            처음으로 돌아가기
          </button>
        </div>
      </main>
    </div>
  );
}