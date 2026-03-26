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
    <div className="min-h-screen pb-24 px-4 pt-12 max-w-4xl mx-auto space-y-12 relative">
      <div className="grain-overlay" />
      
      {/* Header */}
      <header className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block px-4 py-1 rounded-full border border-brew-amber/30 bg-brew-amber/10 text-brew-amber text-xs tracking-widest uppercase"
        >
          {beer.style}
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-7xl"
        >
          {beer.beer_name}
        </motion.h1>
      </header>

      {/* Result 2: Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'ABV', value: `${beer.abv || 0}%`, icon: <Zap size={16} /> },
          { label: 'IBU', value: beer.ibu || 0, icon: <Droplets size={16} /> },
          { label: 'SRM', value: beer.srm || 0, icon: <Scale size={16} /> },
          { label: 'Batch', value: `${beer.recipe?.batch_size_liters || 20}L`, icon: <Flame size={16} /> },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-brew-cream/5 border border-brew-cream/10 text-center space-y-2"
          >
            <div className="flex justify-center text-brew-amber">{stat.icon}</div>
            <p className="text-[10px] uppercase tracking-widest text-brew-cream/40">{stat.label}</p>
            <p className="text-2xl font-mono text-brew-amber">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Result 3: Description & Pairings */}
      <motion.section 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-3xl">브루어의 노트</h3>
          <p className="text-lg text-brew-cream/70 leading-relaxed italic">
            "{beer.description}"
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl flex items-center gap-2">
            <Utensils size={20} className="text-brew-amber" /> Pairings
          </h3>
          <ul className="space-y-2">
            {beer.food_pairing.map((food) => (
              <li key={food} className="text-brew-cream/60 border-b border-brew-cream/10 pb-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-brew-amber rounded-full" />
                {food}
              </li>
            ))}
          </ul>
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-3 text-sm text-brew-cream/60">
              <Thermometer size={16} className="text-brew-amber" />
              <span>Serving Temp: {beer.serving_temp_celsius}°C</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-brew-cream/60">
              <GlassWater size={16} className="text-brew-amber" />
              <span>Glass: {beer.glass_type}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Result 4: Recipe Card */}
      <motion.section 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-brew-cream/5 border border-brew-cream/10 overflow-hidden"
      >
        <div className="p-8 border-b border-brew-cream/10 bg-brew-amber/5 flex justify-between items-center">
          <h3 className="text-2xl">상세 레시피 (20L 기준)</h3>
          <div className="flex gap-4 text-xs font-mono text-brew-cream/40">
            <span>OG: {beer.recipe?.og || '-'}</span>
            <span>FG: {beer.recipe?.fg || '-'}</span>
          </div>
        </div>
        
        <div className="p-8 space-y-12">
          {/* Fermentables */}
          <div className="space-y-4">
            <h4 className="text-brew-amber text-xs uppercase tracking-widest flex items-center gap-2">
              <Scale size={14} /> Fermentables
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-brew-cream/10 text-brew-cream/40">
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brew-cream/5">
                  {beer.recipe?.fermentables?.map((f, i) => (
                    <tr key={i}>
                      <td className="py-3">{f.name}</td>
                      <td className="py-3">{f.amount_kg} kg</td>
                      <td className="py-3 text-brew-cream/40">{f.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hops */}
          <div className="space-y-4">
            <h4 className="text-brew-amber text-xs uppercase tracking-widest flex items-center gap-2">
              <Wind size={14} /> Hops
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-brew-cream/10 text-brew-cream/40">
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Time</th>
                    <th className="pb-2 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brew-cream/5">
                  {beer.recipe?.hops?.map((h, i) => (
                    <tr key={i}>
                      <td className="py-3">{h.name}</td>
                      <td className="py-3">{h.amount_g} g</td>
                      <td className="py-3">{h.timing}</td>
                      <td className="py-3 text-brew-cream/40">{h.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h4 className="text-brew-amber text-xs uppercase tracking-widest flex items-center gap-2">
              <Flame size={14} /> Brewing Process
            </h4>
            <div className="space-y-3">
              {beer.recipe?.brewing_steps?.map((step, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-brew-cream/5 border border-brew-cream/5">
                  <span className="font-mono text-brew-amber">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-sm text-brew-cream/80">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Result 6: Public/Private Choice */}
      <motion.section 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 gap-6"
      >
        <button className="p-8 rounded-3xl border border-brew-amber/30 bg-brew-amber/5 hover:bg-brew-amber/10 transition-all text-left space-y-4 group">
          <div className="w-12 h-12 rounded-2xl bg-brew-amber flex items-center justify-center text-brew-black">
            <Globe size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold text-brew-amber">브루어리에 공개하기</h4>
            <p className="text-sm text-brew-cream/60">
              이 맥주를 커뮤니티에 공개합니다. 실제 판매 시 수익의 10%를 지분으로 받습니다.
            </p>
          </div>
        </button>

        <button className="p-8 rounded-3xl border border-brew-cream/10 bg-brew-cream/5 hover:bg-brew-cream/10 transition-all text-left space-y-4 group">
          <div className="w-12 h-12 rounded-2xl bg-brew-cream/10 flex items-center justify-center text-brew-cream">
            <Lock size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">나만 보기</h4>
            <p className="text-sm text-brew-cream/60">
              레시피와 이미지를 개인 보관함에 저장합니다. 언제든 다시 확인할 수 있습니다.
            </p>
          </div>
        </button>
      </motion.section>

      <div className="text-center pt-12">
        <button 
          onClick={onReset}
          className="text-brew-cream/40 hover:text-brew-amber transition-all underline underline-offset-4"
        >
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}
