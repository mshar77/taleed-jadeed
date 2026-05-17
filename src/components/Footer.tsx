// =========================================================
// الفوتر - يحتوي على معلومات التواصل وحساب لينكد إن
// =========================================================
import { Phone, MapPin, Linkedin, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.png';
import { PHONE_DISPLAY, buildGeneralWhatsAppLink } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background mt-20">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* عمود الشركة */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="شعار" className="h-12 w-12 object-contain bg-background rounded-lg p-1" />
              <div>
                <h4 className="text-lg font-extrabold">شركة تليد وجديد</h4>
                <p className="text-xs text-background/60">قطع غيار الشاحنات</p>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              شركة متخصصة في توفير قطع غيار الشاحنات الثقيلة الأصلية،
              نخدم السائقين والميكانيكية بثقة وضمان.
            </p>
          </div>

          {/* عمود التواصل */}
          <div>
            <h4 className="text-base font-extrabold mb-4 text-gradient-gold">تواصل معنا</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={buildGeneralWhatsAppLink()}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/80 hover:text-primary transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  واتساب: {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${PHONE_DISPLAY}`}
                  className="flex items-center gap-3 text-background/80 hover:text-primary transition"
                >
                  <Phone className="w-4 h-4" />
                  جوال: {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/80">
                <MapPin className="w-4 h-4" />
                المملكة العربية السعودية
              </li>
            </ul>
          </div>

          {/* عمود الروابط الاجتماعية */}
          <div>
            <h4 className="text-base font-extrabold mb-4 text-gradient-gold">حساباتنا</h4>
            <a
              href="https://linkin1.com/taleedjadeed"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-background/10 hover:bg-background/20 px-4 py-3 rounded-xl transition group"
            >
              <Linkedin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-bold">جميع حساباتنا</p>
                <p className="text-xs text-background/60 group-hover:text-background/80" dir="ltr">
                  linkin1.com/taleedjadeed
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* السطر السفلي */}
        <div className="border-t border-background/10 mt-10 pt-6 text-center text-sm text-background/60">
          © {new Date().getFullYear()} شركة تليد وجديد — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
