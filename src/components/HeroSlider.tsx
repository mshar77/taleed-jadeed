// =========================================================
// سلايدر الهيرو - يعرض 5 صور مع نص ترحيبي
// الصور حالياً تجريبية، الصاحب يقدر يبدلها من نفس الملف
// يدور تلقائياً كل 5 ثواني + يمكن التحكم يدوي بالأسهم
// =========================================================
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Truck, Phone } from 'lucide-react';
import { PHONE_DISPLAY, buildGeneralWhatsAppLink } from '@/lib/whatsapp';

// مصفوفة الصور — 5 صور للهيرو (الصاحب يقدر يضيف/يبدّل)
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80',
    title: 'قطع غيار شاحنات أصلية',
    subtitle: 'تليد وجديد - خبرة سنوات في خدمة سائقين الشاحنات',
  },
  {
    image: 'https://images.unsplash.com/photo-1586191582056-b7f6f37b8c8e?w=1600&q=80',
    title: 'تشكيلة واسعة لجميع الموديلات',
    subtitle: 'فولفو • مرسيدس • سكانيا • مان • داف • هينو',
  },
  {
    image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=1600&q=80',
    title: 'ابحث برقم القطعة مباشرة',
    subtitle: 'الرقم هو لغتنا — نوصّلك للقطعة الصح بدون لف ودوران',
  },
  {
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600&q=80',
    title: 'استفسار سريع عبر واتساب',
    subtitle: 'كل قطعة لها زر واتساب يوصّلك مباشرة معنا',
  },
  {
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80',
    title: 'ضمان • ثقة • استبدال',
    subtitle: 'نضمن لك جودة كل قطعة، وراحة بالك أولويتنا',
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  // التنقل التلقائي بين الصور
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // التنقل اليدوي
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <section id="top" className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      {/* طبقات الصور - واحدة تظهر والباقي مخفي */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* طبقة تعتيم فاتحة لإبراز النص */}
          <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/70 to-background/30" />
        </div>
      ))}

      {/* محتوى الهيرو (النص + الأزرار) */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl animate-float-up" key={index}>
          {/* شريط علوي صغير */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Truck className="w-4 h-4" />
            متخصصون في قطع غيار الشاحنات الثقيلة
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
            {slides[index].title.split(' ').map((word, i) => (
              <span key={i} className={i % 3 === 1 ? 'text-gradient-gold' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            {slides[index].subtitle}
          </p>

          {/* أزرار CTA */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#products"
              className="bg-gradient-gold text-white px-7 py-3.5 rounded-full font-bold shadow-gold hover:scale-105 transition-transform"
            >
              تصفح القطع
            </a>
            <a
              href={buildGeneralWhatsAppLink()}
              target="_blank" rel="noopener noreferrer"
              className="bg-[var(--whatsapp)] text-white px-7 py-3.5 rounded-full font-bold inline-flex items-center gap-2 shadow-soft hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* أزرار التنقل بين الصور */}
      <button
        onClick={prev}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur p-3 rounded-full shadow-soft hover:bg-background transition"
        aria-label="السابق"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur p-3 rounded-full shadow-soft hover:bg-background transition"
        aria-label="التالي"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* النقاط أسفل السلايدر */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-8 bg-primary' : 'w-2 bg-foreground/30'
            }`}
            aria-label={`الصورة ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
