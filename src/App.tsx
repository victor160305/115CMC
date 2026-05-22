import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, ChevronRight, X, PlayCircle, GraduationCap, Users, HeartHandshake, ChevronDown } from 'lucide-react';
import sponsorImage from './assets/images/IMG_7706.jpg';
import zhongImage from './assets/images/IMG_2629.jpg';
import suImage from './assets/images/IMG_2915.jpg';
import linImage from './assets/images/IMG_2998.jpg';
import xieImage from './assets/images/P7170058.jpg';
import loadingImage1 from './assets/images/IMG_2718.jpg';
import loadingImage2 from './assets/images/P7170011.jpg';
import loadingImage3 from './assets/images/P7170047.jpg';
import loadingImage4 from './assets/images/P7170059.jpg';

const LOADING_IMAGES = [
  loadingImage1,
  loadingImage2,
  loadingImage3,
  loadingImage4
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
      className="flex flex-col items-center justify-center h-full w-full bg-slate-900 text-white p-6"
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
      className="flex flex-col h-full w-full bg-slate-900 text-white relative"
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
  { id: 1, name: "林隆温", instrument: "待補", description: `aka白沙湖水怪aka超級無敵霹靂嘩啦啦下雨滴滴搭銀河系ㄅ級分愛遲到大王

MBTI：MBTI是ENFP （超級大P人）常常因為時間安排不當導致不斷呈現暫時消失或東西做不完的「壯態」（對，壯烈犧牲的壯）共感偏強，所以去年別人的畢業音樂會結束後我也莫名其妙的感傷起來了（？

樂器的話，主要是吹笛子/吹嗩吶/吹冷氣，反正只要吹的話都算在行（？ 有時候還是會去打擊支援，但在接任指揮之後就會在最前面的台上搖頭晃腦，曾經不停的想把指揮這個重擔丟給別人，但通常都是被拒絕一輪後又是默默撿起指揮棒（含淚`, photo: linImage },
  { id: 2, name: "謝菁芸", instrument: "待補", description: `aka 謝鯨魚(？)

MBTI：ENFP快樂小狗勾，曾經在社團事物跟太P的幹部們之中被迫成為痛苦的INFP，沒有因此成為J，所以只能更痛苦的變成會寫行程表會寫行事曆的痛苦大P人

平常在社團負責搞耍跟拉住另外幾隻快樂小狗的韁繩，遊走於社團各個分部，常常自己也不知道自己要在哪AKA找不到家的小狗`, photo: xieImage },
  { id: 3, name: "蘇昱豪", instrument: "待補", description: `AKA 叢林霸主🦁
我也不知道為什麼🤪
貌似是因為獅子座，但獅子跟叢林的關係到底是什麼？
📖 小知識時間：
「獅子是叢林之王」這個說法，其實來自英文俗諺 “King of the Jungle”。
但學者推測，這裡的 Jungle 在早期梵文或波斯文中，原本比較接近「荒地」或「乾燥開闊的森林」，其實更符合獅子的棲息地。
只是後來 Jungle 逐漸被大家理解成熱帶雨林，於是就有了這個美麗的誤會🌳🦁

MBTI：ENFP(●'◡'●)
曾經在高中時期是穩妥妥的 J 人，
但不知道為什麼上大學後就變成 P 人了。
可能是學會了什麼叫做痛苦轉移
🎶 把一個人的工作～～～轉移到另一群人的肩上 🎶

主要生存在那一整排的打擊🥁
但鍵盤真的好恐怖啊啊啊啊啊！！！
偶爾也會跳去嗩吶組，成為一位在國樂吹北管的不稱職玩家🎺
🎶 工阿六阿五乂仩 🎶`, photo: suImage },
  { id: 4, name: "鍾翔蓁", instrument: "待補", description: `aka 一針（不是因為講話一針見血，是因為班導一直叫我翊蓁）

MBTI：INFP
（被三位E人包夾瑟瑟發抖的I人，已經有在努力開口）

主要負責二胡（緊緊抱住我唯一會的那支樂器）
同時擔任幹話評審（這句差了一點，只有5.5分🤙）`, photo: zhongImage }
];

