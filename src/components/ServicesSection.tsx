// =========================================================
// قسم الخدمات الإلكترونية - خدمات شخصية من ابن صاحب المحل
// سلايدر بطاقات يعرض الخدمات (تصميم مواقع، متاجر، تطبيقات...)
// الرقم: 0566312260 (رقم الابن - مختلف عن رقم المحل)
// النصوص ممكن تعديلها لاحقاً من نفس الملف
// =========================================================
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Code2, Globe, ShoppingBag, Smartphone, Sparkles, MessageCircle } from 'lucide-react';

// 👇 رقم الخدمات الإلكترونية (مختلف عن رقم المحل)
const SERVICES_PHONE = '966566312260';
const SERVICES_PHONE_DISPLAY = '0566312260';

// 👇 بطاقات الخدمات - يمكن تعديل النصوص والأيقونات هنا
const services = [
  {
    icon: Globe,
    title: 'تصميم مواقع إلكترونية',
    description: 'مواقع احترافية، سريعة، ومتجاوبة مع جميع الأجهزة. تصميم عصري يعكس هوية مشروعك.',
    badge: 'الأكثر طلباً',
  },
  {
    icon: ShoppingBag,
    title: 'متاجر إلكترونية',
    description: 'متجرك الإلكتروني الكامل مع نظام دفع، إدارة منتجات، وتتبع طلبات بكل سهولة.',
    badge: null,
  },
  {
    icon: Code2,
    title: 'كتالوجات رقمية',
    description: 'كتالوج رقمي مثل هذا الموقع — اعرض منتجاتك بشكل أنيق مع تواصل واتساب مباشر.',
    badge: 'جديد',
  },
  {
    icon: Smartphone,
    title: 'تطبيقات وحلول مخصصة',
    description: 'حلول رقمية مفصّلة على قياس احتياج عملك — من فكرة إلى منتج جاهز للإطلاق.',
    badge: null,
  },
  {
    icon: Sparkles,
    title: 'تطوير وتحسين مواقع',
    description: 'عندك موقع وتبي تطوره؟ نضيف ميزات جديدة ونحسّن السرعة والظهور في جوجل.',
    badge: null,
  },
];

export function ServicesSection() {
  const [index, setIndex] = useState(0);

  // تدوير تلقائي
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % services.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const next = () => setIndex((i) => (i + 1) % services.length);
  const prev = () => setIndex((i) => (i - 1 + services.length) % services.length);

  // بناء رابط واتساب لخدمة معينة
  const buildServiceWhatsApp = (serviceName: string) => {
    const msg = `السلام عليكم 👋\nمهتم بخدمة *${serviceName}* — أبغى أستفسر أكثر.`;
    return `https://wa.me/${SERVICES_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="services" className="container mx-auto px-4 py-20">
      {/* رأس القسم */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          خدمات إضافية
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          الخدمات <span className="text-gradient-gold">الإلكترونية</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          تبي موقع إلكتروني أو متجر أو كتالوج رقمي مثل هذا الموقع؟
          نقدم خدمات تصميم وتطوير المواقع والتطبيقات بأعلى جودة وبأسعار منافسة.
        </p>
      </div>

      {/* سلايدر البطاقات */}
      <div className="relative max-w-4xl mx-auto">
        {/* البطاقة النشطة */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero border border-border shadow-gold">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i === index ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                <div className="p-8 md:p-12 text-center">
                  {/* الأيقونة */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-gold shadow-gold mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* شارة (مثل: الأكثر طلباً) */}
                  {service.badge && (
                    <div className="inline-block bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {service.badge}
                    </div>
                  )}

                  {/* العنوان */}
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
                    {service.title}
                  </h3>

                  {/* الوصف */}
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                    {service.description}
                  </p>

                  {/* أزرار التواصل */}
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href={buildServiceWhatsApp(service.title)}
                      target="_blank" rel="noopener noreferrer"
                      className="bg-[var(--whatsapp)] text-white px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 shadow-soft hover:scale-105 transition-transform"
                    >
                      <MessageCircle className="w-4 h-4" />
                      اطلب الخدمة عبر واتساب
                    </a>
                    <a
                      href={`tel:+${SERVICES_PHONE}`}
                      className="bg-card border border-border text-foreground px-6 py-3 rounded-full font-bold hover:bg-accent transition"
                    >
                      📞 {SERVICES_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* أزرار التنقل يمين/يسار */}
        <button
          onClick={prev}
          className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-background border border-border p-3 rounded-full shadow-soft hover:bg-accent transition z-10"
          aria-label="السابق"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-background border border-border p-3 rounded-full shadow-soft hover:bg-accent transition z-10"
          aria-label="التالي"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* النقاط */}
        <div className="flex justify-center gap-2 mt-6">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
              }`}
              aria-label={`الخدمة ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
