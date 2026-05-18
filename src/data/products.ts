// =========================================================
// قاعدة بيانات المنتجات (قطع غيار الشاحنات)
// كل منتج له: id, name (الاسم), description (الوصف),
// category (القسم), image (الصورة), isOffer/isNew (شارات اختيارية)
// ملاحظة: الشركة تشتغل فقط على فولفو، مرسيدس، ومان
// =========================================================

export interface Product {
  id: string;
  name: string;          // اسم القطعة
  description: string;   // وصف تفصيلي
  category: string;      // القسم (محرك، فرامل، كهرباء...)
  image: string;         // رابط الصورة
  isOffer?: boolean;     // علامة العروض
  isNew?: boolean;       // علامة "وصل حديثاً"
  brand?: string;        // الصانع/التوافق (اختياري للعرض فقط)
}

// قائمة الأقسام المرتبة
export const categories = [
  { id: 'all',        name: 'كل القطع',     icon: '🔧' },
  { id: 'engine',     name: 'المحرك',        icon: '⚙️' },
  { id: 'brakes',     name: 'الفرامل',       icon: '🛑' },
  { id: 'electric',   name: 'الكهرباء',      icon: '⚡' },
  { id: 'suspension', name: 'التعليق',       icon: '🔩' },
  { id: 'transmission', name: 'ناقل الحركة', icon: '🛠️' },
  { id: 'body',       name: 'الهيكل والكابينة', icon: '🚛' },
  { id: 'filters',    name: 'الفلاتر',       icon: '💨' },
];

// منتجات افتراضية — الصاحب يقدر يعدلها لاحقاً من نفس الملف
// (تم حذف منتجات سكانيا، هينو، وداف لأن المحل لا يعمل عليها)
export const products: Product[] = [
  {
    id: 'p1',
    name: 'طرمبة ماء فولفو FH',
    description: 'طرمبة ماء أصلية متوافقة مع شاحنات فولفو FH موديل 2008 وفوق. ضمان الجودة.',
    category: 'engine',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=80',
    brand: 'Volvo',
    isNew: true,
  },
  {
    id: 'p2',
    name: 'دسكات فرامل أمامية مرسيدس أكتروس',
    description: 'دسكات فرامل ثقيلة مقاومة للحرارة العالية، مناسبة لشاحنات مرسيدس أكتروس.',
    category: 'brakes',
    image: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da77?w=600&q=80',
    brand: 'Mercedes',
    isOffer: true,
  },
  {
    id: 'p4',
    name: 'بلف توازن مان TGS',
    description: 'بلف توازن هواء أصلي لمنظومة التعليق الهوائي لشاحنات MAN TGS / TGX.',
    category: 'suspension',
    image: 'https://images.unsplash.com/photo-1635269052480-de64f7a4cf8a?w=600&q=80',
    brand: 'MAN',
  },
  {
    id: 'p8',
    name: 'صدام أمامي فولفو FMX',
    description: 'صدام أمامي بلاستيك متين بطلاء أصلي، مقاوم للصدمات.',
    category: 'body',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    brand: 'Volvo',
    isOffer: true,
  },
];
