import React, { useEffect, useState } from 'react';
import { Brain, Upload, Sparkles, BookOpen, Github } from 'lucide-react';
import PiVisualization from './components/PiVisualization';
import PatternFinder from './components/PatternFinder';
import GenerativeArt from './components/GenerativeArt';
import Education from './components/Education';

function App() {
  const [activeTab, setActiveTab] = useState('visualization');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-6xl font-bold text-white animate-pulse">π</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold">PiVerse</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/bhanvinayer/piverse.git" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64 flex-shrink-0">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sticky top-20">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('visualization')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'visualization' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                    }`}>
                    <Sparkles className="w-5 h-5" />
                    <span>Visualization</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('patterns')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'patterns' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                    }`}>
                    <Brain className="w-5 h-5" />
                    <span>Pattern Finder</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('art')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'art' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                    }`}>
                    <Upload className="w-5 h-5" />
                    <span>Generative Art</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('learn')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'learn' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                    }`}>
                    <BookOpen className="w-5 h-5" />
                    <span>Learn</span>
                  </button>
                </nav>
              </div>
            </div>

            <main className="flex-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                {activeTab === 'visualization' && <PiVisualization />}
                {activeTab === 'patterns' && <PatternFinder />}
                {activeTab === 'art' && <GenerativeArt />}
                {activeTab === 'learn' && <Education />}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;