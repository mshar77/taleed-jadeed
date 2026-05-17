// =========================================================
// الهيدر - يحتوي على الشعار والاسم وروابط التنقل وزر واتساب
// ثابت في أعلى الصفحة (sticky) مع تأثير زجاجي عند التمرير
// =========================================================
import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import logo from '@/assets/logo.png';
import { Heart, MessageCircle, Menu, X, Wrench } from 'lucide-react';
import { buildGeneralWhatsAppLink } from '@/lib/whatsapp';

interface HeaderProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export function Header({ favoritesCount, onOpenFavorites }: HeaderProps) {
  // حالة لمعرفة هل المستخدم نزل بالصفحة (لتغيير شكل الهيدر)
  const [scrolled, setScrolled] = useState(false);
  // حالة فتح/إغلاق قائمة الجوال
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // روابط التنقل داخل الصفحة (تستخدم anchors للأقسام)
  const navLinks = [
    { href: '#products', label: 'القطع' },
    { href: '#offers',   label: 'العروض' },
    { href: '#tips',     label: 'نصائح ومعلومات' },
    { href: '#about',    label: 'من نحن' },
    { href: '#contact',  label: 'تواصل' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-lg shadow-soft border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* الشعار + اسم الشركة - رابط للرئيسية */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <img src={logo} alt="شعار شركة تليد وجديد" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
          <div className="hidden sm:block">
            <h1 className="text-base sm:text-lg font-extrabold text-foreground leading-tight">
              شركة <span className="text-gradient-gold">تليد وجديد</span>
            </h1>
            <p className="text-xs text-muted-foreground">قطع غيار الشاحنات</p>
          </div>
        </Link>

        {/* روابط التنقل - تظهر على الديسكتوب فقط */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          {/* رابط صفحة الأدوات */}
          <Link
            to="/tools"
            className="text-sm font-bold text-primary inline-flex items-center gap-1.5 hover:opacity-80"
          >
            <Wrench className="w-4 h-4" />
            الأدوات والخدمات
          </Link>
        </nav>

        {/* أزرار يمين الهيدر */}
        <div className="flex items-center gap-2">
          {/* زر المفضلة - يعرض عداد القطع المحفوظة */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-full hover:bg-accent transition-colors"
            aria-label="المفضلة"
          >
            <Heart className="w-5 h-5 text-foreground" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* زر واتساب عام */}
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[var(--whatsapp)] text-white px-4 py-2.5 rounded-full font-semibold text-sm shadow-soft hover:shadow-gold transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            تواصل واتساب
          </a>

          {/* زر فتح قائمة الجوال */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2.5 rounded-full hover:bg-accent transition-colors"
            aria-label="القائمة"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* قائمة الجوال - تنفتح تحت الهيدر */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-float-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-accent text-foreground font-semibold"
              >
                {link.label}
              </a>
            ))}
            {/* رابط صفحة الأدوات في قائمة الجوال */}
            <Link
              to="/tools"
              onClick={() => setMobileOpen(false)}
              className="py-2 px-3 rounded-lg bg-primary/10 text-primary font-bold inline-flex items-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              الأدوات والخدمات
            </Link>
            <a
              href={buildGeneralWhatsAppLink()}
              target="_blank" rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-[var(--whatsapp)] text-white px-4 py-3 rounded-full font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              تواصل واتساب
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
