// =========================================================
// صفحة "الخدمات والأدوات" - تجمع كل الأدوات المفيدة للزبائن
// تشمل: المقارنة، حاسبات، دليل التوافق، جدول صيانة،
//        طلب قطعة غير موجودة، القطع الجديدة
// كل تبويب يحتوي على أداة مستقلة
// =========================================================
import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FavoritesDrawer } from '@/components/FavoritesDrawer';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { useFavorites } from '@/hooks/use-favorites';
import { buildProductWhatsAppLink, WHATSAPP_NUMBER } from '@/lib/whatsapp';
import {
  GitCompareArrows, Calculator, Wrench, BookOpen,
  PackagePlus, Sparkles, ArrowRight, Hash, Send, CheckCircle2
} from 'lucide-react';

export const Route = createFileRoute('/tools')({
  head: () => ({
    meta: [
      { title: 'الأدوات والخدمات | شركة تليد وجديد' },
      { name: 'description', content: 'مقارنة القطع، حاسبات الصيانة، دليل التوافق، وطلب القطع غير المتوفرة.' },
    ],
  }),
  component: ToolsPage,
});

// قائمة التبويبات
const tabs = [
  { id: 'compare',    label: 'مقارنة القطع',     icon: GitCompareArrows },
  { id: 'calculator', label: 'حاسبة الصيانة',    icon: Calculator },
  { id: 'schedule',   label: 'جدول الصيانة',     icon: Wrench },
  { id: 'guide',      label: 'دليل التوافق',     icon: BookOpen },
  { id: 'request',    label: 'اطلب قطعة',        icon: PackagePlus },
  { id: 'new',        label: 'وصل حديثاً',       icon: Sparkles },
];

function ToolsPage() {
  const [tab, setTab] = useState('compare');
  const [favOpen, setFavOpen] = useState(false);
  const { favorites, toggle, isFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Header favoritesCount={favorites.length} onOpenFavorites={() => setFavOpen(true)} />

      {/* هيدر الصفحة */}
      <section className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
            أدوات وخدمات
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            <span className="text-gradient-gold">أدوات</span> تخدمك على الطريق
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            مجموعة أدوات مساعدة لاختيار القطعة الصح، حساب احتياجك، ومعرفة جدول الصيانة الأمثل لشاحنتك.
          </p>
        </div>
      </section>

      {/* شريط التبويبات - يلتف على الجوال */}
      <div className="sticky top-20 z-30 bg-background/85 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition ${
                    active
                      ? 'bg-gradient-gold text-white shadow-gold'
                      : 'bg-secondary text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* محتوى التبويب النشط */}
      <main className="container mx-auto px-4 py-10 md:py-14">
        {tab === 'compare'    && <CompareTool favorites={favorites} toggle={toggle} isFavorite={isFavorite} />}
        {tab === 'calculator' && <CalculatorTool />}
        {tab === 'schedule'   && <ScheduleTool />}
        {tab === 'guide'      && <CompatibilityGuide />}
        {tab === 'request'    && <RequestPartForm />}
        {tab === 'new'        && <NewArrivals favorites={favorites} toggle={toggle} isFavorite={isFavorite} />}
      </main>

      <Footer />
      <FavoritesDrawer
        open={favOpen}
        onClose={() => setFavOpen(false)}
        favorites={favorites}
        onToggleFavorite={toggle}
      />
    </div>
  );
}

// ============= 1) أداة مقارنة قطعتين =============
function CompareTool({ favorites, toggle, isFavorite }: any) {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const pA = products.find((p) => p.id === a);
  const pB = products.find((p) => p.id === b);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">قارن بين قطعتين</h2>
        <p className="text-muted-foreground">اختر قطعتين لمشاهدتهما جنب بعض وسهولة اتخاذ القرار.</p>
      </div>

      {/* اختيار القطع */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <SelectPart label="القطعة الأولى" value={a} onChange={setA} />
        <SelectPart label="القطعة الثانية" value={b} onChange={setB} />
      </div>

      {/* عرض القطعتين جنب بعض */}
      {pA && pB ? (
        <div className="grid sm:grid-cols-2 gap-5">
          <ProductCard product={pA} isFavorite={isFavorite(pA.id)} onToggleFavorite={toggle} />
          <ProductCard product={pB} isFavorite={isFavorite(pB.id)} onToggleFavorite={toggle} />
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-2xl text-muted-foreground">
          اختر قطعتين من القوائم في الأعلى لعرض المقارنة.
        </div>
      )}
    </div>
  );
}

function SelectPart({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold mb-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">— اختر قطعة —</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
    </label>
  );
}

// ============= 2) حاسبة احتياج الزيت/الوقود =============
function CalculatorTool() {
  const [distance, setDistance] = useState('1000');     // المسافة كم
  const [fuelRate, setFuelRate] = useState('35');       // لتر/100كم
  const [oilInterval, setOilInterval] = useState('15000'); // كل كم يتغير الزيت

  const fuelNeeded = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const r = parseFloat(fuelRate) || 0;
    return ((d * r) / 100).toFixed(1);
  }, [distance, fuelRate]);

  const oilChanges = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const i = parseFloat(oilInterval) || 1;
    return Math.ceil(d / i);
  }, [distance, oilInterval]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">حاسبة الصيانة والوقود</h2>
        <p className="text-muted-foreground">احسب تقدير الوقود وعدد مرات تغيير الزيت لرحلتك.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5 shadow-card">
        <NumberField label="المسافة المتوقعة (كم)"      value={distance}     onChange={setDistance} />
        <NumberField label="معدل استهلاك الوقود (لتر/100كم)" value={fuelRate}     onChange={setFuelRate} />
        <NumberField label="فترة تغيير الزيت (كم)"      value={oilInterval}  onChange={setOilInterval} />

        {/* النتيجة */}
        <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
          <ResultBox label="الوقود اللازم" value={`${fuelNeeded} لتر`} />
          <ResultBox label="مرات تغيير الزيت" value={`${oilChanges} مرة`} />
        </div>
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold mb-2">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}

