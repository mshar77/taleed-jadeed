// =========================================================
// بطاقة المنتج - تعرض القطعة بشكل أنيق ومرتب
// تحتوي على: صورة، اسم، رقم القطعة، وصف، أزرار واتساب/مفضلة/مشاركة
// =========================================================
import { Heart, MessageCircle, Share2, Hash, Check } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { buildProductWhatsAppLink } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  // حالة "تم نسخ الرابط" بعد ضغط زر المشاركة
  const [copied, setCopied] = useState(false);

  // زر المشاركة: ينسخ رابط مباشر للقطعة عن طريق #partNumber
  const handleShare = async () => {
    const url = `${window.location.origin}/#part-${product.partNumber}`;
    const shareText = `${product.name} - رقم القطعة: ${product.partNumber}\n${url}`;

    // نستخدم Web Share API لو متوفر (الجوالات)، وإلا ننسخ للحافظة
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text: shareText, url });
        return;
      } catch {
        // المستخدم ألغى المشاركة - نتجاهل
      }
    }
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      id={`part-${product.partNumber}`}
      className="card-hover bg-card rounded-2xl overflow-hidden border border-border shadow-card group"
    >
      {/* الصورة + شارة العرض إن وجدت */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* شارة "عرض" */}
        {product.isOffer && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full shadow-soft">
            عرض خاص 🔥
          </div>
        )}
        {/* زر المفضلة (قلب) فوق الصورة */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 left-3 bg-background/90 backdrop-blur p-2 rounded-full shadow-soft hover:scale-110 transition-transform"
          aria-label="إضافة للمفضلة"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-destructive text-destructive' : 'text-foreground'
            }`}
          />
        </button>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-5">
        {/* اسم القطعة */}
        <h3 className="text-base font-extrabold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* رقم القطعة - مهم جداً ومميز بصرياً */}
        <div className="flex items-center gap-2 bg-accent/60 border border-primary/20 rounded-lg px-3 py-2 mb-3">
          <Hash className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-xs text-muted-foreground">رقم القطعة:</span>
          <span className="text-sm font-mono font-bold text-primary tracking-wider ltr:font-mono" dir="ltr">
            {product.partNumber}
          </span>
        </div>

        {/* الوصف - مختصر */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* أزرار الإجراءات */}
        <div className="flex gap-2">
          {/* الزر الرئيسي: واتساب مباشر مع رسالة جاهزة */}
          <a
            href={buildProductWhatsAppLink(product.name, product.partNumber)}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 bg-[var(--whatsapp)] text-white px-4 py-2.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition shadow-soft"
          >
            <MessageCircle className="w-4 h-4" />
            استفسر عبر واتساب
          </a>
          {/* زر المشاركة */}
          <button
            onClick={handleShare}
            className="bg-secondary text-secondary-foreground p-2.5 rounded-xl hover:bg-accent transition"
            aria-label="مشاركة"
            title="مشاركة القطعة"
          >
            {copied ? <Check className="w-4 h-4 text-[var(--whatsapp)]" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </article>
  );
}
