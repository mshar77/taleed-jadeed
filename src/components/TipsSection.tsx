// =========================================================
// قسم النصائح والمعلومات المفيدة
// الفكرة: يرجع الناس للموقع حتى لو ما يبون قطعة الآن
// محتوى مفيد لسائقين الشاحنات والميكانيكية
// =========================================================
import { Lightbulb, Wrench, Calendar, Gauge } from 'lucide-react';

const tips = [
  {
    icon: Calendar,
    title: 'متى تغيّر زيت المحرك؟',
    desc: 'لشاحنات الديزل الثقيلة: كل 20,000–30,000 كم تقريباً حسب نوع التشغيل والحمولة.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Wrench,
    title: 'كيف تعرف القطعة الأصلية؟',
    desc: 'تحقق من رقم القطعة (Part Number)، الباركود، شعار الصانع، وجودة التعبئة والطباعة.',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    icon: Gauge,
    title: 'أعراض ضعف الفرامل',
    desc: 'صوت احتكاك، اهتزاز عند الضغط، أو طول مسافة التوقف — راجعنا فوراً للسلامة.',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: Lightbulb,
    title: 'وفّر بنزينك',
    desc: 'فلاتر هواء نظيفة + إطارات بضغط سليم + صيانة دورية = توفير حتى 15% من الوقود.',
    color: 'from-amber-300 to-yellow-500',
  },
];

export function TipsSection() {
  return (
    <section id="tips" className="container mx-auto px-4 py-20">
      {/* رأس القسم */}
      <div className="text-center mb-12">
        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          نصائح ومعلومات
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          خبرتنا <span className="text-gradient-gold">في خدمتك</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          نصائح مختارة من خبراء قطع الغيار لمساعدتك في الحفاظ على شاحنتك في أفضل حال.
        </p>
      </div>

      {/* شبكة النصائح */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tips.map((tip, i) => (
          <div
            key={i}
            className="group bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-gold hover:-translate-y-1 transition-all"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 transition-transform`}>
              <tip.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-extrabold mb-2 text-foreground">{tip.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
