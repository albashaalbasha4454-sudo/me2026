import React, { useState, useEffect } from 'react';
import { 
  Code, PenTool, Brain, Monitor, Palette, Megaphone, Camera, 
  Search, Settings, CheckCircle, ShieldCheck, BookOpen, Cloud, 
  Eye, MousePointerClick, Share2, Lock, Mail, Phone, Send, Gift, 
  Sparkles, MessageSquare, Twitter, Facebook, ArrowUpRight,
  TrendingUp, Users, Target, HeartHandshake, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Card = ({ children, className = "", ...props }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-[#11111A] border border-white/5 rounded-3xl p-6 md:p-8 hover:border-white/10 transition-colors ${className}`} 
    {...props}
  >
    {children}
  </motion.div>
);

// Animated Counter Component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    const increment = value / totalFrames;
    
    if (value === 0) return;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString('en-US')}</span>;
};

// Trackers
const useTrackingCounters = () => {
  const [stats, setStats] = useState({ visitors: 1, clicks: 0, shares: 0 });

  useEffect(() => {
    let localVisitors = parseInt(localStorage.getItem('track_visitors') || '1');
    const hasVisitedSession = sessionStorage.getItem('session_visited');
    
    if (!hasVisitedSession) {
      localVisitors += 1;
      localStorage.setItem('track_visitors', localVisitors.toString());
      sessionStorage.setItem('session_visited', 'true');
    }

    let localClicks = parseInt(localStorage.getItem('track_clicks') || '0');
    let localShares = parseInt(localStorage.getItem('track_shares') || '0');

    setStats({ visitors: localVisitors, clicks: localClicks, shares: localShares });

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        localClicks += 1;
        localStorage.setItem('track_clicks', localClicks.toString());
        setStats(prev => ({ ...prev, clicks: localClicks }));
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const trackShare = () => {
    const currentShares = parseInt(localStorage.getItem('track_shares') || '0');
    const newShares = currentShares + 1;
    localStorage.setItem('track_shares', newShares.toString());
    setStats(prev => ({ ...prev, shares: newShares }));
  };

  return { stats, trackShare };
};

export default function App() {
  const { stats, trackShare } = useTrackingCounters();
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = (platform: string) => {
    trackShare();
    const url = window.location.href;
    const text = "الفكرة تكبر كلما شاركتها…";
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    setShowShareOptions(false);
  };

  const shareProgress = Math.min((stats.shares / 1000) * 100, 100);

  return (
    <div className="min-h-screen bg-[#0B0B14] text-slate-200 font-sans selection:bg-brand-purple/30 selection:text-white pb-12" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B0B14]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-purple/20">S</div>
            <span className="text-xl font-bold text-white tracking-wide">سوق الكتاب</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 md:mt-16 space-y-24 md:space-y-32">
        
        {/* --- 1. من أنا --- */}
        <section className="text-center py-12 md:py-20 relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-gradient-to-b from-brand-purple/10 via-[#0B0B14] to-[#0B0B14] border border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[200px] md:h-[400px] bg-brand-purple/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 px-4 md:px-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 md:mb-10"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple via-blue-500 to-amber-400 rounded-full animate-[spin_4s_linear_infinite] blur-md opacity-70"></div>
              <div className="relative w-full h-full bg-[#0B0B14] rounded-full border-4 border-[#0B0B14] overflow-hidden">
                <img src="/images/logo plus.jpg" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight">من أنا؟</h1>
            
            <div className="mb-10 space-y-8">
              <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-blue-400">
                صانع حلول رقمية ومطوّر منظومات متكاملة
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 font-medium leading-loose max-w-3xl mx-auto">
                أجمع بين العقل التقني، والحس الإبداعي، والفهم الإنساني.
              </p>

              <div className="flex flex-col items-center gap-4 pt-2">
                {/* Top Badge */}
                <div className="flex items-center gap-3 bg-blue-500/10 hover:bg-blue-500/20 transition-colors border border-blue-500/30 px-6 py-3.5 rounded-2xl text-xl md:text-2xl text-blue-100 font-bold shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                  <Code className="w-7 h-7 text-blue-400" />
                  <span>طالب هندسة برمجيات</span>
                </div>
                
                {/* Bottom Badges */}
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 px-5 py-3 rounded-2xl text-lg md:text-xl text-slate-200">
                    <PenTool className="w-6 h-6 text-amber-400" />
                    <span>صانع محتوى</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 px-5 py-3 rounded-2xl text-lg md:text-xl text-slate-200">
                    <Palette className="w-6 h-6 text-brand-purple" />
                    <span>مطور إبداعي</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 px-5 py-3 rounded-2xl text-lg md:text-xl text-slate-200">
                    <Brain className="w-6 h-6 text-emerald-400" />
                    <span>مفكر استراتيجي</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-sm space-y-6">
              <div className="text-lg md:text-2xl leading-relaxed text-slate-300 font-light space-y-2">
                <p>تعلّمت أن النجاح لا يُبنى بالكود وحده…</p>
                <p>ولا بالمحتوى وحده…</p>
                <p>ولا بالتسويق وحده.</p>
              </div>
              <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-blue-400 leading-relaxed">
                النجاح يولد عندما تجتمع الفكرة مع التقنية والتسويق والإنسان في منظومة واحدة تتحرك بتناغم.
              </p>
            </div>
          </div>
        </section>

        {/* --- رسالة قوية --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16 px-8 bg-gradient-to-r from-brand-purple/20 via-blue-500/10 to-brand-purple/20 rounded-[2.5rem] border border-white/10 shadow-2xl shadow-brand-purple/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight relative z-10">
            أهلاً بك في المستقبل.. <br className="md:hidden" />
            وجودك هنا يعني أنك اخترت أن تكون جزءاً من التغيير.
          </h2>
        </motion.div>

        {/* --- 2. رؤيتي (النجاح يبدأ من ترتيب العقل) --- */}
        <section>
          <div className="flex flex-col items-center justify-center gap-6 mb-12 md:mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-4xl tracking-tight">
              النجاح يبدأ من <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#3B82F6] to-[#A855F7]">ترتيب العقل</span><br /> قبل ترتيب الصفحات
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-500/10 to-transparent flex flex-col justify-center space-y-4">
              <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                لذلك نؤمن بأن التقنية خُلقت لخدمة الإنسان لا العكس.
              </p>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
                وأن المستقبل يُبنى على أساس من القيم والمعرفة والمسؤولية بشكل احترافي.
              </p>
            </Card>
            <Card className="bg-gradient-to-br from-brand-purple/10 to-transparent flex flex-col justify-center space-y-6">
              <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                كل مشروع بالنسبة لي ليس “مهمة”، بل رحلة:
              </p>
              <div className="flex flex-wrap gap-3 text-lg md:text-xl text-slate-400">
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">تبدأ بفكرة</span>
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">وتكبر بالتحليل</span>
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">وتنضج بالتنفيذ</span>
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">وتستمر بالتطوير</span>
              </div>
            </Card>
          </div>
        </section>

        {/* --- 3. سر تميزنا --- */}
        <section>
          <div className="text-center mb-12 md:mb-16 space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-brand-purple/20 rounded-2xl">
              <ShieldCheck className="w-10 h-10 text-brand-purple" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">سر تميزنا</h2>
            <div className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed space-y-3">
              <p>نحن لا نقدّم خدمات منفصلة…</p>
              <p>بل نبني حلولًا متكاملة تتحرك مع مشروعك من الفكرة إلى الاحتراف.</p>
              <p>ما يميزنا ليس “ما نقدّمه”… بل كيف نفكر.</p>
            </div>
            <div className="pt-6">
              <p className="text-xl md:text-2xl text-brand-purple font-bold">
                نحن ندمج بين أربعة عوالم لا تجتمع عادة:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="group hover:bg-white/5 transition-all space-y-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">1) خبرة تقنية عميقة</h3>
              <p className="text-slate-400 text-lg leading-relaxed">دراسة البرمجيات والخوارزميات، وفهم طريقة تفكير الأنظمة والمنصات.</p>
            </Card>
            <Card className="group hover:bg-white/5 transition-all space-y-4">
              <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">2) تسويق إلكتروني ذكي</h3>
              <p className="text-slate-400 text-lg leading-relaxed">تحليل سلوك الجمهور، وصناعة محتوى يتحرك ويؤثر ويُقنع.</p>
            </Card>
            <Card className="group hover:bg-white/5 transition-all space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">3) خبرة عملية في الأعمال والمبيعات</h3>
              <p className="text-slate-400 text-lg leading-relaxed">خمس سنوات من التعامل مع العملاء، ومعرفة ما يحتاجه العميل فعلًا… وليس ما يظنه البعض أنه يحتاجه.</p>
            </Card>
            <Card className="group hover:bg-white/5 transition-all space-y-4">
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">4) الجانب الإنساني الذي لا يمكن برمجته</h3>
              <p className="text-slate-400 text-lg leading-relaxed">لأن المشاريع ليست أكواد فقط… هي أشخاص، وأفكار، وتوقعات، ومشاعر، وثقة.</p>
            </Card>
          </div>

          <div className="text-center bg-brand-purple/10 border border-brand-purple/20 rounded-3xl p-8 space-y-4">
            <p className="text-2xl md:text-3xl font-bold text-white">النتيجة؟</p>
            <p className="text-xl md:text-2xl font-bold text-brand-purple leading-relaxed">
              منهجية تجعل نتائجنا تتفوق على 99% من السوق.
            </p>
          </div>
        </section>

        {/* --- 4. ماذا نفعل؟ --- */}
        <section className="bg-[#0F0F17] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-white/5">
          <div className="text-center mb-10 md:mb-16 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white">ماذا نفعل؟</h2>
            <div className="text-xl md:text-2xl text-slate-400 leading-relaxed space-y-2">
              <p>نستلم مشروعك من الصفر…</p>
              <p>ونبنيه خطوة بخطوة حتى يصبح منظومة كاملة.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-brand-purple mb-8 text-center">الخدمات الأساسية:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "بناء وتطوير المواقع والأنظمة",
              "تصميم الهويات والشعارات",
              "إدارة الصفحات وصناعة المحتوى",
              "تصوير المنتجات باحترافية",
              "تصميم المحتوى المرئي (فريق إبداعي يجمع الفن + التقنية)",
              "تخطيط المحتوى وفق بيانات حقيقية",
              "نشر محتوى يحقق تفاعلًا وأهدافًا تسويقية",
              "تطوير مستمر بعد التسليم",
              "دعم دائم + تحسينات مبنية على النتائج",
              "حلول مخصصة لكل عميل (لا قوالب جاهزة)",
              "برامج تدريبية لفهم وإدارة المحتوى"
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                <CheckCircle className="w-6 h-6 text-brand-purple shrink-0 mt-0.5" />
                <span className="text-lg text-slate-300 leading-relaxed">{service}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- 5. منظومة سوق الكتاب --- */}
        <section className="relative">
          {/* Background Glows */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2"></div>

          <div className="text-center mb-16 md:mb-20 space-y-6 relative z-10">
            <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm shadow-xl">
              <Layers className="w-10 h-10 text-slate-200" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">منظومة سوق الكتاب</h2>
            <div className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              <p>ثلاثة كيانات متكاملة…</p>
              <p>تخدم احتياجات مختلفة بنفس الجودة والرؤية.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {/* Sooq Alketab - Purple */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="relative group h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-xl"></div>
              <div className="relative h-full bg-[#0B0B14]/80 backdrop-blur-xl border border-brand-purple/20 group-hover:border-brand-purple/50 rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-50"></div>
                
                {/* Banner Image Area */}
                <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden rounded-t-[2.5rem]">
                  {/* ضع رابط صورة الهوية البصرية هنا في خاصية src */}
                  <img 
                    src="https://picsum.photos/seed/sooq1/800/400" 
                    alt="Sooq Alketab Identity" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B14] via-[#0B0B14]/60 to-transparent"></div>
                  
                  {/* Glassmorphism Icon */}
                  <div className="absolute bottom-6 right-8 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-brand-purple drop-shadow-lg" />
                  </div>
                  
                  {/* Number */}
                  <span className="absolute top-6 left-8 text-6xl font-black text-white/20 drop-shadow-lg">01</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Sooq Alketab</h3>
                  <div className="inline-block px-3 py-1 bg-brand-purple/10 border border-brand-purple/20 rounded-full text-brand-purple text-sm font-bold tracking-wide">
                    الصفحة الأم
                  </div>
                </div>
                
                <div className="text-slate-300 text-lg leading-relaxed space-y-4 mb-8">
                  <p className="font-medium text-white">مكتبة رقمية تجمع القرّاء والكتّاب.</p>
                  <p className="text-slate-400">نستلم كتابك من الفكرة الأولى… نراجع نصّه، نعيد صياغته، نصحّحه، ونصمّم غلافه وهويته، ثم نجهّزه للنشر والظهور.</p>
                </div>
                
                <div className="mt-auto bg-[#11111A] border border-white/5 rounded-2xl p-6">
                  <p className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-purple" />
                    الخدمات الأساسية
                  </p>
                  <ul className="space-y-3">
                    {["تطوير الفكرة المحورية", "مراجعة النصوص وتحريرها", "التدقيق اللغوي", "تصميم الغلاف والهوية البصرية", "خدمات الطباعة والنشر", "دعم المؤلفين والكتّاب"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400 group/item hover:text-slate-200 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/50 mt-2.5 group-hover/item:bg-brand-purple group-hover/item:scale-150 transition-all"></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Sooq Alketab Plus - Gold/Amber */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="relative group h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-xl"></div>
              <div className="relative h-full bg-[#0B0B14]/80 backdrop-blur-xl border border-amber-500/20 group-hover:border-amber-500/50 rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
                
                {/* Banner Image Area */}
                <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden rounded-t-[2.5rem]">
                  {/* ضع رابط صورة الهوية البصرية هنا في خاصية src */}
                  <img 
                    src="https://picsum.photos/seed/sooq2/800/400" 
                    alt="Sooq Alketab Plus Identity" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B14] via-[#0B0B14]/60 to-transparent"></div>
                  
                  {/* Glassmorphism Icon */}
                  <div className="absolute bottom-6 right-8 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Megaphone className="w-8 h-8 text-amber-400 drop-shadow-lg" />
                  </div>
                  
                  {/* Number */}
                  <span className="absolute top-6 left-8 text-6xl font-black text-white/20 drop-shadow-lg">02</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Sooq Alketab Plus</h3>
                  <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-bold tracking-wide">
                    محرك النمو
                  </div>
                </div>
                
                <div className="text-slate-300 text-lg leading-relaxed space-y-4 mb-8">
                  <p className="font-medium text-white">هنا نأخذ مشروعك إلى مرحلة الظهور والانتشار.</p>
                  <p className="text-slate-400">نصنع محتوى يتحدث بلغة جمهورك، ونبني استراتيجيات تسويقية مبنية على بيانات حقيقية لضمان وصول رسالتك.</p>
                </div>
                
                <div className="mt-auto bg-[#11111A] border border-white/5 rounded-2xl p-6">
                  <p className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-400" />
                    الخدمات الأساسية
                  </p>
                  <ul className="space-y-3">
                    {["إدارة الصفحات باحترافية", "تصميم المواقع", "حملات إعلانية دقيقة", "عرض منتجات باحتراف", "تخطيط فرص إعلانية", "صناعة محتوى مرئي يتحدث بلغة جمهورك", "استراتيجية محتوى مبنية على البيانات", "تطوير مستمر بعد التسليم"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400 group/item hover:text-slate-200 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 mt-2.5 group-hover/item:bg-amber-400 group-hover/item:scale-150 transition-all"></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Sooq Alketab Tech - Blue */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="relative group h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-xl"></div>
              <div className="relative h-full bg-[#0B0B14]/80 backdrop-blur-xl border border-blue-500/20 group-hover:border-blue-500/50 rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                
                {/* Banner Image Area */}
                <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden rounded-t-[2.5rem]">
                  {/* ضع رابط صورة الهوية البصرية هنا في خاصية src */}
                  <img 
                    src="https://picsum.photos/seed/sooq3/800/400" 
                    alt="Sooq Alketab Tech Identity" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B14] via-[#0B0B14]/60 to-transparent"></div>
                  
                  {/* Glassmorphism Icon */}
                  <div className="absolute bottom-6 right-8 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Cloud className="w-8 h-8 text-blue-400 drop-shadow-lg" />
                  </div>
                  
                  {/* Number */}
                  <span className="absolute top-6 left-8 text-6xl font-black text-white/20 drop-shadow-lg">03</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Sooq Alketab Tech</h3>
                  <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-bold tracking-wide">
                    بوابة التقنية
                  </div>
                </div>
                
                <div className="text-slate-300 text-lg leading-relaxed space-y-4 mb-8">
                  <p className="font-medium text-white">وجهتكم لأفخم الإكسسوارات التقنية المستوردة.</p>
                  <p className="text-slate-400">نوفر أدوات مكتبية ذكية ومعدات تحسين بيئة العمل التي تجمع بين الأناقة والإنتاجية العالية.</p>
                </div>
                
                <div className="mt-auto bg-[#11111A] border border-white/5 rounded-2xl p-6">
                  <p className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-blue-400" />
                    الخدمات الأساسية
                  </p>
                  <ul className="space-y-3">
                    {["إكسسوارات تقنية", "أدوات مكتبية ذكية", "معدات تحسين بيئة العمل", "هدايا تقنية مبتكرة"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-400 group/item hover:text-slate-200 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2.5 group-hover/item:bg-blue-400 group-hover/item:scale-150 transition-all"></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Visual Separator --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center py-16 md:py-24 relative"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-[#7C73E6]/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center justify-center p-6 bg-[#1A1625] rounded-full mb-8">
              <Target className="w-12 h-12 text-[#7C73E6]" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-5xl tracking-tight">
              عملي لا يعتمد على الحظ... <br />
              بل على <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#E8488A] to-[#7C73E6]">منهجية واضحة</span> ونتائج قابلة <br />
              للقياس.
            </h2>
          </div>
        </motion.div>

        {/* --- 6. Analytics Intro & Counters --- */}
        <section className="relative">
          {/* Decorative background for the analytics section */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-brand-purple/5 via-transparent to-transparent blur-3xl pointer-events-none"></div>
          
          <div className="text-center mb-16 space-y-6 relative z-10">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold tracking-wide mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              إحصائيات حية
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              الأثر الحقيقي… <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">يُقاس بما يتحرك</span>
            </h2>
            <div className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              <p>الأرقام هنا ليست للعرض… بل انعكاس لحركة الناس داخل المنظومة.</p>
              <p>كل زيارة… كل ضغطة… كل مشاركة…</p>
              <p className="text-slate-300 font-medium mt-2">هي خطوة جديدة في بناء مشروع يكبر يومًا بعد يوم.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Visitors Card */}
            <motion.div whileHover={{ y: -8 }} className="relative group overflow-hidden rounded-[2.5rem] bg-[#0B0B14] border border-white/10 hover:border-brand-purple/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-10 md:p-12 text-center flex flex-col items-center justify-center space-y-6 relative z-10">
                <div className="w-20 h-20 bg-brand-purple/10 rounded-3xl flex items-center justify-center border border-brand-purple/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  <Eye className="w-10 h-10 text-brand-purple" />
                </div>
                <h3 className="text-2xl font-bold text-slate-300">عدد الزائرين</h3>
                <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">
                  <AnimatedCounter value={stats.visitors} />
                </div>
                <div className="text-lg text-slate-400 leading-relaxed font-light">
                  <p>كل دخول يضيف نقطة جديدة…</p>
                  <p className="text-brand-purple/80 font-medium">ويفتح بابًا جديدًا للنمو.</p>
                </div>
              </div>
            </motion.div>
            
            {/* Clicks Card */}
            <motion.div whileHover={{ y: -8 }} className="relative group overflow-hidden rounded-[2.5rem] bg-[#0B0B14] border border-white/10 hover:border-blue-500/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-10 md:p-12 text-center flex flex-col items-center justify-center space-y-6 relative z-10">
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  <MousePointerClick className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-300">عدد الضغطات على الروابط</h3>
                <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">
                  <AnimatedCounter value={stats.clicks} />
                </div>
                <div className="text-lg text-slate-400 leading-relaxed font-light">
                  <p>كل ضغطة تعني فضولًا…</p>
                  <p className="text-blue-400/80 font-medium">ورغبة في معرفة المزيد.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 7. Gamification --- */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 via-blue-500/20 to-brand-purple/20 blur-[100px] rounded-full pointer-events-none opacity-50"></div>
          
          <div className="relative z-10 bg-[#0B0B14]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
            
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform rotate-12 scale-150">
              <Share2 className="w-96 h-96 text-white" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
              
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-brand-purple to-blue-600 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.4)] mb-4">
                  <Share2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">شارك وكبّر الأثر</h2>
                <div className="text-2xl md:text-3xl text-slate-300 font-light space-y-2">
                  <p>الفكرة تكبر كلما شاركتها…</p>
                  <p className="font-medium text-white">اضغط الآن لتكون جزءًا من النمو.</p>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-14 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-2xl md:text-3xl font-medium text-slate-400 mb-6">إجمالي المشاركات</h3>
                <div className="text-8xl md:text-9xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-8">
                  <AnimatedCounter value={stats.shares} />
                </div>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-lg md:text-xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                  <Gift className="w-6 h-6" />
                  كل مشاركة = تذكرة دخول للسحب.
                </div>
              </div>
              
              {/* Progress Bar & Goals */}
              <div className="space-y-6 bg-black/30 p-8 rounded-3xl border border-white/5">
                <div className="flex justify-between items-end text-lg md:text-xl font-medium">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Target className="w-6 h-6 text-brand-purple"/> 
                    الهدف القادم: <span className="text-white font-bold">1,000 مشاركة</span>
                  </span>
                  <span className="text-brand-purple font-black text-2xl">{stats.shares} <span className="text-slate-500 text-lg font-medium">/ 1000</span></span>
                </div>
                
                <div className="h-6 w-full bg-[#0B0B14] rounded-full overflow-hidden border border-white/10 shadow-inner relative">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-brand-purple via-blue-500 to-emerald-400 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${shareProgress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                  </motion.div>
                </div>
                
                <p className="text-amber-400 text-lg font-medium flex items-center gap-2 justify-center">
                  <Sparkles className="w-5 h-5" /> مكافأة عشوائية بعد 200 مشاركة!
                </p>
              </div>

              <div className="pt-8">
                {!showShareOptions ? (
                  <button 
                    onClick={() => setShowShareOptions(true)}
                    className="group relative inline-flex items-center justify-center gap-4 bg-white text-[#0B0B14] font-black text-2xl py-6 px-16 rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">انشر الرابط الآن</span>
                    <ArrowUpRight className="w-8 h-8 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <button onClick={() => handleShare('whatsapp')} className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-[#20BD5A] hover:scale-105 transition-all shadow-lg shadow-[#25D366]/20 w-full sm:w-auto">
                      <MessageSquare className="w-7 h-7" /> واتساب
                    </button>
                    <button onClick={() => handleShare('twitter')} className="flex items-center justify-center gap-3 bg-[#1DA1F2] text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-[#1A91DA] hover:scale-105 transition-all shadow-lg shadow-[#1DA1F2]/20 w-full sm:w-auto">
                      <Twitter className="w-7 h-7" /> تويتر
                    </button>
                    <button onClick={() => handleShare('facebook')} className="flex items-center justify-center gap-3 bg-[#1877F2] text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-[#166FE5] hover:scale-105 transition-all shadow-lg shadow-[#1877F2]/20 w-full sm:w-auto">
                      <Facebook className="w-7 h-7" /> فيسبوك
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* --- 8. Locked Section & Footer Quote --- */}
        <section className="space-y-8">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#0B0B14] border border-white/5 p-12 md:p-20 text-center group">
            {/* Blurred Background to simulate locked content */}
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/locked/1000/500')] opacity-10 blur-xl grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
            <div className="absolute inset-0 bg-[#0B0B14]/80 backdrop-blur-md"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
              <div className="w-24 h-24 bg-slate-800/80 border border-slate-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative">
                <div className="absolute inset-0 rounded-full border border-slate-600 animate-[ping_3s_infinite] opacity-20"></div>
                <Lock className="w-10 h-10 text-slate-400" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">لوحة المشاركين <span className="text-slate-500 font-medium text-3xl">(مقفلة)</span></h2>
                <div className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
                  <p>تُفتح عند الوصول إلى <span className="text-white font-bold">800 زائر</span>.</p>
                  <p className="text-brand-purple mt-2 font-medium">(الحالي: {stats.visitors})</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-purple/10 via-blue-500/10 to-brand-purple/10 border border-white/10 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="max-w-4xl mx-auto space-y-8 relative z-10">
              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
                هذه الأرقام ليست نهاية الطريق… بل إشارات أننا نسير في الاتجاه الصحيح.
              </p>
              <div className="relative inline-block">
                <span className="absolute -top-8 -right-8 text-6xl text-brand-purple/20 font-serif">"</span>
                <p className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 leading-tight tracking-tight italic">
                  حين يتحرك الناس… <br className="md:hidden" />تتحرك الفكرة.
                </p>
                <span className="absolute -bottom-12 -left-8 text-6xl text-brand-purple/20 font-serif">"</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- 9. Contact --- */}
        <Card>
          <div className="text-center mb-12 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">تواصل معي</h2>
            <div className="text-xl md:text-2xl text-slate-300 leading-relaxed space-y-2">
              <p>هل لديك فكرة أو مشروع؟</p>
              <p>يسعدني دائمًا التعاون والعمل على شيء جديد.</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
            <a href="mailto:sooqalketab@gmail.com" className="flex flex-col items-center text-center gap-4 bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 bg-brand-purple/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-brand-purple" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-400">البريد الإلكتروني</p>
                <p className="text-xl text-white font-bold break-all">sooqalketab@gmail.com</p>
              </div>
            </a>
            <a href="tel:00966551628760" className="flex flex-col items-center text-center gap-4 bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-blue-400" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-400">رقم الهاتف</p>
                <p className="text-xl text-white font-bold" dir="ltr">00966 55 162 8760</p>
              </div>
            </a>
          </div>
        </Card>

      </main>
    </div>
  );
}
