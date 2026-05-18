// =========================================================
// سلايدر صور عرضي تحت الهيرو مباشرة
// 5 سلايدات - الصاحب يبدّل الصور والعناوين من نفس الملف
// يتحرك تلقائياً + تنقّل بالسحب باللمس (Swipe) فقط - بدون أسهم
// مكبّر أكثر لإبراز الصور
// =========================================================
import { useEffect, useRef, useState } from 'react';

// 👇 عدّل هذه المصفوفة لإضافة صورك وعناوينك
const showcaseSlides = [
  {
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80',
    title: 'سلايد رقم 1',
    caption: 'اكتب هنا وصف الصورة',
  },
  {
    image: 'https://images.unsplash.com/photo-1586191582056-b7f6f37b8c8e?w=1600&q=80',
    title: 'سلايد رقم 2',
    caption: 'اكتب هنا وصف الصورة',
  },
  {
    image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=1600&q=80',
    title: 'سلايد رقم 3',
    caption: 'اكتب هنا وصف الصورة',
  },
  {
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600&q=80',
    title: 'سلايد رقم 4',
    caption: 'اكتب هنا وصف الصورة',
  },
  {
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80',
    title: 'سلايد رقم 5',
    caption: 'اكتب هنا وصف الصورة',
  },
];

export function ImageShowcaseSlider() {
  const [index, setIndex] = useState(0);
  // مرجع لنقطة بداية اللمس لحساب اتجاه السحب
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // تدوير تلقائي كل 5 ثواني
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % showcaseSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const next = () => setIndex((i) => (i + 1) % showcaseSlides.length);
  const prev = () => setIndex((i) => (i - 1 + showcaseSlides.length) % showcaseSlides.length);

  // ============= معالجات السحب باللمس =============
  // عند بدء اللمس - نسجّل النقطة الأولى
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  // مع تحرّك الإصبع - نحدّث النقطة الأخيرة
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  // عند رفع الإصبع - نحسب المسافة ونحدد الاتجاه
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipe = 50; // أقل مسافة لاعتبار الحركة سحب

    // ملاحظة: الموقع RTL — السحب لليسار يعني التالي، واليمين يعني السابق
    // لكن منطق الإحداثيات لا يتأثر بـ RTL
    if (distance > minSwipe) next();      // سحب لليسار → التالي
    else if (distance < -minSwipe) prev(); // سحب لليمين → السابق

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="container mx-auto px-4 py-12">
      {/* عنوان القسم */}
      <div className="text-center mb-8">
        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
          معرض الصور
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold">
          لمحات من <span className="text-gradient-gold">عالم القطع</span>
        </h2>
      </div>

      {/* صندوق السلايدر - مكبّر (نسبة أعلى للجوال 4/5، 16/9 للديسكتوب) */}
      <div
        className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-gold border border-border touch-pan-y select-none cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {showcaseSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              draggable={false}
              className="w-full h-full object-cover"
            />
            {/* تعتيم خفيف لإبراز النص */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* نص فوق الصورة */}
            <div className="absolute bottom-6 right-6 left-6 text-white max-w-md">
              <h3 className="text-xl md:text-3xl font-bold mb-1">{slide.title}</h3>
              <p className="text-sm md:text-lg text-white/90">{slide.caption}</p>
            </div>
          </div>
        ))}

        {/* النقاط أسفل السلايدر - مهمة للإشارة + كأزرار تنقل بديلة */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {showcaseSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-8 bg-primary' : 'w-2 bg-white/60'
              }`}
              aria-label={`الصورة ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* تلميحة للمستخدم: اسحب للتنقل */}
      <p className="text-center text-xs text-muted-foreground mt-3 sm:hidden">
        ← اسحب يميناً أو يساراً للتنقل بين الصور →
      </p>
    </section>
  );
}
