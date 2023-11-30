import './global.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { type PropsWithChildren } from 'react';
import { ClientProvider } from '@/common/client-trpc';
import { Navigation } from '@/components/Navigation';
import { locales } from '@/navigation';

export default async function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren<PageProps>) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as never)) notFound();

  // https://next-intl-docs.vercel.app/blog/next-intl-3-0#static-rendering-of-server-components
  unstable_setRequestLocale(locale);

  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ClientProvider>
          <Navigation />
          <main>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </main>
        </ClientProvider>
      </body>
    </html>
  );
}
