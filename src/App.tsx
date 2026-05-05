import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, ChevronRight, X, PlayCircle, GraduationCap, Users, HeartHandshake, ChevronDown } from 'lucide-react';
import jungleKingImg from './assets/images/IMG_7706.jpg';

const LOADING_IMAGES = [
  "https://picsum.photos/seed/classical/300/300",
  "https://picsum.photos/seed/piano/300/300",
  "https://picsum.photos/seed/violin/300/300",
  "https://picsum.photos/seed/orchestra/300/300"
];

function LoadingSequencePage({ onNext }: { key?: string; onNext: () => void }) {
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
      className="flex flex-col items-center justify-center h-screen w-full bg-slate-900 text-white p-6"
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
        115級白沙國樂社
        <br />畢演會節目單
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

function PopupPage({ onNext }: { key?: string; onNext: () => void }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="flex flex-col h-screen w-full bg-slate-900 text-white relative"
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
              <div className="text-slate-300 mb-8 leading-relaxed relative z-10 text-sm space-y-2">
                <p>為維持高品質的演出環境，請配合以下事項：</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>演出期間請將手機調至<strong className="text-white">靜音</strong>或關機。</li>
                  <li>全程<strong className="text-white">禁止使用閃光燈</strong>拍照。</li>
                  <li>樂曲與樂章之間請保持安靜，待整首樂曲結束後再給予掌聲鼓勵。</li>
                  <li>場內請勿飲食及大聲喧嘩。</li>
                </ul>
                <p className="pt-2 text-indigo-300 font-medium">感謝您的配合，祝您有個美好的音樂饗宴！</p>
              </div>
              <button 
                onClick={onNext}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-indigo-500/25 relative z-10"
              >
                進入節目單
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// -------------------------------------------------------------
// 【 頁籤一：畢業生介紹 】
// -------------------------------------------------------------
const GRADUATES = [
  { id: 1, name: "林隆溫", instrument: "待補", description: "林隆溫的介紹文字即將在此更新...", photo: "https://picsum.photos/seed/grad1/400/400" },
  { id: 2, name: "謝菁芸", instrument: "待補", description: "謝菁芸的介紹文字即將在此更新...", photo: "https://picsum.photos/seed/grad2/400/400" },
  { id: 3, name: "蘇昱豪", instrument: "待補", description: "蘇昱豪的介紹文字即將在此更新...", photo: "https://picsum.photos/seed/grad3/400/400" },
  { id: 4, name: "鍾翔蓁", instrument: "待補", description: "鍾翔蓁的介紹文字即將在此更新...", photo: "https://picsum.photos/seed/grad4/400/400" }
];

function GraduatesPage({ key }: { key?: string }) {
  return (
    <motion.div 
      className="flex flex-col h-full bg-slate-900 text-white overflow-y-auto pb-28 md:pb-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 pt-12 md:pt-8 md:px-10 sticky top-0 bg-slate-900/90 backdrop-blur-md z-10 border-b border-slate-800/50">
        <h2 className="text-2xl font-bold tracking-wide">畢業生介紹</h2>
        <p className="text-indigo-400 text-sm mt-1">115級白沙國樂社 畢業生</p>
      </div>
      <div className="p-6 md:px-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        {GRADUATES.map((grad, i) => (
          <motion.div 
            key={grad.id} 
            className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="h-56 bg-slate-700 relative">
              <img src={grad.photo} alt={grad.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <span className="absolute bottom-4 right-4 px-3 py-1 bg-indigo-600/90 text-white text-xs rounded-full font-medium shadow-md">
                {grad.instrument}
              </span>
            </div>
            <div className="p-5 pt-3">
              <h3 className="text-xl font-bold mb-2">{grad.name}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{grad.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// 【 頁籤二：樂曲介紹 】
// -------------------------------------------------------------
const MUSIC_TITLES = ["天山", "丟丟銅", "竹歌", "雨", "神遊", "童年", "節日鑼鼓", "Tequila"];

const MUSICS = MUSIC_TITLES.map((title, index) => ({
  id: index + 1,
  title,
  composer: "作曲家待補",
  description: `《${title}》的詳細樂曲介紹內容即將在此更新，敬請期待。`,
  tags: ["國樂"]
}));

function MusicListPage({ key }: { key?: string }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <motion.div 
      className="flex flex-col h-full bg-slate-900 text-white overflow-y-auto pb-28 md:pb-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 pt-12 md:pt-8 md:px-10 sticky top-0 bg-slate-900/90 backdrop-blur-md z-10 border-b border-slate-800/50">
        <h2 className="text-2xl font-bold tracking-wide">樂曲介紹</h2>
        <p className="text-indigo-400 text-sm mt-1">探索今日演出曲目的背後故事</p>
      </div>

      <div className="p-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
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

// -------------------------------------------------------------
// 【 頁籤三：演出人員 】
// -------------------------------------------------------------
const PERFORMERS = [
  {
    id: 1,
    title: "天山",
    sections: [
      { role: "吹管", members: "梆笛：子慈學姊、宛柔學姊\n曲笛：李昆佑、芳甄學姊、善茹學姊\n小笛：王竑頤\n高嗩：謝菁芸、李彥琦學長\n中嗩：林隆温\n高笙：林怡辰\n中笙：李宗憲學長" },
      { role: "拉弦", members: "高胡：安佳瑜\n中胡：沈歆慈\n二胡：鍾翔蓁、周芳琦學姊、吳佩宜學姊、廖冠霆學長、周芷嵐學姊、宋和彥學長\ncello：陳㛄安學姊" },
      { role: "彈撥", members: "柳琴：郭雨瑄、蘇子晴\n琵琶：張得萱、石明樺學長\n中阮：蔡文雅學姊\n大阮：潘羿均學姊" },
      { role: "打擊", members: "揚琴：林佳樺學姊\n手鼓：盧品榕學姊\n鈴鼓：蘇昕悅\n排鼓/小軍鼓：蘇昱豪\n定音鼓：劉于嫙\n吊鈸：曾妤" }
    ]
  },
  {
    id: 2,
    title: "丟丟銅",
    sections: [
      { role: "吹管", members: "曲笛：李昆佑\n高笙：林怡辰" },
      { role: "拉弦", members: "二胡：安佳瑜、沈歆慈、謝菁芸、鍾翔蓁、廖冠霆學長、周芷嵐學姊、宋和彥學長\ncello：陳㛄安學姊" },
      { role: "彈撥", members: "柳琴：郭雨瑄\n琵琶：張得萱、蕭宛琳學姊\n中阮：吳宥達學長" },
      { role: "打擊", members: "排鼓/木魚：王竑頤\n吊鈸/三角鐵/雪鈴：溫舜如\n大鼓二號位：蘇昱豪 (待確認)" }
    ]
  },
  {
    id: 3,
    title: "竹歌",
    sections: [
      { role: "吹管", members: "梆笛：宛柔學姊\n曲笛：林隆温\n高笙：林怡辰" },
      { role: "拉弦", members: "二胡：安佳瑜、謝菁芸、鍾翔蓁\n中胡：沈歆慈\ncello：陳㛄安學姊" },
      { role: "彈撥", members: "柳琴：郭雨瑄\n琵琶：張得萱\n中阮：石明樺學長" },
      { role: "打擊", members: "揚琴：古竺艷學姊\n鋼片琴：溫舜如\n三角鐵：劉于嫙\n定音鼓：蘇昱豪" }
    ]
  },
  {
    id: 4,
    title: "雨",
    sections: [
      { role: "吹管", members: "笛：林隆温\n高笙：林怡辰" },
      { role: "拉弦", members: "高胡：安佳瑜\n二胡：謝菁芸、鍾翔蓁\n中胡：沈歆慈\ncello：陳㛄安學姊" },
      { role: "彈撥", members: "柳琴：郭雨瑄\n琵琶：張得萱\n中阮：待補\n大阮：石明樺學長" },
      { role: "打擊", members: "揚琴：林佳樺\n吊鈸/排鼓：劉于嫙\n木魚/鈴鼓/雨棒：蘇昱豪" }
    ]
  },
  {
    id: 5,
    title: "神遊",
    sections: [
      { role: "吹管", members: "梆笛：李昆佑、芳甄學姊、品榕學姊\n曲笛：善茹學姊、忞茹學姊、竺艷學姊\n新笛：王竑頤、予訢學姊\n高嗩：謝菁芸\n中嗩：林隆温\n高笙：林怡辰\n中笙：李宗憲學長" },
      { role: "拉弦", members: "高胡：安佳瑜\n中胡：沈歆慈\n二胡：周芳琦學姊、吳佩宜學姊、廖冠霆學長、周芷嵐學姊、宋和彥學長、鍾翔蓁\ncello：陳㛄安學姊" },
      { role: "彈撥", members: "柳琴：潘羿均學姊\n琵琶：張得萱、劉奕彣學姊\n中阮：蔡文雅學姊\n大阮：石明樺學長、吳宥達學長" },
      { role: "打擊", members: "揚琴：林佳樺學姊\n定音鼓：蘇昱豪\n小鈸：溫舜如\n大鑼：蘇昕悅\n西洋鈸：劉于嫙\n吊鈸：曾妤" }
    ]
  },
  {
    id: 6,
    title: "童年",
    sections: [
      { role: "吹管", members: "梆笛：王竑頤、善茹學姊\n曲笛：品榕學姊、忞茹學姊、子慈學姊\n新笛：宛柔學姊、予訢學姊\n高嗩：謝菁芸\n高笙：林怡辰\n中笙：李宗憲學長" },
      { role: "拉弦", members: "高胡：安佳瑜\n中胡：沈歆慈\n二胡：鍾翔蓁、廖冠霆學長、周芷嵐學姊、宋和彥學長、周芳琦學姊\ncello：陳㛄安學姊" },
      { role: "彈撥", members: "柳琴：潘羿均學姊、蘇子晴\n琵琶：張得萱、蕭宛琳學姊\n中阮：郭雨瑄\n大阮：石明樺學長" },
      { role: "打擊", members: "揚琴：古竺艷學姊\n小鐘琴/小軍鼓：溫舜如\n三角鐵/大鈸：蘇昕悅\n大鼓/吊鈸：曾妤\n定音鼓：蘇昱豪\n鈴鼓：劉于嫙" }
    ]
  },
  {
    id: 7,
    title: "節日鑼鼓",
    sections: [
      { role: "吹管", members: "梆笛：宛柔學姊、予訢學姊、善茹學姊\n曲笛：王竑頤、李昆佑、子慈學姊\n高嗩：謝菁芸\n中嗩：林隆温\n高笙：林怡辰\n中笙：李宗憲學長" },
      { role: "拉弦", members: "高胡：安佳瑜\n中胡：沈歆慈\n二胡：周芳琦學姊、吳佩宜學姊、廖冠霆學長、周芷嵐學姊、宋和彥學長、鍾翔蓁\ncello：黃湘紜學姊" },
      { role: "彈撥", members: "柳琴：潘羿均學姊\n琵琶：張得萱、劉奕彣學姊\n中阮：蔡文雅學姊\n大阮：吳宥達學長、石明樺學長" },
      { role: "打擊", members: "揚琴：林佳樺學姊\n小鈸：盧品榕學姊\n低鑼/引磬：李彥琦學長\n排鼓/雲鑼：蘇昱豪\n小鑼：劉于嫙\n大鑼：曾妤\n定音鼓/木魚：郭雨瑄\n中鈸/大鈸：蘇昕悅\n梆子：謝菁芸" }
    ]
  },
  {
    id: 8,
    title: "Tequila",
    sections: [
      { role: "吹管", members: "梆笛：王竑頤、李昆佑\n曲笛：宛柔學姊\n高嗩：? (還在喬攏中)\n中嗩：? (還在喬攏中)\n高笙：林怡辰\n中笙：李宗憲學長" },
      { role: "拉弦", members: "高胡：安佳瑜\n中胡：沈歆慈\n二胡：周芳琦學姊、吳佩宜學姊、廖冠霆學長、鍾翔蓁\ncello：陳㛄安學姊" },
      { role: "彈撥", members: "柳琴：蘇子晴、潘羿均學姊\n琵琶：張得萱、劉奕彣學姊\n中阮：蔡文雅學姊、吳宥達學長\n大阮：石明樺學長" },
      { role: "打擊", members: "待補" }
    ]
  }
];

function PerformersPage({ key }: { key?: string }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 依據曲名字首筆畫明確給予權重（確保各瀏覽器與系統排序一致）
  const sortedPerformers = [...PERFORMERS].sort((a, b) => {
    if (a.title === "Tequila") return 1;
    if (b.title === "Tequila") return -1;

    const strokeOrder: Record<string, number> = {
      "天山": 4,       // 天 = 4畫
      "丟丟銅": 6.1,   // 丟 = 6畫
      "竹歌": 6.2,     // 竹 = 6畫
      "雨": 8,         // 雨 = 8畫
      "神遊": 9,       // 神 = 9畫
      "童年": 12,      // 童 = 12畫
      "節日鑼鼓": 13   // 節 = 13畫
    };

    const orderA = strokeOrder[a.title] || 50;
    const orderB = strokeOrder[b.title] || 50;

    return orderA - orderB;
  });

  return (
    <motion.div 
      className="flex flex-col h-full bg-slate-900 text-white overflow-y-auto pb-28 md:pb-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 pt-12 md:pt-8 md:px-10 sticky top-0 bg-slate-900/90 backdrop-blur-md z-10 border-b border-slate-800/50">
        <h2 className="text-2xl font-bold tracking-wide">演出人員</h2>
        <p className="text-indigo-400 text-sm mt-1">按曲目分類的各聲部名單</p>
      </div>

      <div className="p-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        {sortedPerformers.map((perf, index) => (
          <motion.div 
            key={perf.id}
            className={`bg-slate-800/80 rounded-2xl overflow-hidden border transition-all duration-300 ${
              selectedId === perf.id 
                ? 'border-indigo-500 shadow-lg shadow-indigo-500/10' 
                : 'border-slate-700/50 hover:border-slate-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className="p-5 cursor-pointer flex items-center justify-between"
              onClick={() => setSelectedId(selectedId === perf.id ? null : perf.id)}
            >
              <div>
                <h3 className="text-lg font-bold mb-1">{perf.title}</h3>
                <p className="text-slate-400 text-sm">演出名單</p>
              </div>
              <motion.div
                animate={{ rotate: selectedId === perf.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className={`w-6 h-6 transition-colors ${selectedId === perf.id ? 'text-indigo-400' : 'text-slate-600'}`} />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {selectedId === perf.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-5 pb-5"
                >
                  <div className="pt-4 border-t border-slate-700/50 space-y-4">
                    {perf.sections.map((section, idx) => (
                      <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30">
                        <h4 className="text-indigo-400 font-bold text-sm mb-2">{section.role}</h4>
                        <p className="text-slate-200 text-sm whitespace-pre-line leading-relaxed">
                          {section.members}
                        </p>
                      </div>
                    ))}
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

// -------------------------------------------------------------
// 【 頁籤四：贊助廠商 】
// -------------------------------------------------------------
const SPONSORS = [
  { id: 0, name: "叢林霸主—林隆溫", description: "特別感謝！為本次畢演提供最大力的支持與幫助。", logo: jungleKingImg, isPremium: true },
  { id: 1, name: "白沙樂器行", description: "專業國樂器展售、維修服務，提供本次畢演多項打擊樂器資源支援。", logo: "https://picsum.photos/seed/sponsor1/200/200" },
  { id: 2, name: "國樂推廣基金會", description: "長期致力於傳統音樂推廣與教學，培育無數國樂英才，感謝大力贊助。", logo: "https://picsum.photos/seed/sponsor2/200/200" },
  { id: 3, name: "地方熱心校友", description: "由100級歷屆學長姐聯合贊助，讓這場音樂會能更加圓滿。", logo: "https://picsum.photos/seed/sponsor3/200/200" },
];

function SponsorsPage({ key }: { key?: string }) {
  return (
    <motion.div 
      className="flex flex-col h-full bg-slate-900 text-white overflow-y-auto pb-28 md:pb-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 pt-12 md:pt-8 md:px-10 sticky top-0 bg-slate-900/90 backdrop-blur-md z-10 border-b border-slate-800/50">
        <h2 className="text-2xl font-bold tracking-wide">贊助廠商</h2>
        <p className="text-indigo-400 text-sm mt-1">深表謝忱 共襄盛舉</p>
      </div>
      <div className="p-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start auto-rows-max">
        {SPONSORS.map((sponsor, i) => (
          <motion.div 
            key={sponsor.id}
            className={`flex ${sponsor.isPremium ? 'flex-col sm:flex-row col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 bg-indigo-900/40 border-indigo-500/50 p-6 sm:p-8' : 'items-center bg-slate-800/80 p-4 border-slate-700/50'} gap-4 md:gap-6 rounded-2xl border`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`shrink-0 flex justify-center bg-black/50 rounded-xl overflow-hidden border border-slate-600 ${sponsor.isPremium ? 'w-full sm:w-48 lg:w-64 h-auto' : 'w-20 h-20 bg-slate-700'}`}>
              <img src={sponsor.logo} alt={sponsor.name} className={`w-full ${sponsor.isPremium ? 'h-auto object-contain' : 'h-full object-cover'}`} referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              {sponsor.isPremium && <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-indigo-300 bg-indigo-900/80 rounded-full border border-indigo-700/50">首席特別贊助</span>}
              <h3 className={`font-bold mb-1 ${sponsor.isPremium ? 'text-2xl sm:text-3xl text-indigo-100 mb-2' : 'text-lg'}`}>{sponsor.name}</h3>
              <p className={`leading-relaxed ${sponsor.isPremium ? 'text-indigo-200/80 sm:text-lg' : 'text-slate-400 text-sm line-clamp-3'}`}>{sponsor.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// 【 主要導覽容器 (Responsive) 】
// -------------------------------------------------------------
function MainTabsContainer() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <motion.div 
      className="flex flex-col md:flex-row h-screen w-full bg-slate-900 text-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 桌面/平板 側邊導覽列 */}
      <div className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-800 bg-slate-900/95 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-xl lg:text-2xl font-bold tracking-widest leading-relaxed">
            115級白沙國樂社
            <br />畢演會節目單
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {[
            { id: 1, name: "畢業生介紹", icon: GraduationCap },
            { id: 2, name: "樂曲介紹", icon: Music },
            { id: 3, name: "演出人員", icon: Users },
            { id: 4, name: "贊助廠商", icon: HeartHandshake }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`w-full flex items-center px-4 py-4 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-4" />
              <span className="font-semibold tracking-wide">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 內容區塊 */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 1 && <GraduatesPage key="tab1" />}
          {activeTab === 2 && <MusicListPage key="tab2" />}
          {activeTab === 3 && <PerformersPage key="tab3" />}
          {activeTab === 4 && <SponsorsPage key="tab4" />}
        </AnimatePresence>
      </div>
      
      {/* 手機 底部導覽列 */}
      <div className="md:hidden absolute bottom-0 w-full bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 flex justify-around items-center px-2 py-3 pb-5 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] z-50">
        <button 
          onClick={() => setActiveTab(1)} 
          className={`flex flex-col items-center flex-1 transition-colors ${activeTab === 1 ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <GraduationCap className="w-[22px] h-[22px] mb-1.5" />
          <span className="text-[10px] font-medium tracking-wide">畢業生</span>
        </button>
        <button 
          onClick={() => setActiveTab(2)} 
          className={`flex flex-col items-center flex-1 transition-colors ${activeTab === 2 ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Music className="w-[22px] h-[22px] mb-1.5" />
          <span className="text-[10px] font-medium tracking-wide">曲目</span>
        </button>
        <button 
          onClick={() => setActiveTab(3)} 
          className={`flex flex-col items-center flex-1 transition-colors ${activeTab === 3 ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Users className="w-[22px] h-[22px] mb-1.5" />
          <span className="text-[10px] font-medium tracking-wide">人員</span>
        </button>
        <button 
          onClick={() => setActiveTab(4)} 
          className={`flex flex-col items-center flex-1 transition-colors ${activeTab === 4 ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <HeartHandshake className="w-[22px] h-[22px] mb-1.5" />
          <span className="text-[10px] font-medium tracking-wide">贊助</span>
        </button>
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// 【 根元件 】
// -------------------------------------------------------------
export default function App() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen w-full bg-black font-sans text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && <LoadingSequencePage key="page1" onNext={() => setStep(2)} />}
        {step === 2 && <PopupPage key="page2" onNext={() => setStep(3)} />}
        {step === 3 && <MainTabsContainer key="page3" />}
      </AnimatePresence>
    </div>
  );
}
