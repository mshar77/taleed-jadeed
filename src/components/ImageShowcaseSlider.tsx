// =========================================================
// سلايدر صور عرضي تحت الهيرو مباشرة
// 5 سلايدات فاضية - الصاحب يبدّل الصور والعناوين من نفس الملف
// يتحرك تلقائياً + أزرار يمين/يسار + نقاط أسفل
// =========================================================
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // تدوير تلقائي كل 4 ثواني
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % showcaseSlides.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const next = () => setIndex((i) => (i + 1) % showcaseSlides.length);
  const prev = () => setIndex((i) => (i - 1 + showcaseSlides.length) % showcaseSlides.length);

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

      {/* صندوق السلايدر */}
      <div className="relative w-full aspect-[16/7] rounded-3xl overflow-hidden shadow-gold border border-border">
        {showcaseSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* تعتيم خفيف لإبراز النص */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* نص فوق الصورة */}
            <div className="absolute bottom-6 right-6 text-white max-w-md">
              <h3 className="text-xl md:text-2xl font-bold mb-1">{slide.title}</h3>
              <p className="text-sm md:text-base text-white/90">{slide.caption}</p>
            </div>
          </div>
        ))}

        {/* أزرار التنقل */}
        <button
          onClick={prev}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur p-2.5 rounded-full shadow-soft hover:bg-background transition"
          aria-label="السابق"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur p-2.5 rounded-full shadow-soft hover:bg-background transition"
          aria-label="التالي"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* النقاط أسفل السلايدر */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
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
    </section>
  );
}
