import { useTranslations } from 'next-intl';
import { LayoutPage } from '@/components/LayoutPage/LayoutPage';

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <LayoutPage title={t('title')}>
      <p className="max-w-[460px]">{t('description')}</p>
    </LayoutPage>
  );
}
