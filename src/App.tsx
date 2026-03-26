/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CreatePage from './components/CreatePage';
import ResultPage from './components/ResultPage';
import BreweryPage from './components/BreweryPage';

type ViewState = 'landing' | 'create' | 'result' | 'brewery';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [result, setResult] = useState<any>(null);

  const handleComplete = (data: any) => {
    setResult(data);
    setView('result');
  };

  const handleReset = () => {
    setResult(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-brew-black text-brew-cream font-sans">
      {view === 'landing' && (
        <LandingPage 
          onStart={() => setView('create')} 
          onGoToGallery={() => setView('brewery')} 
        />
      )}
      
      {view === 'create' && (
        <CreatePage onComplete={handleComplete} />
      )}
      
      {view === 'result' && result && (
        <ResultPage beer={result} onReset={handleReset} />
      )}
      
      {view === 'brewery' && (
        <BreweryPage onBack={() => setView('landing')} />
      )}
    </div>
  );
}
