// =========================================================
// شريط الثقة - 3 بطاقات فقط حسب طلب العميل:
// 1) ضمان  2) ثقة  3) استرداد واستبدال (حسب الصفقة)
// تم حذف "دعم سريع" و"توصيل سريع" كما طلب العميل
// =========================================================
import { ShieldCheck, Award, RefreshCw } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'ضمان حقيقي',
    desc: 'قطعنا مضمونة الجودة — تشتري وأنت مرتاح البال.',
  },
  {
    icon: Award,
    title: 'ثقة سنوات',
    desc: 'سمعة بنيناها مع السائقين والميكانيكية على مدى سنوات.',
  },
  {
    icon: RefreshCw,
    title: 'استرداد واستبدال',
    desc: 'إمكانية الاسترداد أو الاستبدال حسب اتفاق الصفقة.',
  },
];

export function TrustBar() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-gold transition-all hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mb-4 shadow-gold">
              <item.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-extrabold mb-2 text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
