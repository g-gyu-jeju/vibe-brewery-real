import React from 'react';
import { motion } from 'motion/react';
import { Beer, Search, Filter, TrendingUp, Clock, ArrowLeft } from 'lucide-react';

// Mock data for the gallery
const MOCK_BEERS = [
  {
    id: '1',
    name: '새벽의 위로',
    style: 'Stout',
    abv: 6.2,
    description: '지친 하루 끝에 만나는 묵직한 다크 초콜릿과 바닐라의 포옹.',
    image: 'https://picsum.photos/seed/beer1/800/800',
    author: 'BrewMaster_J',
    likes: 128
  },
  {
    id: '2',
    name: '여름날의 첫사랑',
    style: 'Witbier',
    abv: 4.5,
    description: '상큼한 오렌지 껍질과 고수 씨앗의 향긋함이 입안 가득 퍼지는 밀맥주.',
    image: 'https://picsum.photos/seed/beer2/800/800',
    author: 'SummerLover',
    likes: 85
  },
  {
    id: '3',
    name: '루프탑 선셋',
    style: 'IPA',
    abv: 6.8,
    description: '노을처럼 붉은 빛깔과 강렬한 시트러스 홉의 조화.',
    image: 'https://picsum.photos/seed/beer3/800/800',
    author: 'UrbanBrew',
    likes: 242
  },
  {
    id: '4',
    name: '숲속의 휴식',
    style: 'Lager',
    abv: 5.0,
    description: '청량한 탄산감과 은은한 솔잎 향이 느껴지는 깔끔한 라거.',
    image: 'https://picsum.photos/seed/beer4/800/800',
    author: 'NatureBoy',
    likes: 56
  }
];

export default function BreweryPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen pb-24 relative">
      <div className="grain-overlay" />
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-brew-black/80 backdrop-blur-md border-b border-brew-cream/10 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="p-2 rounded-full hover:bg-brew-cream/10 transition-all text-brew-cream/60"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-display">Brewery Gallery</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brew-cream/30" />
              <input 
                type="text" 
                placeholder="맥주 이름, 스타일 검색..."
                className="pl-12 pr-6 py-2 rounded-full bg-brew-cream/5 border border-brew-cream/10 focus:border-brew-amber outline-none transition-all w-64"
              />
            </div>
            <button className="p-2 rounded-full border border-brew-cream/10 hover:bg-brew-cream/5">
              <Filter size={18} className="text-brew-cream/60" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 space-y-12">
        {/* Featured Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl flex items-center gap-2">
              <TrendingUp size={24} className="text-brew-amber" /> Trending Now
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_BEERS.map((beer, i) => (
              <motion.div
                key={beer.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden bg-brew-cream/5 border border-brew-cream/10 hover:border-brew-amber/30 transition-all"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={beer.image} 
                    alt={beer.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brew-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest">
                    {beer.style}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold group-hover:text-brew-amber transition-colors">{beer.name}</h3>
                    <span className="text-xs text-brew-amber font-mono">{beer.abv}%</span>
                  </div>
                  <p className="text-xs text-brew-cream/40 line-clamp-2 leading-relaxed">
                    {beer.description}
                  </p>
                  <div className="pt-4 flex justify-between items-center border-t border-brew-cream/5">
                    <span className="text-[10px] text-brew-cream/30 uppercase tracking-tighter">by {beer.author}</span>
                    <div className="flex items-center gap-1 text-xs text-brew-cream/60">
                      <Beer size={12} className="text-brew-amber" />
                      {beer.likes}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl flex items-center gap-2">
              <Clock size={24} className="text-brew-amber" /> Recently Brewed
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* More mock items could go here */}
            <div className="col-span-full py-24 text-center border-2 border-dashed border-brew-cream/5 rounded-3xl">
              <p className="text-brew-cream/20 italic">더 많은 맥주들이 발효 중입니다...</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