function GraduatesPage({ key }: { key?: string }) {
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
        <h2 className="text-2xl font-bold tracking-wide">畢業生介紹</h2>
        <p className="text-indigo-400 text-sm mt-1">115級白沙國樂社 畢業生</p>
      </div>
      <div className="p-6 md:px-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        {GRADUATES.map((grad, i) => (
          <motion.div 
            key={grad.id} 
            className={`bg-slate-800/80 rounded-2xl overflow-hidden border transition-all duration-300 ${
              selectedId === grad.id 
                ? 'border-indigo-500 shadow-lg shadow-indigo-500/10' 
                : 'border-slate-700/50 hover:border-slate-600 shadow-lg'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-full bg-slate-700 relative flex justify-center bg-black/20">
              <img src={grad.photo} alt={grad.name} className="w-full h-auto object-contain" referrerPolicy="no-referrer" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
            
            <div 
              className="p-5 cursor-pointer flex items-center justify-between"
              onClick={() => setSelectedId(selectedId === grad.id ? null : grad.id)}
            >
              <h3 className="text-xl font-bold">{grad.name}</h3>
              <motion.div
                animate={{ rotate: selectedId === grad.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className={`w-6 h-6 transition-colors ${selectedId === grad.id ? 'text-indigo-400' : 'text-slate-600'}`} />
              </motion.div>
            </div>

            <AnimatePresence>
              {selectedId === grad.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-5 pb-5 overflow-hidden"
                >
                  <div className="pt-2 border-t border-slate-700/50">
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mt-3">{grad.description}</p>
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
// 【 頁籤二：樂曲介紹 】
// -------------------------------------------------------------
const MUSICS = [
  {
    id: 1,
    title: "天山盛會",
    composer: "顧冠仁",
    description: "《天山盛會》是著名作曲家顧冠仁創作的《春天》組曲中第五樂章，是一首經典的民族管弦樂合奏曲。\n此曲生動描繪了春天來臨時，天山山麓下各民族齊聚、高歌狂舞慶祝的熱烈場面，曲風充滿勃勃生機與歡欣讚美之情。",
    tags: ["國樂"]
  },
  {
    id: 2,
    title: "丟丟銅仔",
    composer: "宜蘭民謠",
    description: "《丟丟銅仔》，這首樂曲的起源有多種說法，最廣為流傳的是，它描繪了清末民初宜蘭地區興建鐵路，火車穿越隧道時，山洞頂端的水滴落在火車頂上，發出『丟丟銅』的聲響，這輕快的節奏，不僅是先民對現代科技的驚奇，更是宜蘭人開朗、勤奮性格的寫照。",
    tags: ["國樂"]
  },
  {
    id: 3,
    title: "竹歌",
    composer: "蘇南民歌改編",
    description: "<<竹歌>>樂曲以蘇南民歌音調為素材創作而成，以抒情的慢版令人回憶起故鄉的清晨，縷縷陽光透過翠綠的竹林，灑下一片金色，勤勞的農民、悠悠的唱起山歌，親切、寧靜。由弱漸強的小快板，表現了人們歡快的勤勞，並展望竹林的豐收。慢板再現，他深情的歌唱故鄉的竹林。",
    tags: ["國樂"]
  },
  {
    id: 4,
    title: "雨",
    composer: "張永清 (編曲)",
    description: "國樂合奏曲《雨》由 張永清 編曲，以「雨」作為核心意象，透過國樂豐富多變的音色與聲響層次，描繪自然景色中雨勢流轉的萬般姿態。作品融合傳統東方意境與現代國樂合奏技法，不僅展現自然景觀的變化，更藉由雨的形象寄託情感起伏，使樂曲兼具畫面感與深刻的抒情性。\n\n樂曲開端以細膩柔和的旋律鋪陳，如煙雨初落，笛聲與拉弦聲部交織出朦朧而悠遠的空間感，彷彿薄霧籠罩天地。隨著音樂逐步推進，揚琴與打擊聲部模擬雨滴敲擊大地的律動，節奏層層堆疊，雨勢逐漸增強；中段則透過強烈的合奏與豐富的和聲語法，描繪驟雨傾瀉、雷聲翻湧的磅礴氣勢，展現國樂合奏寬廣而震撼的音響效果。高潮過後，旋律再度回歸平靜，彷彿雨過天晴，空氣中殘留著濕潤與澄澈，也為整首作品留下悠長而深遠的餘韻。",
    tags: ["國樂"]
  },
  {
    id: 5,
    title: "神遊浯州醉金城",
    composer: "朱雲松",
    description: "神遊浯州醉金城以音樂描繪金門的歷史人文與風情，開頭歡快熱鬧，描繪安居樂業的景象，並透過慢板展現金門歷史的榮衰與對未來的期待。\n\n此曲由作曲家朱雲松受金門縣金城鎮鎮公所之邀為當地譜寫樂曲，金門古稱「浯州」，經朱雲松考察，發現金門不僅只是軍事要地、海防重鎮，亦是馬場、鹽田\n自宋明清以來擁有約五十位進士的史實，間接印證金門當地人文發展的多樣，樂曲開頭熱鬧歡快，胡琴悠揚的旋律象徵著百姓們安居樂業，歌舞昇平的繁榮景象\n嗩吶、笛子聲部則吹出了氣勢磅礡、固若金湯的金門印象，在樂曲中間如歌似的慢板樂段，如說書人侃侃而談金門歷史，細數金門曾經歷過的種種繁華與傷痛，卻不一昧沉浸在悲傷憂愁中，而是賦予了對未來的美好與期待。",
    tags: ["國樂"]
  },
  {
    id: 6,
    title: "童年的回憶",
    composer: "盧亮輝",
    description: "⟪童年的回憶⟫這首樂曲由盧亮輝創作，以溫暖而流動的旋律，描繪童年記憶裡那些最純粹的片段。\n\n樂曲開頭像午後巷口的微風，輕輕帶出孩提時代的天真與悠閒，中段節奏逐漸活潑，彷彿孩子們奔跑、嬉鬧的身影突然湧現\n而尾聲則收回柔和與感傷，像長大後回頭望向童年的那一瞬間——明明沒有說再見，卻早已走遠。",
    tags: ["國樂"]
  },
  {
    id: 7,
    title: "節日鑼鼓",
    composer: "蘇文慶",
    description: "作曲家蘇文慶於1990年創作的《節日鑼鼓》，靈感源自民間喜慶音樂，透過打擊協奏曲的形式，運用排鼓、鑼與多樣吹打樂器，描繪出熱鬧節慶中的歡愉景象與人聲鼎沸的氣氛。\n由打擊領銜開場，序奏節奏鮮明、層次分明，隨後樂團快板與中板交錯推進，猶如節日隊伍在街巷穿梭。\n樂曲中不斷回返的打擊段落，如同熱鬧慶典中此起彼落的鑼鼓聲，為整體注入源源不絕的能量與律動。\n尾聲急板氣勢磅礡，為整首曲子畫下華麗句點，也讓觀眾彷彿置身節慶最高潮的絢爛時刻。\n蘇文慶以鮮明的節奏與歡快的旋律，勾勒出節日時人們歡聚的熱鬧景象，不僅展現傳統音樂的色彩，更帶來滿溢心間的喜悅與歡騰。\n在《節日鑼鼓》中，打擊主奏與樂團彼此交錯穿插、互相呼應，或穩重鋪陳，或活力湧現，將節慶的氛圍描繪得淋漓盡致。",
    tags: ["國樂"]
  }
];

function MusicListPage({ key }: { key?: string }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const sortedMusics = [...MUSICS].sort((a, b) => a.title.length - b.title.length);

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
        {sortedMusics.map((music, index) => (
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
                    <p className="text-slate-300 text-sm leading-relaxed mb-5 whitespace-pre-line">
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
      { role: "吹管", members: "梆笛：*黃子慈、*吳宛柔\n曲笛：李昆祐、*張芳甄、胡善茹\n小笛：王竑頤\n高嗩：謝菁芸、*李彥琦\n中嗩：林隆温\n高笙：林怡辰\n中笙：*李宗憲" },
      { role: "拉弦", members: "高胡：安佳瑜\n中胡：沈歆慈\n二胡：鍾翔蓁、*周芳琦、*吳佩宜、*周芷嵐、*宋和彥\ncello：陳㛄安" },
      { role: "彈撥", members: "柳琴：郭雨瑄、蘇子晴\n琵琶：張得萱、*石明樺\n中阮：*蔡文雅\n大阮：*潘羿均" },
      { role: "打擊", members: "揚琴：*林佳樺\n手鼓：*盧品榕\n鈴鼓：蘇昕悅\n排鼓/小軍鼓：蘇昱豪\n定音鼓：劉于嫙\n吊鈸：曾妤" }
    ]
  },
  {
    id: 2,
    title: "丟丟銅",
    sections: [
      { role: "吹管", members: "曲笛：李昆祐\n梆笛：*吳宛柔\n高笙：林怡辰" },
      { role: "拉弦", members: "二胡：安佳瑜、沈歆慈、謝菁芸、鍾翔蓁、*周芷嵐、*宋和彥\ncello：陳㛄安" },
      { role: "彈撥", members: "柳琴：郭雨瑄\n琵琶：張得萱、*蕭宛琳\n中阮：*吳宥達、*李彥琦" },
      { role: "打擊", members: "排鼓/打溜子：王竑頤\n木魚/小軍鼓：溫舜如\n三角鐵/中間段吊鈸：劉于嫙\n吊鈸/大鼓/雪鈴：蘇昱豪" }
    ]
  },
  {
    id: 3,
    title: "竹歌",
    sections: [
      { role: "吹管", members: "梆笛：*吳宛柔\n曲笛：林隆温\n高笙：林怡辰" },
      { role: "拉弦", members: "二胡：安佳瑜、謝菁芸、鍾翔蓁\n中胡：沈歆慈\ncello：陳㛄安" },
      { role: "彈撥", members: "柳琴：郭雨瑄\n琵琶：張得萱\n中阮：*李彥琦、*石明樺" },
      { role: "打擊", members: "揚琴：*古竺艷\n鋼片琴：溫舜如\n三角鐵：劉于嫙\n定音鼓：蘇昱豪" }
    ]
  },
  {
    id: 4,
    title: "雨",
    sections: [
      { role: "吹管", members: "笛：林隆温\n高笙：林怡辰" },
      { role: "拉弦", members: "高胡：安佳瑜\n二胡：謝菁芸、鍾翔蓁\n中胡：沈歆慈\ncello：陳㛄安" },
      { role: "彈撥", members: "柳琴：郭雨瑄\n琵琶：張得萱\n中阮：*李彥琦\n大阮：*石明樺" },
      { role: "打擊", members: "揚琴：*林佳樺\n吊鈸/排鼓：劉于嫙\n木魚/鈴鼓/雨棒：蘇昱豪" }
    ]
  },
  {
    id: 5,
    title: "神遊",
    sections: [
      { role: "吹管", members: "梆笛：李昆祐、*張芳甄、*盧品榕\n曲笛：*胡善茹、*江忞茹、*古竺艷\n新笛：王竑頤、*簡予訢\n高嗩：謝菁芸\n中嗩：林隆温\n高笙：林怡辰\n中笙：*李宗憲" },
      { role: "拉弦", members: "高胡：安佳瑜\n中胡：沈歆慈\n二胡：鍾翔蓁、*周芳琦、*吳佩宜、*周芷嵐、*宋和彥\ncello：陳㛄安" },
      { role: "彈撥", members: "柳琴：*潘羿均\n琵琶：張得萱、*劉奕彣\n中阮：*蔡文雅\n大阮：*石明樺、*吳宥達" },
      { role: "打擊", members: "揚琴：*林佳樺\n定音鼓：蘇昱豪\n小鈸：溫舜如\n大鑼：蘇昕悅\n西洋鈸：劉于嫙\n吊鈸：曾妤" }
    ]
  },
  {
    id: 6,
    title: "童年",
    sections: [
      { role: "吹管", members: "梆笛：王竑頤、*胡善茹\n曲笛：*盧品榕、*江忞茹、*黃子慈\n新笛：*吳宛柔、*簡予訢\n高嗩：謝菁芸\n高笙：林怡辰\n中笙：*李宗憲" },
      { role: "拉弦", members: "高胡：安佳瑜\n中胡：沈歆慈\n二胡：鍾翔蓁、*周芷嵐、*宋和彥、*周芳琦\ncello：陳㛄安" },
      { role: "彈撥", members: "柳琴：*潘羿均、蘇子晴\n琵琶：張得萱、*蕭宛琳\n中阮：郭雨瑄\n大阮：*石明樺" },
      { role: "打擊", members: "揚琴：*古竺艷\n小鐘琴/小軍鼓：溫舜如\n三角鐵/大鈸：蘇昕悅\n大鼓/吊鈸：曾妤\n定音鼓：蘇昱豪\n鈴鼓：劉于嫙" }
    ]
  },
  {
    id: 7,
    title: "節日",
    sections: [
      { role: "吹管", members: "梆笛：*吳宛柔、*簡予訢、*胡善茹\n曲笛：王竑頤、李昆佑、*黃子慈\n高嗩：林隆温\n高笙：林怡辰\n中笙：*李宗憲" },
      { role: "拉弦", members: "高胡：安佳瑜\n中胡：沈歆慈\n二胡：鍾翔蓁、*周芳琦、*吳佩宜、*周芷嵐、*宋和彥\ncello：陳㛄安" },
      { role: "彈撥", members: "柳琴：*潘羿均\n琵琶：張得萱、*劉奕彣\n中阮：*蔡文雅\n大阮：*吳宥達、*石明樺" },
      { role: "打擊", members: "揚琴：*林佳樺\n小鈸：*盧品榕\n低鑼/引磬：*李彥琦\n排鼓/雲鑼：蘇昱豪\n小鑼：劉于嫙\n大鑼：曾妤\n定音鼓/木魚：郭雨瑄\n中鈸/大鈸：蘇昕悅\n梆子/碰鈴：謝菁芸" }
    ]
  }
];

function PerformersPage({ key }: { key?: string }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 依據曲名字數進行排序
  const sortedPerformers = [...PERFORMERS].sort((a, b) => a.title.length - b.title.length);

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
const SPONSOR_CATEGORIES: Array<{
  title: string;
  items: Array<{
    id: string;
    name: string;
    amount?: string;
    description?: string;
    logo?: string;
    isPremium?: boolean;
  }>;
}> = [
  {
    title: "特殊贊助",
    items: [
      { id: 's0', name: "林隆温", amount: "", description: "特別感謝！為本次畢演提供最大力的支持與幫助。", logo: sponsorImage, isPremium: true },
      { id: 's1', name: "劉智華學長", amount: "2000", isPremium: true },
      { id: 's2', name: "寶山精緻美食", amount: "1000", isPremium: true },
    ]
  },
  {
    title: "店名 (>=1000)",
    items: [
      { id: 's3', name: "宏恩眼鏡", amount: "2000" },
      { id: 's4', name: "祥贏投注站", amount: "1000" },
      { id: 's5', name: "善心人士", amount: "1000" },
      { id: 's6', name: "善心人士", amount: "1000" },
      { id: 's7', name: "卦山不動產", amount: "1000" },
    ]
  },
  {
    title: "店名 (1000~500)",
    items: [
      { id: 's8', name: "四光南記", amount: "600" },
      { id: 's9', name: "麵屋三金", amount: "600" },
    ]
  },
  {
    title: "店名 (100~500)",
    items: [
      { id: 's10', name: "馬駿工業(股)公司", amount: "500" },
      { id: 's11', name: "龍哥雞排", amount: "500" },
      { id: 's12', name: "好像是手機維修行", amount: "500" },
      { id: 's13', name: "長江素食店", amount: "500" },
      { id: 's14', name: "富田中藥行", amount: "500" },
      { id: 's15', name: "蓉來", amount: "500" },
      { id: 's16', name: "康寶十全藥燉排骨", amount: "300" },
      { id: 's17', name: "寶來大腸麵線", amount: "300" },
      { id: 's18', name: "A古爌肉飯", amount: "300" },
      { id: 's19', name: "隨緣珍珠奶", amount: "300" },
      { id: 's20', name: "阿誠現炒", amount: "300" },
      { id: 's21', name: "阿智鵝肉大王", amount: "300" },
      { id: 's22', name: "百華味", amount: "300" },
      { id: 's23', name: "鳳山米糕", amount: "200" },
      { id: 's24', name: "品翔當歸鴨大埔店", amount: "200" },
      { id: 's25', name: "有種鹽水雞", amount: "200" },
      { id: 's26', name: "來吉烤鴨", amount: "200" },
      { id: 's27', name: "九色香雞排", amount: "200" },
      { id: 's28', name: "微甜日光", amount: "200" },
      { id: 's29', name: "修護師手機平板專業維修", amount: "200" },
      { id: 's30', name: "福田家咖哩食堂", amount: "200" },
      { id: 's31', name: "牛太郎", amount: "200" },
      { id: 's32', name: "米香園", amount: "200" },
      { id: 's33', name: "善心人士", amount: "200" },
      { id: 's34', name: "發發發發允得商行", amount: "200" },
      { id: 's35', name: "彩碗", amount: "200" },
      { id: 's36', name: "熱浪小島", amount: "200" },
      { id: 's37', name: "徐師父麻辣臭豆腐", amount: "200" },
      { id: 's38', name: "守飛雞蛋糕", amount: "200" },
      { id: 's39', name: "麥田早餐店", amount: "200" },
      { id: 's40', name: "明記燒鴨", amount: "200" },
      { id: 's41', name: "安可專業眼鏡", amount: "200" },
      { id: 's42', name: "洪鹽酥雞", amount: "200" },
      { id: 's43', name: "十九甲雞排", amount: "200" },
      { id: 's44', name: "旅人阿宏", amount: "200" },
      { id: 's45', name: "三民烤肉", amount: "200" },
      { id: 's46', name: "里仁", amount: "130" },
      { id: 's47', name: "翔泰專業眼鏡公司", amount: "100" },
      { id: 's48', name: "大業機車行", amount: "100" },
      { id: 's49', name: "尚品芋園", amount: "100" },
      { id: 's50', name: "肉圓仔", amount: "100" },
      { id: 's51', name: "鑫鮮味臭臭鍋", amount: "100" },
      { id: 's52', name: "蜀都大埔店", amount: "100" },
      { id: 's53', name: "向日葵", amount: "100" },
      { id: 's54', name: "我家雞排大埔店", amount: "100" },
      { id: 's55', name: "吳家紅茶冰大埔店", amount: "100" },
      { id: 's56', name: "財𨪛車行", amount: "100" },
      { id: 's57', name: "揪吃芭樂", amount: "100" },
      { id: 's58', name: "阿忠刈包", amount: "100" },
      { id: 's59', name: "水果攤", amount: "100" },
      { id: 's60', name: "七七七彩券行", amount: "100" },
      { id: 's61', name: "林二代瓜仔魯炒麵", amount: "100" },
      { id: 's62', name: "美庚深海深美食坊", amount: "100" },
      { id: 's63', name: "福田眼鏡行", amount: "100" },
      { id: 's64', name: "聯的食品", amount: "100" },
      { id: 's65', name: "義式88杯麵", amount: "100" },
      { id: 's66', name: "女3C手機配件", amount: "100" },
      { id: 's67', name: "桂香坊冰糖醬滷味", amount: "100" },
      { id: 's68', name: "善心人士樂捐", amount: "100" },
      { id: 's69', name: "斑馬喫茶館", amount: "100" },
      { id: 's70', name: "大肚量＆小肚量茶飲站", amount: "100" },
      { id: 's71', name: "聯成書局", amount: "100" },
      { id: 's72', name: "DOZO", amount: "100" },
      { id: 's73', name: "大媽の店", amount: "100" },
      { id: 's74', name: "阿鍋·家(南郭店)", amount: "100" },
      { id: 's75', name: "善心人士", amount: "100" },
      { id: 's76', name: "心喜手工茶", amount: "100" },
      { id: 's77', name: "珍北平豬肉餡餅", amount: "100" },
      { id: 's78', name: "米豐", amount: "100" },
      { id: 's79', name: "佬台南鍋燒意麵", amount: "100" },
      { id: 's80', name: "南北第七家", amount: "100" },
      { id: 's81', name: "手機工廠", amount: "100" },
      { id: 's82', name: "蟹將軍", amount: "100" },
      { id: 's83', name: "鑫億來投注站", amount: "100" },
      { id: 's84', name: "永晟機車行", amount: "100" },
      { id: 's85', name: "楊小姐", amount: "100" },
      { id: 's86', name: "華新運動", amount: "100" },
      { id: 's87', name: "客多法式捲餅", amount: "100" },
      { id: 's88', name: "牛媽媽", amount: "100" },
      { id: 's89', name: "田原茶鋪", amount: "100" },
      { id: 's90', name: "九品現炒", amount: "100" },
      { id: 's91', name: "發財臭豆腐", amount: "100" },
      { id: 's92', name: "府城", amount: "100" },
      { id: 's93', name: "如意早餐", amount: "100" },
      { id: 's94', name: "滿香中西式早餐", amount: "100" },
      { id: 's95', name: "ANGEL髮藝空間", amount: "100" },
      { id: 's96', name: "善心人士", amount: "100" },
      { id: 's97', name: "善心人士", amount: "100" },
      { id: 's98', name: "雅頓彰化陽明店", amount: "100" },
      { id: 's99', name: "泰宇電腦", amount: "100" },
      { id: 's100', name: "橙品快炒店", amount: "100" },
      { id: 's101', name: "全香肉乾", amount: "100" },
      { id: 's102', name: "御麵棧美食", amount: "100" },
      { id: 's103', name: "瑞興中藥行", amount: "100" },
      { id: 's104', name: "澎湖伯豆花圓仔", amount: "100" },
      { id: 's105', name: "楓木芸藝術花坊", amount: "100" },
      { id: 's106', name: "善心人士", amount: "100" },
      { id: 's107', name: "三民木瓜牛乳", amount: "100" },
      { id: 's108', name: "回生中藥行", amount: "100" },
      { id: 's109', name: "彩虹照相館", amount: "100" },
      { id: 's110', name: "善心人士", amount: "100" },
      { id: 's111', name: "早安家", amount: "100" },
    ]
  },
  {
    title: "店名 (<100)",
    items: [
      { id: 's112', name: "食神滷味", amount: "50" },
      { id: 's113', name: "瘋雞鹽酥雞", amount: "50" },
      { id: 's114', name: "榆蓉會館", amount: "50" },
      { id: 's115', name: "善心人士", amount: "50" },
      { id: 's116', name: "善心人士", amount: "50" },
      { id: 's117', name: "吳記茶舍", amount: "50" },
      { id: 's118', name: "朋志書局", amount: "50" },
      { id: 's119', name: "爭夯牛排館", amount: "50" },
      { id: 's120', name: "綺雅花苑", amount: "50" },
      { id: 's121', name: "YYDS手機配件", amount: "40" },
      { id: 's122', name: "御記烤鴨", amount: "10" },
      { id: 's123', name: "善心人士", amount: "10" }
    ]
  }
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
      <div className="p-6 md:px-10 flex flex-col gap-10">
        {SPONSOR_CATEGORIES.map((category, catIndex) => (
          <div key={catIndex}>
            <h3 className="text-xl font-bold text-indigo-300 mb-4 pb-2 border-b border-slate-700/50">{category.title}</h3>
            
            {catIndex === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map((sponsor, i) => (
                  <motion.div 
                    key={sponsor.id}
                    className="flex flex-col sm:flex-row col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 bg-indigo-900/40 border border-indigo-500/50 p-6 sm:p-8 gap-4 md:gap-6 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {sponsor.logo && (
                      <div className="shrink-0 flex justify-center bg-black/50 rounded-xl overflow-hidden border border-slate-600 w-full sm:w-48 lg:w-64 h-auto">
                        <img src={sponsor.logo} alt={sponsor.name} className="w-full h-auto object-cover sm:object-contain bg-slate-800" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-indigo-300 bg-indigo-900/80 rounded-full border border-indigo-700/50 self-start">特別贊助</span>
                      <h3 className="font-bold text-xl sm:text-3xl text-indigo-100 mb-2">{sponsor.name}</h3>
                      {sponsor.amount && <p className="font-mono text-indigo-300 sm:text-lg mb-2">贊助金額：${sponsor.amount}</p>}
                      {sponsor.description && <p className="leading-relaxed text-indigo-200/80 sm:text-lg">{sponsor.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {category.items.map((sponsor, i) => (
                  <motion.div 
                    key={sponsor.id}
                    className="bg-slate-800/80 p-3 lg:p-4 rounded-xl border border-slate-700/50 flex flex-col justify-center text-center hover:bg-slate-700/80 transition-colors"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(i * 0.05, 0.5) }}
                  >
                    <div className="font-medium text-slate-200 text-sm lg:text-base mb-1">{sponsor.name}</div>
                    {sponsor.amount && <div className="text-indigo-400 text-xs lg:text-sm font-mono mt-auto">${sponsor.amount}</div>}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
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
      className="flex flex-col md:flex-row h-full w-full bg-slate-900 text-white relative"
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
    <div className="h-[100dvh] w-full bg-black font-sans text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && <LoadingSequencePage key="page1" onNext={() => setStep(2)} />}
        {step === 2 && <PopupPage key="page2" onNext={() => setStep(3)} />}
        {step === 3 && <MainTabsContainer key="page3" />}
      </AnimatePresence>
    </div>
  );
}
