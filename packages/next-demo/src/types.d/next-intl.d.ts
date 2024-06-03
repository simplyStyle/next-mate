// Use type safe message keys with `next-intl`
type Messages = typeof import('../../i18n/en.json');

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare interface IntlMessages extends Messages {}
