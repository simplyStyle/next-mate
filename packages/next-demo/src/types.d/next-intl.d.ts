// Use type safe message keys with `next-intl`
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type Messages = typeof import('../../i18n/en.json');

declare interface IntlMessages extends Messages {}
