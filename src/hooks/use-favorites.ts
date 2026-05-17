// =========================================================
// هوك المفضلة - يحفظ القطع اللي يهتم فيها المستخدم
// التخزين في localStorage عشان يرجع لها لاحقاً حتى لو قفل المتصفح
// =========================================================
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'taleed-favorites';

export function useFavorites() {
  // قائمة معرفات المنتجات المفضلة
  const [favorites, setFavorites] = useState<string[]>([]);

  // عند تحميل الصفحة: نقرأ المفضلة من المتصفح
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // تجاهل لو في خطأ في القراءة
    }
  }, []);

  // عند أي تغيير: نحفظ في المتصفح
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // إضافة / إزالة من المفضلة (toggle)
  const toggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggle, isFavorite };
}
