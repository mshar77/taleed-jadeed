// =========================================================
// شريط البحث والأقسام - مرتب في مكان واحد
// البحث يدعم: اسم المنتج + رقم القطعة + الوصف
// الأقسام تظهر كأزرار جميلة قابلة للضغط
// =========================================================
import { Search, X } from 'lucide-react';
import { categories } from '@/data/products';

interface Props {
  search: string;
  setSearch: (s: string) => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}

export function SearchAndCategories({ search, setSearch, activeCategory, setActiveCategory }: Props) {
  return (
    <div className="space-y-6">
      {/* صندوق البحث */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث باسم القطعة أو رقمها (مثال: 20505543)"
            className="w-full bg-card border border-border rounded-2xl py-4 pr-12 pl-12 text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-card transition-all"
          />
          {/* زر مسح البحث */}
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-full transition"
              aria-label="مسح"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {/* تلميحة تحت البحث */}
        <p className="text-center text-xs text-muted-foreground mt-2">
          💡 البحث يدعم رقم القطعة بدقة — اكتب الرقم وسنجد لك القطعة فوراً
        </p>
      </div>

      {/* شريط الأقسام - أزرار قابلة للتمرير أفقياً على الجوال */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide justify-start lg:justify-center">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all border ${
                isActive
                  ? 'bg-gradient-gold text-white border-transparent shadow-gold scale-105'
                  : 'bg-card text-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
