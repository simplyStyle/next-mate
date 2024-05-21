import { type DMMF } from '@prisma/generator-helper';

export type WritableDeep<T> = {
  -readonly [K in keyof T]: WritableDeep<T[K]>;
};

export type CustomFieldAttributes = {
  columnName?: string;
  dbType?: string;
  relationOnUpdate?: string;
};

export type CustomModelAttributes = { doubleAtIndexes?: string[] };

export type CustomAttributes = {
  fields: Record<string, CustomFieldAttributes>;
} & CustomModelAttributes;

export type Field = WritableDeep<DMMF.Field> & CustomFieldAttributes;
export type Model = WritableDeep<DMMF.Model> & {
  fields: Field[];
} & CustomModelAttributes;