function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gradient-hero rounded-xl p-4 text-center border border-primary/20">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-xl font-extrabold text-gradient-gold">{value}</div>
    </div>
  );
}

// ============= 3) جدول الصيانة الدورية =============
function ScheduleTool() {
  const items = [
    { km: '10,000 كم',  task: 'تغيير زيت المحرك وفلتر الزيت', priority: 'مهم' },
    { km: '20,000 كم',  task: 'تغيير فلتر الهواء والوقود',     priority: 'متوسط' },
    { km: '40,000 كم',  task: 'فحص الفرامل والدسكات',           priority: 'مهم جداً' },
    { km: '60,000 كم',  task: 'تغيير زيت ناقل الحركة',           priority: 'مهم' },
    { km: '80,000 كم',  task: 'فحص نظام التعليق والكفرات',       priority: 'متوسط' },
    { km: '100,000 كم', task: 'صيانة شاملة + فحص دينمو وبطارية', priority: 'مهم جداً' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">جدول الصيانة الدورية</h2>
        <p className="text-muted-foreground">دليل عام لجدولة الصيانة حسب الكيلومترات.</p>
      </div>

      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3 shadow-card">
            <div className="bg-gradient-gold text-white font-extrabold px-4 py-2 rounded-xl text-center min-w-[120px]">
              {it.km}
            </div>
            <div className="flex-1">
              <div className="font-bold">{it.task}</div>
              <div className="text-xs text-muted-foreground mt-1">الأولوية: {it.priority}</div>
            </div>
            <CheckCircle2 className="w-6 h-6 text-primary shrink-0 hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= 4) دليل التوافق =============
function CompatibilityGuide() {
  const [brand, setBrand] = useState('all');
  const brands = ['all', ...Array.from(new Set(products.map((p) => p.brand).filter(Boolean)))] as string[];

  const filtered = brand === 'all' ? products : products.filter((p) => p.brand === brand);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">دليل التوافق</h2>
        <p className="text-muted-foreground">اختر ماركة شاحنتك لعرض القطع المتوافقة معها.</p>
      </div>

      {/* أزرار الماركات */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setBrand(b)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              brand === b ? 'bg-gradient-gold text-white shadow-gold' : 'bg-secondary hover:bg-accent'
            }`}
          >
            {b === 'all' ? 'كل الماركات' : b}
          </button>
        ))}
      </div>

      {/* قائمة القطع المتوافقة */}
      <div className="space-y-2">
        {filtered.map((p) => (
          <a
            key={p.id}
            href={buildProductWhatsAppLink(p.name, p.description)}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 hover:bg-accent transition"
          >
            <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm truncate">{p.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {p.description}
              </div>
            </div>
            {p.brand && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold shrink-0">
                {p.brand}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

// ============= 5) فورم طلب قطعة غير موجودة =============
function RequestPartForm() {
  const [partName, setPartName] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [truckModel, setTruckModel] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // نبني رسالة واتساب جاهزة بكل تفاصيل الطلب
    const message =
`السلام عليكم 👋
أبغى أطلب قطعة غير موجودة في الكتالوج:

🔧 *اسم القطعة:* ${partName || 'غير محدد'}
🔢 *رقم القطعة:* ${partNumber || 'غير معروف'}
🚛 *موديل الشاحنة:* ${truckModel || 'غير محدد'}
📝 *ملاحظات:* ${notes || 'لا يوجد'}

شكراً 🌹`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">اطلب قطعة غير موجودة</h2>
        <p className="text-muted-foreground">ما لقيت القطعة في الكتالوج؟ اطلبها مباشرة وراح نوصلها لك.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5 shadow-card">
        <TextField label="اسم القطعة *" value={partName} onChange={setPartName} required placeholder="مثال: طرمبة ماء" />
        <TextField label="رقم القطعة (إن وجد)" value={partNumber} onChange={setPartNumber} placeholder="مثال: 20505543" />
        <TextField label="موديل الشاحنة" value={truckModel} onChange={setTruckModel} placeholder="مثال: فولفو FH 2015" />

        <label className="block">
          <span className="block text-sm font-bold mb-2">ملاحظات إضافية</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="أي تفاصيل تساعدنا في توفير القطعة الصح..."
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </label>

        <button
          type="submit"
          disabled={!partName}
          className="w-full bg-[var(--whatsapp)] text-white py-3.5 rounded-xl font-bold inline-flex items-center justify-center gap-2 shadow-soft hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          إرسال الطلب عبر واتساب
        </button>
      </form>
    </div>
  );
}

function TextField({ label, value, onChange, required, placeholder }: any) {
  return (
    <label className="block">
      <span className="block text-sm font-bold mb-2">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}

// ============= 6) القطع الواصلة حديثاً =============
function NewArrivals({ favorites, toggle, isFavorite }: any) {
  const newItems = products.filter((p) => p.isNew);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">وصل حديثاً</h2>
        <p className="text-muted-foreground">آخر القطع اللي أضفناها للكتالوج.</p>
      </div>

      {newItems.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-2xl text-muted-foreground">
          لا يوجد قطع جديدة حالياً.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {newItems.map((p) => (
            <ProductCard key={p.id} product={p} isFavorite={isFavorite(p.id)} onToggleFavorite={toggle} />
          ))}
        </div>
      )}
    </div>
  );
}
