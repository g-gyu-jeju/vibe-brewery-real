import React from 'react';
import { motion } from 'motion/react';
import { Beer, Search, Filter, TrendingUp, Clock, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen pb-24 bg-vb-bg">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-vb-bg/80 backdrop-blur-xl border-b border-vb-on-surface/5 px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full border-2 border-vb-on-surface/10 flex items-center justify-center hover:border-vb-on-surface/30 hover:scale-105 transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-3xl font-headline font-black uppercase tracking-tighter">Gallery</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-vb-on-surface/30" />
              <input 
                type="text" 
                placeholder="Search..."
                className="pl-11 pr-6 py-2.5 rounded-full bg-vb-surface-container border-none focus:ring-2 focus:ring-vb-primary-container outline-none text-sm w-56"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-12 space-y-16">
        {/* Trending Section */}
        <section className="space-y-8">
          <div className="flex items-baseline gap-4">
            <h2 className="font-headline text-4xl font-black uppercase tracking-tighter">
              Trending Now
            </h2>
            <div className="h-px flex-grow bg-vb-on-surface/10" />
          </div>

          {/* Magazine-style asymmetric grid: first card is 2x */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_BEERS.map((beer, i) => (
              <motion.div
                key={beer.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`group rounded-xl overflow-hidden bg-vb-surface border border-vb-on-surface/5 hover:border-vb-primary-container transition-all hover:-translate-y-1 ${
                  i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[4/3] lg:aspect-auto lg:h-[400px]' : 'aspect-square'}`}>
                  <img 
                    src={beer.image} 
                    alt={beer.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-vb-bg/90 backdrop-blur-md text-[10px] font-headline font-black uppercase tracking-widest">
                    {beer.style}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-headline font-black uppercase group-hover:text-vb-primary transition-colors ${
                      i === 0 ? 'text-2xl' : 'text-lg'
                    }`}>
                      {beer.name}
                    </h3>
                    <span className="text-xs text-vb-primary font-mono font-bold">{beer.abv}%</span>
                  </div>
                  <p className="text-xs text-vb-on-surface/40 line-clamp-2 leading-relaxed">
                    {beer.description}
                  </p>
                  <div className="pt-4 flex justify-between items-center border-t border-vb-on-surface/5">
                    <span className="text-[10px] text-vb-on-surface/30 uppercase tracking-wider font-bold">
                      by {beer.author}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-vb-on-surface/50 font-bold">
                      <Beer size={14} className="text-vb-primary" />
                      {beer.likes}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Section */}
        <section className="space-y-8">
          <div className="flex items-baseline gap-4">
            <h2 className="font-headline text-4xl font-black uppercase tracking-tighter">
              Recently Brewed
            </h2>
            <div className="h-px flex-grow bg-vb-on-surface/10" />
          </div>
          <div className="py-24 text-center border-2 border-dashed border-vb-on-surface/10 rounded-xl">
            <div className="text-4xl mb-4">🍺</div>
            <p className="text-vb-on-surface/30 font-headline font-bold uppercase tracking-wider">
              더 많은 맥주들이 발효 중입니다...
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}