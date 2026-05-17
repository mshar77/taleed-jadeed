// =========================================================
// درج المفضلة - يفتح من جانب الصفحة ويعرض القطع المحفوظة
// المستخدم يقدر يحفظ القطع اللي يهتم فيها ويرجع لها لاحقاً
// =========================================================
import { X, Heart, MessageCircle, Trash2 } from 'lucide-react';
import { products } from '@/data/products';
import { buildProductWhatsAppLink } from '@/lib/whatsapp';

interface Props {
  open: boolean;
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export function FavoritesDrawer({ open, onClose, favorites, onToggleFavorite }: Props) {
  // نجيب بيانات المنتجات المفضلة من القائمة الكاملة
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <>
      {/* طبقة التعتيم خلف الدرج */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* الدرج نفسه - ينزلق من اليسار (لأن RTL) */}
      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-md bg-background z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* رأس الدرج */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-destructive fill-destructive" />
            <h3 className="text-lg font-extrabold">قطعي المحفوظة</h3>
            <span className="text-sm text-muted-foreground">({favoriteProducts.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* قائمة القطع */}
        <div className="flex-1 overflow-y-auto p-5">
          {favoriteProducts.length === 0 ? (
            // حالة فارغة
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">لا توجد قطع محفوظة بعد</p>
              <p className="text-sm text-muted-foreground">
                اضغط على ♡ على أي قطعة لحفظها هنا
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {favoriteProducts.map((p) => (
                <li
                  key={p.id}
                  className="flex gap-3 bg-card border border-border rounded-xl p-3 shadow-card"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm line-clamp-1">{p.name}</h4>
                    <p className="text-xs font-mono text-primary mt-0.5" dir="ltr">
                      {p.partNumber}
                    </p>
                    <div className="flex gap-1 mt-2">
                      <a
                        href={buildProductWhatsAppLink(p.name, p.partNumber)}
                        target="_blank" rel="noopener noreferrer"
                        className="flex-1 bg-[var(--whatsapp)] text-white text-xs font-bold py-1.5 rounded-lg inline-flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        واتساب
                      </a>
                      <button
                        onClick={() => onToggleFavorite(p.id)}
                        className="bg-secondary p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive transition"
                        aria-label="إزالة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
