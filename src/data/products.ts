// =========================================================
// قاعدة بيانات المنتجات (قطع غيار الشاحنات)
// كل منتج له: id, name (الاسم), partNumber (رقم القطعة المعتمد)
// description (الوصف), category (القسم), price (السعر اختياري),
// image (الصورة), isOffer (هل عليه عرض؟)
// =========================================================

export interface Product {
  id: string;
  name: string;          // اسم القطعة
  partNumber: string;    // رقم القطعة (مهم جداً في عالم قطع الغيار)
  description: string;   // وصف تفصيلي
  category: string;      // القسم (محرك، فرامل، كهرباء...)
  image: string;         // رابط الصورة
  isOffer?: boolean;     // علامة العروض
  isNew?: boolean;       // علامة "وصل حديثاً"
  brand?: string;        // الصانع/التوافق (اختياري للعرض فقط، ليس قسماً)
}

// قائمة الأقسام المرتبة (بدون قسم الماركات حسب طلب العميل)
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
export const products: Product[] = [
  {
    id: 'p1',
    name: 'طرمبة ماء فولفو FH',
    partNumber: '20505543',
    description: 'طرمبة ماء أصلية متوافقة مع شاحنات فولفو FH موديل 2008 وفوق. ضمان الجودة.',
    category: 'engine',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=80',
    brand: 'Volvo',
    isNew: true,
  },
  {
    id: 'p2',
    name: 'دسكات فرامل أمامية مرسيدس أكتروس',
    partNumber: '9424210212',
    description: 'دسكات فرامل ثقيلة مقاومة للحرارة العالية، مناسبة لشاحنات مرسيدس أكتروس.',
    category: 'brakes',
    image: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da77?w=600&q=80',
    brand: 'Mercedes',
    isOffer: true,
  },
  {
    id: 'p3',
    name: 'دينمو سكانيا R-Series',
    partNumber: '1696254',
    description: 'دينمو 28 فولت بقدرة 100 أمبير، أداء عالي وعمر طويل.',
    category: 'electric',
    image: 'https://images.unsplash.com/photo-1620735692151-26a7e0748429?w=600&q=80',
    brand: 'Scania',
  },
  {
    id: 'p4',
    name: 'بلف توازن مان TGS',
    partNumber: '81436106046',
    description: 'بلف توازن هواء أصلي لمنظومة التعليق الهوائي لشاحنات MAN TGS / TGX.',
    category: 'suspension',
    image: 'https://images.unsplash.com/photo-1635269052480-de64f7a4cf8a?w=600&q=80',
    brand: 'MAN',
  },
  {
    id: 'p5',
    name: 'علبة قير دايف اتوماتيك',
    partNumber: 'DAF-105XF',
    description: 'علبة قير معاد تأهيلها بضمان، مناسبة لشاحنات DAF XF 105.',
    category: 'transmission',
    image: 'https://images.unsplash.com/photo-1599256871679-2b8f95657cc0?w=600&q=80',
    brand: 'DAF',
    isOffer: true,
  },
  {
    id: 'p6',
    name: 'فلتر زيت ايسوزو فارجو',
    partNumber: '8980186811',
    description: 'فلتر زيت أصلي، حماية فائقة للمحرك من الشوائب.',
    category: 'filters',
    image: 'https://images.unsplash.com/photo-1605618826115-fb9e775cf795?w=600&q=80',
    brand: 'Isuzu',
  },
  {
    id: 'p7',
    name: 'كشاف أمامي LED هينو 700',
    partNumber: 'HINO-81110',
    description: 'كشاف LED قوي بإضاءة بيضاء واضحة، عمر افتراضي طويل ومقاوم للماء.',
    category: 'electric',
    image: 'https://images.unsplash.com/photo-1597007030739-6d2e7172ee72?w=600&q=80',
    brand: 'Hino',
  },
  {
    id: 'p8',
    name: 'صدام أمامي فولفو FMX',
    partNumber: '82150128',
    description: 'صدام أمامي بلاستيك متين بطلاء أصلي، مقاوم للصدمات.',
    category: 'body',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    brand: 'Volvo',
    isOffer: true,
  },
];
