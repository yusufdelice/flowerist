'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface SortSelectProps {
  currentSort: string;
  className?: string;
}

export default function SortSelect({ currentSort, className }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.delete('page'); // Reset to page 1
    router.push(`/cicekler?${params.toString()}`);
  };

  return (
    <select className={className} value={currentSort} onChange={handleChange}>
      <option value="newest">En Yeni</option>
      <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
      <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
      <option value="name">İsim: A-Z</option>
    </select>
  );
}
