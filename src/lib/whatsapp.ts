// =========================================================
// مساعد بناء روابط واتساب
// الرقم المعتمد للمحل (رقم الوالد - 0536655941)
// نحوّله إلى الصيغة الدولية: +966536655941
// =========================================================

export const WHATSAPP_NUMBER = '966536655941'; // بدون + لأن واتساب يقبلها كذا
export const PHONE_DISPLAY  = '0536655941';

/**
 * يبني رابط واتساب مع رسالة جاهزة لمنتج معين
 * @param productName اسم المنتج
 * @param partNumber  رقم القطعة
 */
export function buildProductWhatsAppLink(productName: string, partNumber: string) {
  // الرسالة الجاهزة باللغة العربية — تنرسل لوالد العميل مباشرة
  const message =
`السلام عليكم 👋
أبغى أستفسر عن هذي القطعة من *شركة تليد وجديد*:

🔧 *الاسم:* ${productName}
🔢 *رقم القطعة:* ${partNumber}

هل متوفرة وكم سعرها؟
شكراً 🌹`;

  // encodeURIComponent يضمن إن الرسالة العربية تنرسل صح
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** رابط واتساب عام (بدون منتج محدد) - للاستفسار العام */
export function buildGeneralWhatsAppLink() {
  const message = `السلام عليكم، أبغى أستفسر من شركة *تليد وجديد* لقطع غيار الشاحنات 🚛`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
