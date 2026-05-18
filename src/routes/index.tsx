// =========================================================
// الصفحة الرئيسية - الكتالوج الرقمي لشركة تليد وجديد
// تجمع كل المكونات في تجربة واحدة سلسة:
//   هيرو (سلايدر) → ثقة → بحث+أقسام → عروض → كل القطع → نصائح → فوتر
// =========================================================
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider';
import { ImageShowcaseSlider } from '@/components/ImageShowcaseSlider';
import { TrustBar } from '@/components/TrustBar';
import { SearchAndCategories } from '@/components/SearchAndCategories';
import { ProductCard } from '@/components/ProductCard';
import { TipsSection } from '@/components/TipsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { Footer } from '@/components/Footer';
import { FavoritesDrawer } from '@/components/FavoritesDrawer';
import { products } from '@/data/products';
import { useFavorites } from '@/hooks/use-favorites';
import { Flame, PackageSearch } from 'lucide-react';

export const Route = createFileRoute('/')({
  // بيانات SEO الأساسية للصفحة
  head: () => ({
    meta: [
      { title: 'شركة تليد وجديد — كتالوج قطع غيار الشاحنات' },
      {
        name: 'description',
        content: 'كتالوج رقمي لقطع غيار الشاحنات (فولفو، مرسيدس، سكانيا، مان، داف، هينو) — استفسر مباشرة عبر واتساب.',
      },
      { property: 'og:title', content: 'شركة تليد وجديد — قطع غيار الشاحنات' },
      { property: 'og:description', content: 'كتالوج رقمي مع استفسار واتساب مباشر لكل قطعة.' },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  // حالة البحث + القسم النشط
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  // درج المفضلة (مفتوح / مغلق)
  const [favOpen, setFavOpen] = useState(false);

  // هوك المفضلة (يحفظ في localStorage)
  const { favorites, toggle, isFavorite } = useFavorites();

  // فلترة المنتجات حسب البحث + القسم
  // useMemo لتفادي إعادة الحساب في كل re-render
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      // فلتر القسم
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;

      // فلتر البحث - يطابق رقم القطعة (الأهم) أو الاسم أو الوصف
      if (q) {
        const haystack = `${p.name} ${p.description} ${p.brand ?? ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, activeCategory]);

  // عزل قطع العروض لعرضها في قسم مستقل
  const offers = useMemo(() => products.filter((p) => p.isOffer), []);

  return (
    <div className="min-h-screen bg-background">
      {/* الهيدر الثابت */}
      <Header favoritesCount={favorites.length} onOpenFavorites={() => setFavOpen(true)} />

      {/* السلايدر الترحيبي */}
      <HeroSlider />

      {/* سلايدر صور تحت الهيرو - 5 سلايدات (الصاحب يضيف صوره) */}
      <ImageShowcaseSlider />

      {/* شريط الثقة (3 بطاقات: ضمان، ثقة، استرداد) */}
      <TrustBar />

      {/* قسم العروض الخاصة */}
      <section id="offers" className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Flame className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">
                عروض <span className="text-gradient-gold">خاصة</span>
              </h2>
              <p className="text-sm text-muted-foreground">قطع مختارة بأسعار وعروض مميزة</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {offers.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isFavorite={isFavorite(p.id)}
              onToggleFavorite={toggle}
            />
          ))}
        </div>
      </section>

      {/* قسم القطع الرئيسي - البحث + الأقسام + المنتجات */}
      <section id="products" className="container mx-auto px-4 py-16 bg-gradient-hero rounded-3xl">
        <div className="text-center mb-10">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            الكتالوج الكامل
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            تصفّح <span className="text-gradient-gold">قطع الغيار</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            استخدم البحث للوصول السريع برقم القطعة، أو تصفّح حسب الأقسام.
          </p>
        </div>

        {/* البحث + شريط الأقسام */}
        <SearchAndCategories
          search={search}
          setSearch={setSearch}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* شبكة المنتجات أو حالة "لا نتائج" */}
        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
              <PackageSearch className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="font-bold text-lg mb-2">ما لقينا قطع تطابق بحثك</p>
              <p className="text-sm text-muted-foreground">
                جرّب رقم قطعة مختلف أو تواصل معنا مباشرة عبر واتساب وراح نخدمك.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFavorite={isFavorite(p.id)}
                  onToggleFavorite={toggle}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* قسم النصائح والمعلومات */}
      <TipsSection />

      {/* قسم الخدمات الإلكترونية (خدمات الابن - تصميم مواقع) */}
      <ServicesSection />

      {/* قسم "من نحن" المختصر */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            من نحن
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
            <span className="text-gradient-gold">تليد وجديد</span> — شركاء النجاح على الطريق
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            شركة سعودية متخصصة في توفير قطع غيار الشاحنات الثقيلة بمختلف الماركات.
            هدفنا إن كل سائق وكل ميكانيكي يلقى القطعة الصح بأسرع وقت وبأفضل جودة،
            مع ضمان حقيقي وخدمة صادقة. قطع غيار تليدة (موثوقة) وجديدة (محدّثة) —
            هذا وعدنا لكم.
          </p>
        </div>
      </section>

      {/* الفوتر */}
      <Footer />

      {/* درج المفضلة (يفتح من اليسار) */}
      <FavoritesDrawer
        open={favOpen}
        onClose={() => setFavOpen(false)}
        favorites={favorites}
        onToggleFavorite={toggle}
      />
    </div>
  );
}
