import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
    <div>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
