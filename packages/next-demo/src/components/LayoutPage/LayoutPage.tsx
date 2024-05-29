import { type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ExternalLink } from '../ExternalLink/ExternalLink';

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export function LayoutPage({ children, title }: Props) {
  const t = useTranslations('LayoutPage');

  return (
    <div className="bg-slate-850 relative flex grow flex-col py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1 size-[20500px] translate-x-[-47.5%] rounded-full bg-gradient-to-b from-slate-900 via-cyan-500" />
      </div>
      <div className="container relative mx-auto flex grow flex-col px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <div className="mt-6text-gray-400 md:text-lg">{children}</div>
        <div className="mt-auto grid grid-cols-1 gap-4 pt-20 md:grid-cols-2 lg:gap-12">
          <ExternalLink
            description={t('links.docs.description')}
            href={t('links.docs.href')}
            title={t('links.docs.title')}
          />
          <ExternalLink
            description={t('links.source.description')}
            href={t('links.source.href')}
            title={t('links.source.title')}
          />
        </div>
      </div>
    </div>
  );
}
