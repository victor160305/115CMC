import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, ChevronRight, X, PlayCircle } from 'lucide-react';

const LOADING_IMAGES = [
  "https://picsum.photos/seed/classical/300/300",
  "https://picsum.photos/seed/piano/300/300",
  "https://picsum.photos/seed/violin/300/300",
  "https://picsum.photos/seed/orchestra/300/300"
];

function LoadingSequencePage({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 8000; // 8 seconds total (4 stages * 2 seconds)

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(onNext, 800);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [onNext]);

  const currentImageIndex = Math.min(Math.floor(progress / 25), 3);
  const currentImage = LOADING_IMAGES[currentImageIndex];
  
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full bg-slate-900 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-16 tracking-widest text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        國樂社畢演會曲目表
      </motion.h1>
      
      <div className="relative flex items-center justify-center mb-12">
        <svg width="240" height="240" viewBox="0 0 240 240" className="transform -rotate-90 drop-shadow-2xl absolute z-10">
          {/* Background circle */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-slate-800"
          />
          {/* Animated progress circle */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            className="text-indigo-500"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        
        {/* Center Image Container */}
        <div className="w-[180px] h-[180px] rounded-full overflow-hidden relative z-0 bg-slate-800">
          <AnimatePresence>
            <motion.img 
              key={currentImageIndex}
              src={currentImage}
              alt={`Loading stage ${currentImageIndex}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col items-center h-20">
        <div className="text-4xl font-bold text-indigo-300 mb-2 tabular-nums">
          {Math.floor(progress)}%
        </div>
        <p className="text-slate-400 tracking-widest text-sm">
          {progress >= 100 ? '載入完成' : '載入中...'}
        </p>
      </div>
    </motion.div>
  );
}

function PopupPage({ onNext }: { onNext: () => void }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="flex flex-col h-full bg-slate-900 text-white relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {/* Background content (blurred/dimmed when popup shows) */}
      <div className={`p-6 pt-12 transition-all duration-700 ${showPopup ? 'blur-md opacity-40 scale-95' : ''}`}>
        <h2 className="text-2xl font-bold mb-8">畢演曲目</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-slate-800/50 rounded-2xl animate-pulse border border-slate-700/50"></div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center p-6 z-10 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-700 relative overflow-hidden"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Decorative background element */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                  <Music className="w-7 h-7" />
                </div>
                <button 
                  onClick={onNext} 
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <h3 className="text-2xl font-bold mb-3 relative z-10">準備好聆聽了嗎？</h3>
              <p className="text-slate-300 mb-8 leading-relaxed relative z-10">
                接下來，我們將為您介紹幾首經典的古典樂曲。請開啟您的音量，享受這趟音樂之旅。
              </p>
              <button 
                onClick={onNext}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-indigo-500/25 relative z-10"
              >
                進入樂曲介紹
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const MUSICS = [
  {
    id: 1,
    title: "命運交響曲",
    composer: "貝多芬",
    description: "《C小調第五交響曲》，作品67，是路德維希·范·貝多芬於1804年至1808年間創作的四樂章交響曲。這首交響曲是古典音樂中最受歡迎、最著名的作品之一，其開頭的四個音符被稱為「命運的敲門聲」。",
    tags: ["古典", "交響樂", "震撼"]
  },
  {
    id: 2,
    title: "G大調弦樂小夜曲",
    composer: "莫札特",
    description: "《G大調弦樂小夜曲》，K. 525，是沃夫岡·阿瑪迪斯·莫札特於1787年創作的一首小夜曲。這首作品是莫札特最著名的作品之一，旋律輕快優美，充滿了維也納的古典氣息。",
    tags: ["弦樂", "輕快", "經典"]
  },
  {
    id: 3,
    title: "天鵝湖",
    composer: "柴可夫斯基",
    description: "《天鵝湖》，作品20，是彼得·伊里奇·柴可夫斯基於1875年至1876年間創作的芭蕾舞劇音樂。這部作品充滿了浪漫主義色彩，旋律優美動人，是芭蕾舞劇的巔峰之作。",
    tags: ["芭蕾舞", "浪漫", "管弦樂"]
  },
  {
    id: 4,
    title: "月光",
    composer: "德布西",
    description: "《月光》（Clair de lune）是法國作曲家克勞德·德布西《貝加馬斯克組曲》的第三樂章。這首鋼琴曲以其夢幻般的意境和細膩的音色變化而聞名，是印象派音樂的代表作。",
    tags: ["鋼琴", "印象派", "柔美"]
  }
];

function MusicListPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <motion.div 
      className="flex flex-col h-full bg-slate-900 text-white overflow-y-auto pb-10"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="p-6 pt-12 sticky top-0 bg-slate-900/90 backdrop-blur-md z-10 border-b border-slate-800/50">
        <h2 className="text-2xl font-bold tracking-wide">樂曲介紹</h2>
        <p className="text-indigo-400 text-sm mt-1">探索經典名曲的背後故事</p>
      </div>

      <div className="p-6 space-y-4">
        {MUSICS.map((music, index) => (
          <motion.div 
            key={music.id}
            className={`bg-slate-800/80 rounded-2xl overflow-hidden border transition-all duration-300 ${
              selectedId === music.id 
                ? 'border-indigo-500 shadow-lg shadow-indigo-500/10' 
                : 'border-slate-700/50 hover:border-slate-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className="p-5 cursor-pointer flex items-center justify-between"
              onClick={() => setSelectedId(selectedId === music.id ? null : music.id)}
            >
              <div>
                <h3 className="text-lg font-bold mb-1">{music.title}</h3>
                <p className="text-slate-400 text-sm">{music.composer}</p>
              </div>
              <motion.div
                animate={{ rotate: selectedId === music.id ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <PlayCircle className={`w-8 h-8 transition-colors ${selectedId === music.id ? 'text-indigo-400' : 'text-slate-600'}`} />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {selectedId === music.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-5 pb-5"
                >
                  <div className="pt-4 border-t border-slate-700/50">
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      {music.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {music.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-slate-900 text-indigo-300 text-xs rounded-md font-medium border border-slate-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-black flex justify-center items-center overflow-hidden font-sans">
      {/* Mobile container - simulates a mobile screen on desktop, takes full screen on mobile */}
      <div className="w-full max-w-md h-[100dvh] bg-slate-900 relative shadow-2xl overflow-hidden sm:h-[850px] sm:rounded-[2.5rem] sm:border-8 sm:border-slate-800">
        <AnimatePresence mode="wait">
          {step === 1 && <LoadingSequencePage key="page1" onNext={() => setStep(2)} />}
          {step === 2 && <PopupPage key="page2" onNext={() => setStep(3)} />}
          {step === 3 && <MusicListPage key="page3" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
