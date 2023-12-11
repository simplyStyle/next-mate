/* eslint-disable */
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string | number };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
  Money: { input: number; output: number };
  Upload: { input: any; output: any };
};

export type ActiveOrderInput = {
  orderToken?: InputMaybe<OrderTokenActiveOrderInput>;
};

export type ActiveOrderResult = NoActiveOrderError | Order;

export type AddPaymentToOrderResult =
  | IneligiblePaymentMethodError
  | NoActiveOrderError
  | Order
  | OrderPaymentStateError
  | OrderStateTransitionError
  | PaymentDeclinedError
  | PaymentFailedError;

export type Address = Node & {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  country: Country;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']['output']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  streetLine1: Scalars['String']['output'];
  streetLine2?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Adjustment = {
  __typename?: 'Adjustment';
  adjustmentSource: Scalars['String']['output'];
  amount: Scalars['Money']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  type: AdjustmentType;
};

export enum AdjustmentType {
  DISTRIBUTED_ORDER_PROMOTION = 'DISTRIBUTED_ORDER_PROMOTION',
  OTHER = 'OTHER',
  PROMOTION = 'PROMOTION',
}

/** Returned when attempting to set the Customer for an Order when already logged in. */
export type AlreadyLoggedInError = ErrorResult & {
  __typename?: 'AlreadyLoggedInError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type ApplyCouponCodeResult =
  | CouponCodeExpiredError
  | CouponCodeInvalidError
  | CouponCodeLimitError
  | Order;

export type Asset = Node & {
  __typename?: 'Asset';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  fileSize: Scalars['Int']['output'];
  focalPoint?: Maybe<Coordinate>;
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  preview: Scalars['String']['output'];
  source: Scalars['String']['output'];
  tags: Array<Tag>;
  type: AssetType;
  updatedAt: Scalars['DateTime']['output'];
  width: Scalars['Int']['output'];
};

export type AssetList = PaginatedList & {
  __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int']['output'];
};

export enum AssetType {
  BINARY = 'BINARY',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export type AuthenticationInput = {
  native?: InputMaybe<NativeAuthInput>;
};

export type AuthenticationMethod = Node & {
  __typename?: 'AuthenticationMethod';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  strategy: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AuthenticationResult =
  | CurrentUser
  | InvalidCredentialsError
  | NotVerifiedError;

export type Banner = Node & {
  __typename?: 'Banner';
  createdAt: Scalars['DateTime']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  languageCode: LanguageCode;
  lgImage: Scalars['String']['output'];
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  position: BannerPosition;
  published: Scalars['Boolean']['output'];
  shortDesc: Scalars['String']['output'];
  translations: Array<BannerTranslation>;
  updatedAt: Scalars['DateTime']['output'];
  xsImage: Scalars['String']['output'];
};

export type BannerFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  displayOrder?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  key?: InputMaybe<StringOperators>;
  languageCode?: InputMaybe<StringOperators>;
  lgImage?: InputMaybe<StringOperators>;
  link?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  position?: InputMaybe<StringOperators>;
  published?: InputMaybe<BooleanOperators>;
  shortDesc?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
  xsImage?: InputMaybe<StringOperators>;
};

export type BannerList = PaginatedList & {
  __typename?: 'BannerList';
  items: Array<Banner>;
  totalItems: Scalars['Int']['output'];
};

export type BannerListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<BannerFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<BannerSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum BannerPosition {
  HomePage = 'HomePage',
}

export type BannerSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  displayOrder?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  lgImage?: InputMaybe<SortOrder>;
  link?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  shortDesc?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  xsImage?: InputMaybe<SortOrder>;
};

export type BannerTranslation = Node & {
  __typename?: 'BannerTranslation';
  id: Scalars['ID']['output'];
  /** 当前语言 */
  languageCode: LanguageCode;
  lgImage: Scalars['String']['output'];
  link: Scalars['String']['output'];
  /** 当前选项的名称 */
  name: Scalars['String']['output'];
  shortDesc: Scalars['String']['output'];
  xsImage: Scalars['String']['output'];
};

export type BooleanCustomFieldConfig = CustomField & {
  __typename?: 'BooleanCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

/** Operators for filtering on a list of Boolean fields */
export type BooleanListOperators = {
  inList: Scalars['Boolean']['input'];
};

/** Operators for filtering on a Boolean field */
export type BooleanOperators = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Campaign = Node & {
  __typename?: 'Campaign';
  applyForBeforeData: CampaignApplyForBeforeData;
  /** 针对不需要领券的活动, 可能无resut配置 */
  applyForResultData?: Maybe<CampaignApplyForResultData>;
  campaignType: CampaignType;
  /** 活动唯一标识 */
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  /** PC活动bannner */
  lgImage?: Maybe<Scalars['String']['output']>;
  /** ADMIN-UI collection编辑应该有BUG 针对translation字段, 暂时遗留此字段为optional #issues/1338 */
  name?: Maybe<Scalars['String']['output']>;
  needClaimCoupon?: Maybe<Scalars['Boolean']['output']>;
  periodOfValidity?: Maybe<Scalars['Int']['output']>;
  promotion?: Maybe<Promotion>;
  promotionId?: Maybe<Scalars['ID']['output']>;
  shortDesc?: Maybe<Scalars['String']['output']>;
  translations: Array<CampaignTranslation>;
  updatedAt: Scalars['DateTime']['output'];
  /** Mobile活动bannner */
  xsImage?: Maybe<Scalars['String']['output']>;
};

export type CampaignApplyForBeforeData = {
  __typename?: 'CampaignApplyForBeforeData';
  /** 按钮文字 */
  buttonText?: Maybe<Scalars['String']['output']>;
  /** 政策小字 */
  policyText: Scalars['String']['output'];
  /** 规则小字 */
  ruleText: Array<Scalars['String']['output']>;
  /** 小字（标题下方） */
  subTitle: Array<Scalars['String']['output']>;
  /** 文本框文字提示 */
  textBoxPlaceholder?: Maybe<Scalars['String']['output']>;
  /** 标题（加粗文字） */
  title: Scalars['String']['output'];
};

export type CampaignApplyForResultData = {
  __typename?: 'CampaignApplyForResultData';
  /** Expiry Date */
  expiryLabel: Scalars['String']['output'];
  /** 规则小字 */
  ruleText: Array<Scalars['String']['output']>;
  /** Terms条款label */
  termsCondition: Scalars['String']['output'];
};

export type CampaignCoupon = Node & {
  __typename?: 'CampaignCoupon';
  campaign: Campaign;
  campaignId: Scalars['ID']['output'];
  couponCode: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  emailAddress: Scalars['String']['output'];
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CampaignCouponList = PaginatedList & {
  __typename?: 'CampaignCouponList';
  items: Array<CampaignCoupon>;
  totalItems: Scalars['Int']['output'];
};

export type CampaignList = PaginatedList & {
  __typename?: 'CampaignList';
  items: Array<Campaign>;
  totalItems: Scalars['Int']['output'];
};

export type CampaignTranslation = Node & {
  __typename?: 'CampaignTranslation';
  applyForBeforeData: CampaignApplyForBeforeData;
  applyForResultData?: Maybe<CampaignApplyForResultData>;
  id: Scalars['ID']['output'];
  /** 当前语言 */
  languageCode: LanguageCode;
  lgImage?: Maybe<Scalars['String']['output']>;
  /** 当前选项的名称 */
  name: Scalars['String']['output'];
  shortDesc?: Maybe<Scalars['String']['output']>;
  xsImage?: Maybe<Scalars['String']['output']>;
};

export enum CampaignType {
  /** 所有用户, 固定金额拉新, 直降模式 */
  AllUserFixedAmount = 'AllUserFixedAmount',
  /** 买一送一+镜片打折 */
  BuyXGetYFreeWithLensDiscount = 'BuyXGetYFreeWithLensDiscount',
  /** 节假日直活动 */
  DirectDiscount = 'DirectDiscount',
  /** 新用户首单镜架1USD */
  NewUserFirstPair = 'NewUserFirstPair',
  /** 新用户固定金额拉新, 领券模式 */
  NewUserFixedAmount = 'NewUserFixedAmount',
}

export type Channel = Node & {
  __typename?: 'Channel';
  availableCurrencyCodes: Array<CurrencyCode>;
  availableLanguageCodes?: Maybe<Array<LanguageCode>>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** @deprecated Use defaultCurrencyCode instead */
  currencyCode: CurrencyCode;
  customFields?: Maybe<Scalars['JSON']['output']>;
  defaultCurrencyCode: CurrencyCode;
  defaultLanguageCode: LanguageCode;
  defaultShippingZone?: Maybe<Zone>;
  defaultTaxZone?: Maybe<Zone>;
  id: Scalars['ID']['output'];
  /** Not yet used - will be implemented in a future release. */
  outOfStockThreshold?: Maybe<Scalars['Int']['output']>;
  pricesIncludeTax: Scalars['Boolean']['output'];
  seller?: Maybe<Seller>;
  token: Scalars['String']['output'];
  /** Not yet used - will be implemented in a future release. */
  trackInventory?: Maybe<Scalars['Boolean']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Collection = Node & {
  __typename?: 'Collection';
  assets: Array<Asset>;
  breadcrumbs: Array<CollectionBreadcrumb>;
  /** 当前分类是否配置了campaign活动 */
  campaign?: Maybe<Campaign>;
  children?: Maybe<Array<Collection>>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<CollectionCustomFields>;
  description: Scalars['String']['output'];
  featuredAsset?: Maybe<Asset>;
  filters: Array<ConfigurableOperation>;
  id: Scalars['ID']['output'];
  languageCode?: Maybe<LanguageCode>;
  name: Scalars['String']['output'];
  parent?: Maybe<Collection>;
  parentId: Scalars['ID']['output'];
  position: Scalars['Int']['output'];
  productVariants: ProductVariantList;
  slug: Scalars['String']['output'];
  translations: Array<CollectionTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CollectionProductVariantsArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type CollectionBreadcrumb = {
  __typename?: 'CollectionBreadcrumb';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type CollectionCustomFields = {
  __typename?: 'CollectionCustomFields';
  campaign?: Maybe<Campaign>;
  collectionType?: Maybe<Scalars['String']['output']>;
  invisible?: Maybe<Scalars['Boolean']['output']>;
  isFeatured?: Maybe<Scalars['Boolean']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
};

export type CollectionFilterParameter = {
  collectionType?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  invisible?: InputMaybe<BooleanOperators>;
  isFeatured?: InputMaybe<BooleanOperators>;
  languageCode?: InputMaybe<StringOperators>;
  metaDescription?: InputMaybe<StringOperators>;
  metaTitle?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  parentId?: InputMaybe<IdOperators>;
  position?: InputMaybe<NumberOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CollectionList = PaginatedList & {
  __typename?: 'CollectionList';
  items: Array<Collection>;
  totalItems: Scalars['Int']['output'];
};

export type CollectionListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CollectionFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CollectionSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
  topLevelOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export type CollectionResult = {
  __typename?: 'CollectionResult';
  collection: Collection;
  count: Scalars['Int']['output'];
};

export type CollectionSortParameter = {
  campaign?: InputMaybe<SortOrder>;
  collectionType?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  invisible?: InputMaybe<SortOrder>;
  isFeatured?: InputMaybe<SortOrder>;
  metaDescription?: InputMaybe<SortOrder>;
  metaTitle?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parentId?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CollectionTranslation = {
  __typename?: 'CollectionTranslation';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<CollectionTranslationCustomFields>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CollectionTranslationCustomFields = {
  __typename?: 'CollectionTranslationCustomFields';
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
};

export type ConfigArg = {
  __typename?: 'ConfigArg';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ConfigArgDefinition = {
  __typename?: 'ConfigArgDefinition';
  defaultValue?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type ConfigArgInput = {
  name: Scalars['String']['input'];
  /** A JSON stringified representation of the actual value */
  value: Scalars['String']['input'];
};

export type ConfigurableOperation = {
  __typename?: 'ConfigurableOperation';
  args: Array<ConfigArg>;
  code: Scalars['String']['output'];
};

export type ConfigurableOperationDefinition = {
  __typename?: 'ConfigurableOperationDefinition';
  args: Array<ConfigArgDefinition>;
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
};

export type ConfigurableOperationInput = {
  arguments: Array<ConfigArgInput>;
  code: Scalars['String']['input'];
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type Country = Node &
  Region & {
    __typename?: 'Country';
    code: Scalars['String']['output'];
    createdAt: Scalars['DateTime']['output'];
    customFields?: Maybe<CountryCustomFields>;
    enabled: Scalars['Boolean']['output'];
    id: Scalars['ID']['output'];
    languageCode: LanguageCode;
    name: Scalars['String']['output'];
    parent?: Maybe<Region>;
    parentId?: Maybe<Scalars['ID']['output']>;
    translations: Array<RegionTranslation>;
    type: Scalars['String']['output'];
    updatedAt: Scalars['DateTime']['output'];
  };

export type CountryCustomFields = {
  __typename?: 'CountryCustomFields';
  displayOrder?: Maybe<Scalars['Int']['output']>;
};

export type CountryList = PaginatedList & {
  __typename?: 'CountryList';
  items: Array<Country>;
  totalItems: Scalars['Int']['output'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeExpiredError = ErrorResult & {
  __typename?: 'CouponCodeExpiredError';
  couponCode: Scalars['String']['output'];
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeInvalidError = ErrorResult & {
  __typename?: 'CouponCodeInvalidError';
  couponCode: Scalars['String']['output'];
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeLimitError = ErrorResult & {
  __typename?: 'CouponCodeLimitError';
  couponCode: Scalars['String']['output'];
  errorCode: ErrorCode;
  limit: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type CreateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode: Scalars['String']['input'];
  customFields?: InputMaybe<Scalars['JSON']['input']>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  streetLine1: Scalars['String']['input'];
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCustomerCustomFieldsInput = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  languageCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCustomerInput = {
  customFields?: InputMaybe<CreateCustomerCustomFieldsInput>;
  emailAddress: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInvitedCustomerProductReviewInput = {
  content: Scalars['String']['input'];
  crop: ReviewCropInput;
  customerNameIsPublic: Scalars['Boolean']['input'];
  encryptedOrderId: Scalars['String']['input'];
  file?: InputMaybe<Array<Scalars['Upload']['input']>>;
  orderLineId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Float']['input'];
  suggestions?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  variantId: Scalars['ID']['input'];
};

export type CreateProductReviewInput = {
  content: Scalars['String']['input'];
  crop: ReviewCropInput;
  customerNameIsPublic: Scalars['Boolean']['input'];
  file?: InputMaybe<Array<Scalars['Upload']['input']>>;
  orderLineId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Float']['input'];
  suggestions?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  variantId: Scalars['ID']['input'];
};

export type CreateTicketInput = {
  issue: Scalars['String']['input'];
  languageCode?: InputMaybe<LanguageCode>;
  subject: Scalars['String']['input'];
};

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  AED = 'AED',
  /** Afghan afghani */
  AFN = 'AFN',
  /** Albanian lek */
  ALL = 'ALL',
  /** Armenian dram */
  AMD = 'AMD',
  /** Netherlands Antillean guilder */
  ANG = 'ANG',
  /** Angolan kwanza */
  AOA = 'AOA',
  /** Argentine peso */
  ARS = 'ARS',
  /** Australian dollar */
  AUD = 'AUD',
  /** Aruban florin */
  AWG = 'AWG',
  /** Azerbaijani manat */
  AZN = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  BAM = 'BAM',
  /** Barbados dollar */
  BBD = 'BBD',
  /** Bangladeshi taka */
  BDT = 'BDT',
  /** Bulgarian lev */
  BGN = 'BGN',
  /** Bahraini dinar */
  BHD = 'BHD',
  /** Burundian franc */
  BIF = 'BIF',
  /** Bermudian dollar */
  BMD = 'BMD',
  /** Brunei dollar */
  BND = 'BND',
  /** Boliviano */
  BOB = 'BOB',
  /** Brazilian real */
  BRL = 'BRL',
  /** Bahamian dollar */
  BSD = 'BSD',
  /** Bhutanese ngultrum */
  BTN = 'BTN',
  /** Botswana pula */
  BWP = 'BWP',
  /** Belarusian ruble */
  BYN = 'BYN',
  /** Belize dollar */
  BZD = 'BZD',
  /** Canadian dollar */
  CAD = 'CAD',
  /** Congolese franc */
  CDF = 'CDF',
  /** Swiss franc */
  CHF = 'CHF',
  /** Chilean peso */
  CLP = 'CLP',
  /** Renminbi (Chinese) yuan */
  CNY = 'CNY',
  /** Colombian peso */
  COP = 'COP',
  /** Costa Rican colon */
  CRC = 'CRC',
  /** Cuban convertible peso */
  CUC = 'CUC',
  /** Cuban peso */
  CUP = 'CUP',
  /** Cape Verde escudo */
  CVE = 'CVE',
  /** Czech koruna */
  CZK = 'CZK',
  /** Djiboutian franc */
  DJF = 'DJF',
  /** Danish krone */
  DKK = 'DKK',
  /** Dominican peso */
  DOP = 'DOP',
  /** Algerian dinar */
  DZD = 'DZD',
  /** Egyptian pound */
  EGP = 'EGP',
  /** Eritrean nakfa */
  ERN = 'ERN',
  /** Ethiopian birr */
  ETB = 'ETB',
  /** Euro */
  EUR = 'EUR',
  /** Fiji dollar */
  FJD = 'FJD',
  /** Falkland Islands pound */
  FKP = 'FKP',
  /** Pound sterling */
  GBP = 'GBP',
  /** Georgian lari */
  GEL = 'GEL',
  /** Ghanaian cedi */
  GHS = 'GHS',
  /** Gibraltar pound */
  GIP = 'GIP',
  /** Gambian dalasi */
  GMD = 'GMD',
  /** Guinean franc */
  GNF = 'GNF',
  /** Guatemalan quetzal */
  GTQ = 'GTQ',
  /** Guyanese dollar */
  GYD = 'GYD',
  /** Hong Kong dollar */
  HKD = 'HKD',
  /** Honduran lempira */
  HNL = 'HNL',
  /** Croatian kuna */
  HRK = 'HRK',
  /** Haitian gourde */
  HTG = 'HTG',
  /** Hungarian forint */
  HUF = 'HUF',
  /** Indonesian rupiah */
  IDR = 'IDR',
  /** Israeli new shekel */
  ILS = 'ILS',
  /** Indian rupee */
  INR = 'INR',
  /** Iraqi dinar */
  IQD = 'IQD',
  /** Iranian rial */
  IRR = 'IRR',
  /** Icelandic króna */
  ISK = 'ISK',
  /** Jamaican dollar */
  JMD = 'JMD',
  /** Jordanian dinar */
  JOD = 'JOD',
  /** Japanese yen */
  JPY = 'JPY',
  /** Kenyan shilling */
  KES = 'KES',
  /** Kyrgyzstani som */
  KGS = 'KGS',
  /** Cambodian riel */
  KHR = 'KHR',
  /** Comoro franc */
  KMF = 'KMF',
  /** North Korean won */
  KPW = 'KPW',
  /** South Korean won */
  KRW = 'KRW',
  /** Kuwaiti dinar */
  KWD = 'KWD',
  /** Cayman Islands dollar */
  KYD = 'KYD',
  /** Kazakhstani tenge */
  KZT = 'KZT',
  /** Lao kip */
  LAK = 'LAK',
  /** Lebanese pound */
  LBP = 'LBP',
  /** Sri Lankan rupee */
  LKR = 'LKR',
  /** Liberian dollar */
  LRD = 'LRD',
  /** Lesotho loti */
  LSL = 'LSL',
  /** Libyan dinar */
  LYD = 'LYD',
  /** Moroccan dirham */
  MAD = 'MAD',
  /** Moldovan leu */
  MDL = 'MDL',
  /** Malagasy ariary */
  MGA = 'MGA',
  /** Macedonian denar */
  MKD = 'MKD',
  /** Myanmar kyat */
  MMK = 'MMK',
  /** Mongolian tögrög */
  MNT = 'MNT',
  /** Macanese pataca */
  MOP = 'MOP',
  /** Mauritanian ouguiya */
  MRU = 'MRU',
  /** Mauritian rupee */
  MUR = 'MUR',
  /** Maldivian rufiyaa */
  MVR = 'MVR',
  /** Malawian kwacha */
  MWK = 'MWK',
  /** Mexican peso */
  MXN = 'MXN',
  /** Malaysian ringgit */
  MYR = 'MYR',
  /** Mozambican metical */
  MZN = 'MZN',
  /** Namibian dollar */
  NAD = 'NAD',
  /** Nigerian naira */
  NGN = 'NGN',
  /** Nicaraguan córdoba */
  NIO = 'NIO',
  /** Norwegian krone */
  NOK = 'NOK',
  /** Nepalese rupee */
  NPR = 'NPR',
  /** New Zealand dollar */
  NZD = 'NZD',
  /** Omani rial */
  OMR = 'OMR',
  /** Panamanian balboa */
  PAB = 'PAB',
  /** Peruvian sol */
  PEN = 'PEN',
  /** Papua New Guinean kina */
  PGK = 'PGK',
  /** Philippine peso */
  PHP = 'PHP',
  /** Pakistani rupee */
  PKR = 'PKR',
  /** Polish złoty */
  PLN = 'PLN',
  /** Paraguayan guaraní */
  PYG = 'PYG',
  /** Qatari riyal */
  QAR = 'QAR',
  /** Romanian leu */
  RON = 'RON',
  /** Serbian dinar */
  RSD = 'RSD',
  /** Russian ruble */
  RUB = 'RUB',
  /** Rwandan franc */
  RWF = 'RWF',
  /** Saudi riyal */
  SAR = 'SAR',
  /** Solomon Islands dollar */
  SBD = 'SBD',
  /** Seychelles rupee */
  SCR = 'SCR',
  /** Sudanese pound */
  SDG = 'SDG',
  /** Swedish krona/kronor */
  SEK = 'SEK',
  /** Singapore dollar */
  SGD = 'SGD',
  /** Saint Helena pound */
  SHP = 'SHP',
  /** Sierra Leonean leone */
  SLL = 'SLL',
  /** Somali shilling */
  SOS = 'SOS',
  /** Surinamese dollar */
  SRD = 'SRD',
  /** South Sudanese pound */
  SSP = 'SSP',
  /** São Tomé and Príncipe dobra */
  STN = 'STN',
  /** Salvadoran colón */
  SVC = 'SVC',
  /** Syrian pound */
  SYP = 'SYP',
  /** Swazi lilangeni */
  SZL = 'SZL',
  /** Thai baht */
  THB = 'THB',
  /** Tajikistani somoni */
  TJS = 'TJS',
  /** Turkmenistan manat */
  TMT = 'TMT',
  /** Tunisian dinar */
  TND = 'TND',
  /** Tongan paʻanga */
  TOP = 'TOP',
  /** Turkish lira */
  TRY = 'TRY',
  /** Trinidad and Tobago dollar */
  TTD = 'TTD',
  /** New Taiwan dollar */
  TWD = 'TWD',
  /** Tanzanian shilling */
  TZS = 'TZS',
  /** Ukrainian hryvnia */
  UAH = 'UAH',
  /** Ugandan shilling */
  UGX = 'UGX',
  /** United States dollar */
  USD = 'USD',
  /** Uruguayan peso */
  UYU = 'UYU',
  /** Uzbekistan som */
  UZS = 'UZS',
  /** Venezuelan bolívar soberano */
  VES = 'VES',
  /** Vietnamese đồng */
  VND = 'VND',
  /** Vanuatu vatu */
  VUV = 'VUV',
  /** Samoan tala */
  WST = 'WST',
  /** CFA franc BEAC */
  XAF = 'XAF',
  /** East Caribbean dollar */
  XCD = 'XCD',
  /** CFA franc BCEAO */
  XOF = 'XOF',
  /** CFP franc (franc Pacifique) */
  XPF = 'XPF',
  /** Yemeni rial */
  YER = 'YER',
  /** South African rand */
  ZAR = 'ZAR',
  /** Zambian kwacha */
  ZMW = 'ZMW',
  /** Zimbabwean dollar */
  ZWL = 'ZWL',
}

export type CurrentUser = {
  __typename?: 'CurrentUser';
  channels: Array<CurrentUserChannel>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
};

export type CurrentUserChannel = {
  __typename?: 'CurrentUserChannel';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  permissions: Array<Permission>;
  token: Scalars['String']['output'];
};

export type CustomField = {
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type CustomFieldConfig =
  | BooleanCustomFieldConfig
  | DateTimeCustomFieldConfig
  | FloatCustomFieldConfig
  | IntCustomFieldConfig
  | LocaleStringCustomFieldConfig
  | LocaleTextCustomFieldConfig
  | RelationCustomFieldConfig
  | StringCustomFieldConfig
  | TextCustomFieldConfig;

export type CustomOptionPreview = {
  __typename?: 'CustomOptionPreview';
  visualImages: Array<Scalars['String']['output']>;
};

export type CustomSizeDataOptionItem = {
  __typename?: 'CustomSizeDataOptionItem';
  key: SizeConfigItemDataOptionKey;
  value: CustomSizeDataOptionItemConfig;
};

/** 自定义size, 每个维度的数据源选择列表配置 */
export type CustomSizeDataOptionItemConfig = {
  __typename?: 'CustomSizeDataOptionItemConfig';
  /** 数据源 */
  data: Array<Scalars['String']['output']>;
  /** i18n当前选项的详细注解, 详细标注当前选项包含的内容 */
  introduction?: Maybe<Scalars['String']['output']>;
  /** i18n输入框label */
  label: Scalars['String']['output'];
  /** i18n输入框placeholder */
  placeHolder: Scalars['String']['output'];
  /** 是否必填项 */
  required: Scalars['Boolean']['output'];
  /** i18n短描述 */
  shortDesc: Scalars['String']['output'];
  /** UI渲染模式, input, list, select等 */
  uiType: CustomSizeDataOptionItemConfigUiType;
};

/** UI渲染模式, input, list, select,等 */
export enum CustomSizeDataOptionItemConfigUiType {
  date = 'date',
  input = 'input',
  list = 'list',
  select = 'select',
}

/** 元数据单位厘米表示, inch程序自动转化 */
export type CustomSizeDataOptions = {
  __typename?: 'CustomSizeDataOptions';
  cm: Array<CustomSizeDataOptionItem>;
  inch: Array<CustomSizeDataOptionItem>;
  type: SizeDataOptionType;
};

export type Customer = Node & {
  __typename?: 'Customer';
  addresses?: Maybe<Array<Address>>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<CustomerCustomFields>;
  emailAddress: Scalars['String']['output'];
  favorites: FavoriteList;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  orders: OrderList;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type CustomerFavoritesArgs = {
  options?: InputMaybe<FavoriteListOptions>;
  productVariantSkuFilter?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerOrdersArgs = {
  options?: InputMaybe<OrderListOptions>;
};

export type CustomerCustomFields = {
  __typename?: 'CustomerCustomFields';
  birthday?: Maybe<Scalars['String']['output']>;
  languageCode?: Maybe<Scalars['String']['output']>;
};

export type CustomerFilterParameter = {
  birthday?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  emailAddress?: InputMaybe<StringOperators>;
  firstName?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  lastName?: InputMaybe<StringOperators>;
  phoneNumber?: InputMaybe<StringOperators>;
  title?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CustomerGroup = Node & {
  __typename?: 'CustomerGroup';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  customers: CustomerList;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CustomerGroupCustomersArgs = {
  options?: InputMaybe<CustomerListOptions>;
};

export type CustomerList = PaginatedList & {
  __typename?: 'CustomerList';
  items: Array<Customer>;
  totalItems: Scalars['Int']['output'];
};

export type CustomerListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CustomerFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CustomerSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomerReviewOrderLines = {
  __typename?: 'CustomerReviewOrderLines';
  customer: Customer;
  reviewOrderLines: Array<ReviewOrderLine>;
};

export type CustomerSortParameter = {
  birthday?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  emailAddress?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  languageCode?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

/** Operators for filtering on a list of Date fields */
export type DateListOperators = {
  inList: Scalars['DateTime']['input'];
};

/** Operators for filtering on a DateTime field */
export type DateOperators = {
  after?: InputMaybe<Scalars['DateTime']['input']>;
  before?: InputMaybe<Scalars['DateTime']['input']>;
  between?: InputMaybe<DateRange>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DateRange = {
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
};

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeCustomFieldConfig = CustomField & {
  __typename?: 'DateTimeCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  max?: Maybe<Scalars['String']['output']>;
  min?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  message?: Maybe<Scalars['String']['output']>;
  result: DeletionResult;
};

export enum DeletionResult {
  /** The entity was successfully deleted */
  DELETED = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NOT_DELETED = 'NOT_DELETED',
}

export type Discount = {
  __typename?: 'Discount';
  adjustmentSource: Scalars['String']['output'];
  amount: Scalars['Money']['output'];
  amountWithTax: Scalars['Money']['output'];
  description: Scalars['String']['output'];
  type: AdjustmentType;
};

/** 定制选项成本详情KEY标识 */
export enum DressCostPriceDetailKey {
  /** 基础成本￥/件 */
  basicCost = 'basicCost',
}

/** 定制选项成本详情 */
export type DressCostPriceDetails = {
  __typename?: 'DressCostPriceDetails';
  /** 成本增加项 */
  key: DressCostPriceDetailKey;
  /** 成本增加金额 */
  ourCost: Scalars['String']['output'];
};

export type DressCustomOption = Node & {
  __typename?: 'DressCustomOption';
  /** 显示的原始价格, 如果提供了, 用来做促销噱头. */
  adjustOldPrice?: Maybe<Scalars['Int']['output']>;
  /** 当前选项默认的需要调整的价格. +, - */
  adjustPrice: Scalars['Int']['output'];
  /** 当前选项的成本清单, 配置而言(基础成本), 此处维护的是原数据 */
  costPrice?: Maybe<Array<DressCostPriceDetails>>;
  createdAt: Scalars['DateTime']['output'];
  /** 当前选项的默认在流程模板配置中的初始化排序值 */
  displayOrder: Scalars['Int']['output'];
  /** 功能特点标识, Up to 20% thinner */
  feature?: Maybe<Scalars['String']['output']>;
  /** 小图标地址, 可以是背景图, base64等. */
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** 当前选项的详细注解, 详细标注当前选项包含的内容 */
  introduction?: Maybe<Array<Scalars['String']['output']>>;
  /** 用来标识当前镜片流程模块的唯一ID值, 不是所有模块选项都需要模块标识, 核心稳定并且参与流程规则的模块才需要 */
  key?: Maybe<DressCustomOptionKeys>;
  languageCode: LanguageCode;
  /** 当前选项的名称 */
  name: Scalars['String']['output'];
  parent?: Maybe<DressCustomOptionParent>;
  parentId?: Maybe<Scalars['ID']['output']>;
  /** 是否有功能预览,通常图片展示 */
  preview?: Maybe<CustomOptionPreview>;
  /** 规则引擎json-rules-engine的规则条件(选项可用/不可用)默认配置, kzfoo-next前端不应该显示, 规则运算放后端 */
  ruleConditions?: Maybe<Scalars['JSON']['output']>;
  /** 当前选项的短描述 */
  shortDesc: Scalars['String']['output'];
  /** 当前流程模版的步骤标签, step1 */
  stepGroupName: DressCustomStepGroups;
  translations: Array<DressCustomOptionTranslation>;
  uiComponents?: Maybe<DressOptionUiComponents>;
  updatedAt: Scalars['DateTime']['output'];
};

/** 定制选项的唯一标识符号,部分无须参与规则运算的选项模块为可选项. */
export enum DressCustomOptionKeys {
  /** T1尺寸配置 */
  T1_SIZE = 'T1_SIZE',
  /** T2额外的织物 */
  T2_EXTRA_FABRIC = 'T2_EXTRA_FABRIC',
  T2_EXTRA_FABRIC_NO_THANKS = 'T2_EXTRA_FABRIC_NO_THANKS',
  /** T2额外的羊毛, 根据面积算. */
  T2_EXTRA_FABRIC_YARD_1 = 'T2_EXTRA_FABRIC_YARD_1',
  T2_EXTRA_FABRIC_YARD_2 = 'T2_EXTRA_FABRIC_YARD_2',
  T2_EXTRA_FABRIC_YARD_3 = 'T2_EXTRA_FABRIC_YARD_3',
  /** T2附加项-夹克 */
  T2_JACKET = 'T2_JACKET',
  T2_JACKET_NO_THANKS = 'T2_JACKET_NO_THANKS',
  /** T2夹克款式 */
  T2_JACKET_STYLE_A = 'T2_JACKET_STYLE_A',
  T2_JACKET_STYLE_B = 'T2_JACKET_STYLE_B',
  T2_JACKET_STYLE_C = 'T2_JACKET_STYLE_C',
  T2_JACKET_STYLE_D = 'T2_JACKET_STYLE_D',
  T2_JACKET_STYLE_E = 'T2_JACKET_STYLE_E',
  T2_JACKET_STYLE_F = 'T2_JACKET_STYLE_F',
  T2_JACKET_STYLE_G = 'T2_JACKET_STYLE_G',
  T2_JACKET_STYLE_H = 'T2_JACKET_STYLE_H',
  T2_JACKET_STYLE_I = 'T2_JACKET_STYLE_I',
  T2_JACKET_STYLE_J = 'T2_JACKET_STYLE_J',
  /** T2附加项-衬裙 */
  T2_PETTICOAT = 'T2_PETTICOAT',
  T2_PETTICOAT_NO_THANKS = 'T2_PETTICOAT_NO_THANKS',
  /** T2衬裙款式 */
  T2_PETTICOAT_STYLE_A = 'T2_PETTICOAT_STYLE_A',
  T2_PETTICOAT_STYLE_B = 'T2_PETTICOAT_STYLE_B',
  T2_PETTICOAT_STYLE_C = 'T2_PETTICOAT_STYLE_C',
  T2_PETTICOAT_STYLE_D = 'T2_PETTICOAT_STYLE_D',
  T2_PETTICOAT_STYLE_E = 'T2_PETTICOAT_STYLE_E',
  /** T2附加项-披肩 */
  T2_SHAWL = 'T2_SHAWL',
  T2_SHAWL_NO_THANKS = 'T2_SHAWL_NO_THANKS',
  T2_SHAWL_STYLE_A = 'T2_SHAWL_STYLE_A',
}

export type DressCustomOptionList = PaginatedList & {
  __typename?: 'DressCustomOptionList';
  items: Array<DressCustomOption>;
  totalItems: Scalars['Int']['output'];
};

export type DressCustomOptionParent = {
  __typename?: 'DressCustomOptionParent';
  id: Scalars['ID']['output'];
};

export type DressCustomOptionTranslation = Node & {
  __typename?: 'DressCustomOptionTranslation';
  /** 功能特点标识, Up to 20% thinner */
  feature?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** 当前选项的详细注解, 详细标注当前选项包含的内容 */
  introduction?: Maybe<Array<Scalars['String']['output']>>;
  /** 当前语言 */
  languageCode: LanguageCode;
  /** 当前选项的名称 */
  name: Scalars['String']['output'];
  /** 当前选项的短描述 */
  shortDesc: Scalars['String']['output'];
};

export type DressCustomOptionsOfStepQueryResult = {
  __typename?: 'DressCustomOptionsOfStepQueryResult';
  /** 尺寸定制流程 */
  T1?: Maybe<Array<DressCustomOption>>;
  /** Step2下面的流程选项,如果有?, 比如附加配件之类的 */
  T2?: Maybe<Array<DressCustomOption>>;
};

/** 流程步骤枚举T1...TX, PREVIEW */
export enum DressCustomStepGroups {
  /** 最后一步, 预览, 确认页 */
  PREVIEW = 'PREVIEW',
  /** 上下文步骤, 商品前置信息 */
  T0 = 'T0',
  /** 用户选择的尺寸 */
  T1 = 'T1',
  /** 添加附属品购买 */
  T2 = 'T2',
}

export type DressOptionUiComponents = {
  __typename?: 'DressOptionUiComponents';
  /** 当前选项的孩子节点展示的UI控件,如CHECK_BOX */
  childComponentType?: Maybe<DressOptionUiComponentsType>;
  /** UI显示空间类型 */
  uiType?: Maybe<DressOptionUiComponentsType>;
  /** UI显示空间类型对应的显示值 */
  uiValue?: Maybe<Scalars['String']['output']>;
};

export enum DressOptionUiComponentsType {
  CHECK_BOX = 'CHECK_BOX',
  TEXT = 'TEXT',
}

export type DressProcessStepInputs = {
  /** 商品上下文数据 */
  T0: T0ProductCtxInput;
  /** 定制尺寸选项 */
  T1?: InputMaybe<UserOptionInput>;
  /** 额外配件选项 */
  T2?: InputMaybe<UserOptionInput>;
};

export type DressSizeConfig = Node & {
  __typename?: 'DressSizeConfig';
  /** 显示的原始价格, 如果提供了, 用来做促销噱头. */
  adjustOldPrice?: Maybe<Scalars['Int']['output']>;
  /** 配置项的加价+ - */
  adjustPrice: Scalars['Int']['output'];
  /** 当前选项的成本清单, 配置而言(基础成本), 此处维护的是原数据 */
  costPrice?: Maybe<Array<DressCostPriceDetails>>;
  /** 当前数据选项类型,标准尺寸, 标准Plus尺寸, 自定义尺寸 */
  dataOptionType: SizeDataOptionType;
  /** 用户端看见的转换后的数据 */
  dataOptions: SizeDataOptions;
  /** 是否禁用此选项 */
  disabled?: Maybe<Scalars['Boolean']['output']>;
  /** 当前选项的默认在流程模板配置中的初始化排序值 */
  displayOrder: Scalars['Int']['output'];
  /** 定制custom选项每一个dataOptionItem可能需要包含,desc,introduction */
  i18nOfDataOptionItems: Array<I18nOfDataOptionItem>;
  id: Scalars['ID']['output'];
  /** 当前选项的详细注解, 详细标注当前选项包含的内容 */
  introduction?: Maybe<Array<Scalars['String']['output']>>;
  /** 配置项内部名称 */
  itemName: SizeItemName;
  languageCode: LanguageCode;
  /** 配置项展示名 */
  name: Scalars['String']['output'];
  /** 未经过转换后的数据, 用于DB存储 */
  rawDataOptions: Array<RawSizeDataOption>;
  /** 短描述 */
  shortDesc: Scalars['String']['output'];
  translations: Array<DressSizeConfigTranslation>;
};

/** 返回当前产品所有可用的size配置项列表, shop */
export type DressSizeConfigItem = {
  __typename?: 'DressSizeConfigItem';
  /** 显示的原始价格, 如果提供了, 用来做促销噱头. */
  adjustOldPrice?: Maybe<Scalars['Int']['output']>;
  /** 选择当前尺寸的动态价格 */
  adjustPrice: Scalars['Int']['output'];
  /** 当前数据选项类型,标准尺寸, 标准Plus尺寸, 自定义尺寸 */
  dataOptionType: SizeDataOptionType;
  /** 当前尺寸的尺寸table. */
  dataOptions: SizeDataOptions;
  /** 当前选项是否处于disabled状态 */
  disabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** 当前选项的详细注解, 详细标注当前选项包含的内容 */
  introduction: Array<Scalars['String']['output']>;
  /** 当前item的唯一名称 */
  itemName: SizeItemName;
  /** 尺寸配置项展示名 */
  name: Scalars['String']['output'];
  /** 尺寸配置项短描述 */
  shortDesc: Scalars['String']['output'];
};

export type DressSizeConfigList = PaginatedList & {
  __typename?: 'DressSizeConfigList';
  items: Array<DressSizeConfig>;
  totalItems: Scalars['Int']['output'];
};

export type DressSizeConfigTranslation = {
  __typename?: 'DressSizeConfigTranslation';
  /** 定制custom选项每一个dataOptionItem可能需要包含,desc,introduction */
  i18nOfDataOptionItems: Array<I18nOfDataOptionItem>;
  id: Scalars['ID']['output'];
  /** 当前选项的详细注解, 详细标注当前选项包含的内容 */
  introduction?: Maybe<Array<Scalars['String']['output']>>;
  languageCode: LanguageCode;
  /** 处方配置项展示名 */
  name: Scalars['String']['output'];
  /** 配置项的描述 */
  shortDesc: Scalars['String']['output'];
};

export type DressUserCustomOptionsOfStepInput = {
  /** 当前用户的(T0...T2)流程输入数据 */
  processStepInputs: DressProcessStepInputs;
  /** 当前查询的流程步骤, 只返回当前步骤下的流程配置选项 */
  step: DressCustomStepGroups;
};

export type EmailAddInput = {
  email: Scalars['String']['input'];
};

/** Returned when attempting to create a Customer with an email address already registered to an existing User. */
export type EmailAddressConflictError = ErrorResult & {
  __typename?: 'EmailAddressConflictError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export enum ErrorCode {
  ALREADY_LOGGED_IN_ERROR = 'ALREADY_LOGGED_IN_ERROR',
  COUPON_CODE_EXPIRED_ERROR = 'COUPON_CODE_EXPIRED_ERROR',
  COUPON_CODE_INVALID_ERROR = 'COUPON_CODE_INVALID_ERROR',
  COUPON_CODE_LIMIT_ERROR = 'COUPON_CODE_LIMIT_ERROR',
  EMAIL_ADDRESS_CONFLICT_ERROR = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  GUEST_CHECKOUT_ERROR = 'GUEST_CHECKOUT_ERROR',
  IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR',
  IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR',
  INELIGIBLE_PAYMENT_METHOD_ERROR = 'INELIGIBLE_PAYMENT_METHOD_ERROR',
  INELIGIBLE_SHIPPING_METHOD_ERROR = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
  INSUFFICIENT_STOCK_ERROR = 'INSUFFICIENT_STOCK_ERROR',
  INVALID_CREDENTIALS_ERROR = 'INVALID_CREDENTIALS_ERROR',
  MISSING_PASSWORD_ERROR = 'MISSING_PASSWORD_ERROR',
  NATIVE_AUTH_STRATEGY_ERROR = 'NATIVE_AUTH_STRATEGY_ERROR',
  NEGATIVE_QUANTITY_ERROR = 'NEGATIVE_QUANTITY_ERROR',
  NOT_VERIFIED_ERROR = 'NOT_VERIFIED_ERROR',
  NO_ACTIVE_ORDER_ERROR = 'NO_ACTIVE_ORDER_ERROR',
  ORDER_LIMIT_ERROR = 'ORDER_LIMIT_ERROR',
  ORDER_MODIFICATION_ERROR = 'ORDER_MODIFICATION_ERROR',
  ORDER_PAYMENT_STATE_ERROR = 'ORDER_PAYMENT_STATE_ERROR',
  ORDER_STATE_TRANSITION_ERROR = 'ORDER_STATE_TRANSITION_ERROR',
  PASSWORD_ALREADY_SET_ERROR = 'PASSWORD_ALREADY_SET_ERROR',
  PASSWORD_RESET_TOKEN_EXPIRED_ERROR = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR',
  PASSWORD_RESET_TOKEN_INVALID_ERROR = 'PASSWORD_RESET_TOKEN_INVALID_ERROR',
  PASSWORD_VALIDATION_ERROR = 'PASSWORD_VALIDATION_ERROR',
  PAYMENT_DECLINED_ERROR = 'PAYMENT_DECLINED_ERROR',
  PAYMENT_FAILED_ERROR = 'PAYMENT_FAILED_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  VERIFICATION_TOKEN_EXPIRED_ERROR = 'VERIFICATION_TOKEN_EXPIRED_ERROR',
  VERIFICATION_TOKEN_INVALID_ERROR = 'VERIFICATION_TOKEN_INVALID_ERROR',
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type Facet = Node & {
  __typename?: 'Facet';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<FacetCustomFields>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  translations: Array<FacetTranslation>;
  updatedAt: Scalars['DateTime']['output'];
  /** Returns a paginated, sortable, filterable list of the Facet's values. Added in v2.1.0. */
  valueList: FacetValueList;
  values: Array<FacetValue>;
};

export type FacetValueListArgs = {
  options?: InputMaybe<FacetValueListOptions>;
};

export type FacetCustomFields = {
  __typename?: 'FacetCustomFields';
  displayOrder?: Maybe<Scalars['Int']['output']>;
  invisible?: Maybe<Scalars['Boolean']['output']>;
};

export type FacetFilterParameter = {
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  displayOrder?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  invisible?: InputMaybe<BooleanOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetList = PaginatedList & {
  __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int']['output'];
};

export type FacetListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FacetFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FacetSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type FacetSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  displayOrder?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  invisible?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FacetTranslation = {
  __typename?: 'FacetTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FacetValue = Node & {
  __typename?: 'FacetValue';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<FacetValueCustomFields>;
  facet: Facet;
  facetId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  translations: Array<FacetValueTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

/** 依赖@semic/plugin-campaign自定义段campaignConfigData */
export type FacetValueCampaignConfigData = {
  __typename?: 'FacetValueCampaignConfigData';
  /** 直降专题, 实际打折的比例 20%, 填字符串20 */
  discountPercent: Scalars['String']['output'];
  /** 直降活动结束时间 */
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  /** 直降, 允许设置当前直降后的售价,  如果配置了此项目, 则覆盖会自动计算discountPercent, 此处$5填写为500 */
  fixedSaleAmount?: Maybe<Scalars['String']['output']>;
  /** 直降专题, 镜架折扣显示标签 */
  promotionText: Scalars['String']['output'];
};

export type FacetValueCustomFields = {
  __typename?: 'FacetValueCustomFields';
  campaignConfigData?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
};

/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export type FacetValueFilterInput = {
  and?: InputMaybe<Scalars['ID']['input']>;
  or?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type FacetValueFilterParameter = {
  campaignConfigData?: InputMaybe<StringOperators>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  facetId?: InputMaybe<IdOperators>;
  icon?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetValueList = PaginatedList & {
  __typename?: 'FacetValueList';
  items: Array<FacetValue>;
  totalItems: Scalars['Int']['output'];
};

export type FacetValueListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FacetValueFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FacetValueSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export type FacetValueResult = {
  __typename?: 'FacetValueResult';
  count: Scalars['Int']['output'];
  facetValue: FacetValue;
};

export type FacetValueSortParameter = {
  campaignConfigData?: InputMaybe<SortOrder>;
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  facetId?: InputMaybe<SortOrder>;
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FacetValueTranslation = {
  __typename?: 'FacetValueTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Favorite = Node & {
  __typename?: 'Favorite';
  createdAt: Scalars['DateTime']['output'];
  customer: Customer;
  id: Scalars['ID']['output'];
  languageCode?: Maybe<LanguageCode>;
  productVariant?: Maybe<ProductVariant>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FavoriteFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FavoriteList = PaginatedList & {
  __typename?: 'FavoriteList';
  items: Array<Favorite>;
  totalItems: Scalars['Int']['output'];
};

export type FavoriteListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FavoriteFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FavoriteSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type FavoriteSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FloatCustomFieldConfig = CustomField & {
  __typename?: 'FloatCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type Fulfillment = Node & {
  __typename?: 'Fulfillment';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  lines: Array<FulfillmentLine>;
  method: Scalars['String']['output'];
  state: Scalars['String']['output'];
  /** @deprecated Use the `lines` field instead */
  summary: Array<FulfillmentLine>;
  trackingCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FulfillmentLine = {
  __typename?: 'FulfillmentLine';
  fulfillment: Fulfillment;
  fulfillmentId: Scalars['ID']['output'];
  orderLine: OrderLine;
  orderLineId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
};

export enum GlobalFlag {
  FALSE = 'FALSE',
  INHERIT = 'INHERIT',
  TRUE = 'TRUE',
}

/** Returned when attempting to set the Customer on a guest checkout when the configured GuestCheckoutStrategy does not allow it. */
export type GuestCheckoutError = ErrorResult & {
  __typename?: 'GuestCheckoutError';
  errorCode: ErrorCode;
  errorDetail: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type HelpCenter = Node & {
  __typename?: 'HelpCenter';
  body: Scalars['String']['output'];
  collections: Array<HelpCenterCollection>;
  createdAt: Scalars['DateTime']['output'];
  displayOrder: Scalars['Int']['output'];
  helpfulNo: Scalars['Int']['output'];
  helpfulYes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  /** 关联文章, 当前文章关联分类, 中的文章, 取上下文 */
  relatedArticles: Array<HelpCenter>;
  shortDesc?: Maybe<Scalars['String']['output']>;
  showOnTop: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  tags: Array<HelpCenterTag>;
  title: Scalars['String']['output'];
  translations: Array<HelpCenterTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type HelpCenterCollection = Node & {
  __typename?: 'HelpCenterCollection';
  breadcrumbs: Array<HelpCenterCollectionBreadcrumb>;
  children?: Maybe<Array<HelpCenterCollection>>;
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayOrder: Scalars['Int']['output'];
  /** 扩展文章分类, 查询指定页面articles */
  helpArticles: HelpCenterList;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<HelpCenterCollection>;
  published: Scalars['Boolean']['output'];
  shortDesc?: Maybe<Scalars['String']['output']>;
  showOnTop: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  translations: Array<HelpCenterCollectionTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type HelpCenterCollectionHelpArticlesArgs = {
  options?: InputMaybe<HelpCenterListOptions>;
};

export type HelpCenterCollectionBreadcrumb = {
  __typename?: 'HelpCenterCollectionBreadcrumb';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type HelpCenterCollectionFilterParameter = {
  coverImage?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  displayOrder?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  metaDescription?: InputMaybe<StringOperators>;
  metaTitle?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  published?: InputMaybe<BooleanOperators>;
  shortDesc?: InputMaybe<StringOperators>;
  showOnTop?: InputMaybe<BooleanOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type HelpCenterCollectionList = PaginatedList & {
  __typename?: 'HelpCenterCollectionList';
  items: Array<HelpCenterCollection>;
  totalItems: Scalars['Int']['output'];
};

export type HelpCenterCollectionListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<HelpCenterCollectionFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<HelpCenterCollectionSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type HelpCenterCollectionSortParameter = {
  coverImage?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  displayOrder?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  metaDescription?: InputMaybe<SortOrder>;
  metaTitle?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  shortDesc?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type HelpCenterCollectionTranslation = {
  __typename?: 'HelpCenterCollectionTranslation';
  coverImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  name: Scalars['String']['output'];
  redirectTo?: Maybe<Scalars['String']['output']>;
  shortDesc?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

export type HelpCenterFilterParameter = {
  body?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  displayOrder?: InputMaybe<NumberOperators>;
  helpfulNo?: InputMaybe<NumberOperators>;
  helpfulYes?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  metaDescription?: InputMaybe<StringOperators>;
  metaTitle?: InputMaybe<StringOperators>;
  published?: InputMaybe<BooleanOperators>;
  shortDesc?: InputMaybe<StringOperators>;
  showOnTop?: InputMaybe<BooleanOperators>;
  slug?: InputMaybe<StringOperators>;
  title?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type HelpCenterHotSearch = Node & {
  __typename?: 'HelpCenterHotSearch';
  createdAt: Scalars['DateTime']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  keyword: Scalars['String']['output'];
  languageCode: LanguageCode;
  published: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type HelpCenterHotSearchFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  displayOrder?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  keyword?: InputMaybe<StringOperators>;
  languageCode?: InputMaybe<StringOperators>;
  published?: InputMaybe<BooleanOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type HelpCenterHotSearchList = PaginatedList & {
  __typename?: 'HelpCenterHotSearchList';
  items: Array<HelpCenterHotSearch>;
  totalItems: Scalars['Int']['output'];
};

export type HelpCenterHotSearchListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<HelpCenterHotSearchFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<HelpCenterHotSearchSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type HelpCenterHotSearchSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  displayOrder?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  keyword?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type HelpCenterList = PaginatedList & {
  __typename?: 'HelpCenterList';
  items: Array<HelpCenter>;
  totalItems: Scalars['Int']['output'];
};

export type HelpCenterListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<HelpCenterFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<HelpCenterSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type HelpCenterSortParameter = {
  body?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  displayOrder?: InputMaybe<SortOrder>;
  helpfulNo?: InputMaybe<SortOrder>;
  helpfulYes?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  metaDescription?: InputMaybe<SortOrder>;
  metaTitle?: InputMaybe<SortOrder>;
  shortDesc?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type HelpCenterTag = Node & {
  __typename?: 'HelpCenterTag';
  createdAt: Scalars['DateTime']['output'];
  displayOrder: Scalars['Int']['output'];
  helpArticles: HelpCenterList;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  name: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  translations: Array<HelpCenterTagTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type HelpCenterTagHelpArticlesArgs = {
  options?: InputMaybe<HelpCenterListOptions>;
};

export type HelpCenterTagFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  displayOrder?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  metaDescription?: InputMaybe<StringOperators>;
  metaTitle?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  published?: InputMaybe<BooleanOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type HelpCenterTagList = PaginatedList & {
  __typename?: 'HelpCenterTagList';
  items: Array<HelpCenterTag>;
  totalItems: Scalars['Int']['output'];
};

export type HelpCenterTagListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<HelpCenterTagFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<HelpCenterTagSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type HelpCenterTagSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  displayOrder?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  metaDescription?: InputMaybe<SortOrder>;
  metaTitle?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type HelpCenterTagTranslation = {
  __typename?: 'HelpCenterTagTranslation';
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type HelpCenterTranslation = {
  __typename?: 'HelpCenterTranslation';
  body: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  shortDesc?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type HelpSummarize = {
  __typename?: 'HelpSummarize';
  topArticles: Array<HelpCenter>;
  topCollections: Array<HelpCenterCollection>;
  topHotSearchWords: Array<HelpCenterHotSearch>;
};

export type HelpSummarizeOptions = {
  topArticleCount?: InputMaybe<Scalars['Int']['input']>;
  topCollectionCount?: InputMaybe<Scalars['Int']['input']>;
  topHotSearchWordCount?: InputMaybe<Scalars['Int']['input']>;
};

export type HistoryEntry = Node & {
  __typename?: 'HistoryEntry';
  createdAt: Scalars['DateTime']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  type: HistoryEntryType;
  updatedAt: Scalars['DateTime']['output'];
};

export type HistoryEntryFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type HistoryEntryList = PaginatedList & {
  __typename?: 'HistoryEntryList';
  items: Array<HistoryEntry>;
  totalItems: Scalars['Int']['output'];
};

export type HistoryEntryListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<HistoryEntryFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<HistoryEntrySortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type HistoryEntrySortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum HistoryEntryType {
  CUSTOMER_ADDED_TO_GROUP = 'CUSTOMER_ADDED_TO_GROUP',
  CUSTOMER_ADDRESS_CREATED = 'CUSTOMER_ADDRESS_CREATED',
  CUSTOMER_ADDRESS_DELETED = 'CUSTOMER_ADDRESS_DELETED',
  CUSTOMER_ADDRESS_UPDATED = 'CUSTOMER_ADDRESS_UPDATED',
  CUSTOMER_DETAIL_UPDATED = 'CUSTOMER_DETAIL_UPDATED',
  CUSTOMER_EMAIL_UPDATE_REQUESTED = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CUSTOMER_EMAIL_UPDATE_VERIFIED = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CUSTOMER_NOTE = 'CUSTOMER_NOTE',
  CUSTOMER_PASSWORD_RESET_REQUESTED = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CUSTOMER_PASSWORD_RESET_VERIFIED = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CUSTOMER_PASSWORD_UPDATED = 'CUSTOMER_PASSWORD_UPDATED',
  CUSTOMER_REGISTERED = 'CUSTOMER_REGISTERED',
  CUSTOMER_REMOVED_FROM_GROUP = 'CUSTOMER_REMOVED_FROM_GROUP',
  CUSTOMER_VERIFIED = 'CUSTOMER_VERIFIED',
  ORDER_CANCELLATION = 'ORDER_CANCELLATION',
  ORDER_COUPON_APPLIED = 'ORDER_COUPON_APPLIED',
  ORDER_COUPON_REMOVED = 'ORDER_COUPON_REMOVED',
  ORDER_FULFILLMENT = 'ORDER_FULFILLMENT',
  ORDER_FULFILLMENT_TRANSITION = 'ORDER_FULFILLMENT_TRANSITION',
  ORDER_MODIFIED = 'ORDER_MODIFIED',
  ORDER_NOTE = 'ORDER_NOTE',
  ORDER_PAYMENT_TRANSITION = 'ORDER_PAYMENT_TRANSITION',
  ORDER_REFUND_TRANSITION = 'ORDER_REFUND_TRANSITION',
  ORDER_STATE_TRANSITION = 'ORDER_STATE_TRANSITION',
}

export type I18nOfDataOptionItem = {
  __typename?: 'I18nOfDataOptionItem';
  /** i18n每一个尺寸配置的数据选项, 可能的tips信息 */
  introduction?: Maybe<Scalars['String']['output']>;
  /** 数据选项的itemKey */
  key: SizeConfigItemDataOptionKey;
  /** i18n输入框label */
  label: Scalars['String']['output'];
  /** i18n输入框placeholder */
  placeHolder: Scalars['String']['output'];
  /** i18n每一个尺寸配置的数据选项, 可能的配置信息 */
  shortDesc: Scalars['String']['output'];
};

/** Operators for filtering on a list of ID fields */
export type IdListOperators = {
  inList: Scalars['ID']['input'];
};

/** Operators for filtering on an ID field */
export type IdOperators = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

/**
 * Returned if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type IdentifierChangeTokenExpiredError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export type IdentifierChangeTokenInvalidError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to add a Payment using a PaymentMethod for which the Order is not eligible. */
export type IneligiblePaymentMethodError = ErrorResult & {
  __typename?: 'IneligiblePaymentMethodError';
  eligibilityCheckerMessage?: Maybe<Scalars['String']['output']>;
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export type IneligibleShippingMethodError = ErrorResult & {
  __typename?: 'IneligibleShippingMethodError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to add more items to the Order than are available */
export type InsufficientStockError = ErrorResult & {
  __typename?: 'InsufficientStockError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
  order: Order;
  quantityAvailable: Scalars['Int']['output'];
};

export type IntCustomFieldConfig = CustomField & {
  __typename?: 'IntCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

/** Returned if the user authentication credentials are not valid */
export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  authenticationError: Scalars['String']['output'];
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  af = 'af',
  /** Akan */
  ak = 'ak',
  /** Amharic */
  am = 'am',
  /** Arabic */
  ar = 'ar',
  /** Assamese */
  as = 'as',
  /** Azerbaijani */
  az = 'az',
  /** Belarusian */
  be = 'be',
  /** Bulgarian */
  bg = 'bg',
  /** Bambara */
  bm = 'bm',
  /** Bangla */
  bn = 'bn',
  /** Tibetan */
  bo = 'bo',
  /** Breton */
  br = 'br',
  /** Bosnian */
  bs = 'bs',
  /** Catalan */
  ca = 'ca',
  /** Chechen */
  ce = 'ce',
  /** Corsican */
  co = 'co',
  /** Czech */
  cs = 'cs',
  /** Church Slavic */
  cu = 'cu',
  /** Welsh */
  cy = 'cy',
  /** Danish */
  da = 'da',
  /** German */
  de = 'de',
  /** Austrian German */
  de_AT = 'de_AT',
  /** Swiss High German */
  de_CH = 'de_CH',
  /** Dzongkha */
  dz = 'dz',
  /** Ewe */
  ee = 'ee',
  /** Greek */
  el = 'el',
  /** English */
  en = 'en',
  /** Australian English */
  en_AU = 'en_AU',
  /** Canadian English */
  en_CA = 'en_CA',
  /** British English */
  en_GB = 'en_GB',
  /** American English */
  en_US = 'en_US',
  /** Esperanto */
  eo = 'eo',
  /** Spanish */
  es = 'es',
  /** European Spanish */
  es_ES = 'es_ES',
  /** Mexican Spanish */
  es_MX = 'es_MX',
  /** Estonian */
  et = 'et',
  /** Basque */
  eu = 'eu',
  /** Persian */
  fa = 'fa',
  /** Dari */
  fa_AF = 'fa_AF',
  /** Fulah */
  ff = 'ff',
  /** Finnish */
  fi = 'fi',
  /** Faroese */
  fo = 'fo',
  /** French */
  fr = 'fr',
  /** Canadian French */
  fr_CA = 'fr_CA',
  /** Swiss French */
  fr_CH = 'fr_CH',
  /** Western Frisian */
  fy = 'fy',
  /** Irish */
  ga = 'ga',
  /** Scottish Gaelic */
  gd = 'gd',
  /** Galician */
  gl = 'gl',
  /** Gujarati */
  gu = 'gu',
  /** Manx */
  gv = 'gv',
  /** Hausa */
  ha = 'ha',
  /** Hebrew */
  he = 'he',
  /** Hindi */
  hi = 'hi',
  /** Croatian */
  hr = 'hr',
  /** Haitian Creole */
  ht = 'ht',
  /** Hungarian */
  hu = 'hu',
  /** Armenian */
  hy = 'hy',
  /** Interlingua */
  ia = 'ia',
  /** Indonesian */
  id = 'id',
  /** Igbo */
  ig = 'ig',
  /** Sichuan Yi */
  ii = 'ii',
  /** Icelandic */
  is = 'is',
  /** Italian */
  it = 'it',
  /** Japanese */
  ja = 'ja',
  /** Javanese */
  jv = 'jv',
  /** Georgian */
  ka = 'ka',
  /** Kikuyu */
  ki = 'ki',
  /** Kazakh */
  kk = 'kk',
  /** Kalaallisut */
  kl = 'kl',
  /** Khmer */
  km = 'km',
  /** Kannada */
  kn = 'kn',
  /** Korean */
  ko = 'ko',
  /** Kashmiri */
  ks = 'ks',
  /** Kurdish */
  ku = 'ku',
  /** Cornish */
  kw = 'kw',
  /** Kyrgyz */
  ky = 'ky',
  /** Latin */
  la = 'la',
  /** Luxembourgish */
  lb = 'lb',
  /** Ganda */
  lg = 'lg',
  /** Lingala */
  ln = 'ln',
  /** Lao */
  lo = 'lo',
  /** Lithuanian */
  lt = 'lt',
  /** Luba-Katanga */
  lu = 'lu',
  /** Latvian */
  lv = 'lv',
  /** Malagasy */
  mg = 'mg',
  /** Maori */
  mi = 'mi',
  /** Macedonian */
  mk = 'mk',
  /** Malayalam */
  ml = 'ml',
  /** Mongolian */
  mn = 'mn',
  /** Marathi */
  mr = 'mr',
  /** Malay */
  ms = 'ms',
  /** Maltese */
  mt = 'mt',
  /** Burmese */
  my = 'my',
  /** Norwegian Bokmål */
  nb = 'nb',
  /** North Ndebele */
  nd = 'nd',
  /** Nepali */
  ne = 'ne',
  /** Dutch */
  nl = 'nl',
  /** Flemish */
  nl_BE = 'nl_BE',
  /** Norwegian Nynorsk */
  nn = 'nn',
  /** Nyanja */
  ny = 'ny',
  /** Oromo */
  om = 'om',
  /** Odia */
  or = 'or',
  /** Ossetic */
  os = 'os',
  /** Punjabi */
  pa = 'pa',
  /** Polish */
  pl = 'pl',
  /** Pashto */
  ps = 'ps',
  /** Portuguese */
  pt = 'pt',
  /** Brazilian Portuguese */
  pt_BR = 'pt_BR',
  /** European Portuguese */
  pt_PT = 'pt_PT',
  /** Quechua */
  qu = 'qu',
  /** Romansh */
  rm = 'rm',
  /** Rundi */
  rn = 'rn',
  /** Romanian */
  ro = 'ro',
  /** Moldavian */
  ro_MD = 'ro_MD',
  /** Russian */
  ru = 'ru',
  /** Kinyarwanda */
  rw = 'rw',
  /** Sanskrit */
  sa = 'sa',
  /** Sindhi */
  sd = 'sd',
  /** Northern Sami */
  se = 'se',
  /** Sango */
  sg = 'sg',
  /** Sinhala */
  si = 'si',
  /** Slovak */
  sk = 'sk',
  /** Slovenian */
  sl = 'sl',
  /** Samoan */
  sm = 'sm',
  /** Shona */
  sn = 'sn',
  /** Somali */
  so = 'so',
  /** Albanian */
  sq = 'sq',
  /** Serbian */
  sr = 'sr',
  /** Southern Sotho */
  st = 'st',
  /** Sundanese */
  su = 'su',
  /** Swedish */
  sv = 'sv',
  /** Swahili */
  sw = 'sw',
  /** Congo Swahili */
  sw_CD = 'sw_CD',
  /** Tamil */
  ta = 'ta',
  /** Telugu */
  te = 'te',
  /** Tajik */
  tg = 'tg',
  /** Thai */
  th = 'th',
  /** Tigrinya */
  ti = 'ti',
  /** Turkmen */
  tk = 'tk',
  /** Tongan */
  to = 'to',
  /** Turkish */
  tr = 'tr',
  /** Tatar */
  tt = 'tt',
  /** Uyghur */
  ug = 'ug',
  /** Ukrainian */
  uk = 'uk',
  /** Urdu */
  ur = 'ur',
  /** Uzbek */
  uz = 'uz',
  /** Vietnamese */
  vi = 'vi',
  /** Volapük */
  vo = 'vo',
  /** Wolof */
  wo = 'wo',
  /** Xhosa */
  xh = 'xh',
  /** Yiddish */
  yi = 'yi',
  /** Yoruba */
  yo = 'yo',
  /** Chinese */
  zh = 'zh',
  /** Simplified Chinese */
  zh_Hans = 'zh_Hans',
  /** Traditional Chinese */
  zh_Hant = 'zh_Hant',
  /** Zulu */
  zu = 'zu',
}

/** 查询尺寸配置项输入参数, 暂时可能用不上, 为未来扩展预留 */
export type ListDressSizeConfigsInput = {
  /** 商品上下文信息: DressCustomStepGroups */
  T0: T0ProductCtxInput;
};

export type LocaleStringCustomFieldConfig = CustomField & {
  __typename?: 'LocaleStringCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  length?: Maybe<Scalars['Int']['output']>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  pattern?: Maybe<Scalars['String']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type LocaleTextCustomFieldConfig = CustomField & {
  __typename?: 'LocaleTextCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type LocalizedString = {
  __typename?: 'LocalizedString';
  languageCode: LanguageCode;
  value: Scalars['String']['output'];
};

export enum LogicalOperator {
  AND = 'AND',
  OR = 'OR',
}

/** Returned when attempting to register or verify a customer account without a password, when one is required. */
export type MissingPasswordError = ErrorResult & {
  __typename?: 'MissingPasswordError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds an item to the order. If custom fields are defined on the OrderLine entity, a third argument 'customFields' will be available. */
  addItemToOrder: UpdateOrderItemsResult;
  /** Add a Payment to the Order */
  addPaymentToOrder: AddPaymentToOrderResult;
  addSubscriptionEmail: UserSubscription;
  addSubscriptionPhone: UserSubscription;
  /** Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
  adjustOrderLine: UpdateOrderItemsResult;
  /** Applies the given coupon code to the active Order */
  applyCouponCode: ApplyCouponCodeResult;
  /** 申请特定活动的优惠码, 返回申请的优惠券信息 */
  applyForCouponCode?: Maybe<CampaignCoupon>;
  /** Authenticates the user using a named authentication strategy */
  authenticate: AuthenticationResult;
  /** Create a new Customer Address */
  createCustomerAddress: Address;
  createInvitedCustomerProductReview?: Maybe<ProductReview>;
  createProductReview?: Maybe<ProductReview>;
  createTicket?: Maybe<Ticket>;
  /** Delete an existing Address */
  deleteCustomerAddress: Success;
  /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
  login: NativeAuthenticationResult;
  /** End the current authenticated session */
  logout: Success;
  /** Regenerate and send a verification token for a new Customer registration. Only applicable if `authOptions.requireVerification` is set to true. */
  refreshCustomerVerification: RefreshCustomerVerificationResult;
  /**
   * Register a Customer account with the given credentials. There are three possible registration flows:
   *
   * _If `authOptions.requireVerification` is set to `true`:_
   *
   * 1. **The Customer is registered _with_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _without_ a password. The Customer is then
   *    verified and authenticated in one step.
   * 2. **The Customer is registered _without_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _with_ the chosen password of the Customer. The Customer is then
   *    verified and authenticated in one step.
   *
   * _If `authOptions.requireVerification` is set to `false`:_
   *
   * 3. The Customer _must_ be registered _with_ a password. No further action is needed - the Customer is able to authenticate immediately.
   */
  registerCustomerAccount: RegisterCustomerAccountResult;
  /** Remove all OrderLine from the Order */
  removeAllOrderLines: RemoveOrderItemsResult;
  /** Removes the given coupon code from the active Order */
  removeCouponCode?: Maybe<Order>;
  /** Remove an OrderLine from the Order */
  removeOrderLine: RemoveOrderItemsResult;
  /** Requests a password reset email to be sent */
  requestPasswordReset?: Maybe<RequestPasswordResetResult>;
  /**
   * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
   * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
   * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
   * that verification token to the Customer, which is then used to verify the change of email address.
   */
  requestUpdateCustomerEmailAddress: RequestUpdateCustomerEmailAddressResult;
  /** Resets a Customer's password based on the provided token */
  resetPassword: ResetPasswordResult;
  /** 保存当前STEP的数据, 并返回激活订单的详细信息 */
  saveUserCustomOptionsOfStep: UpdateOrderItemsResult;
  /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
  setCustomerForOrder: SetCustomerForOrderResult;
  /** Sets the billing address for this order */
  setOrderBillingAddress: ActiveOrderResult;
  /** Allows any custom fields to be set for the active order */
  setOrderCustomFields: ActiveOrderResult;
  /** Sets the shipping address for this order */
  setOrderShippingAddress: ActiveOrderResult;
  /**
   * Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query.
   * An Order can have multiple shipping methods, in which case you can pass an array of ids. In this case,
   * you should configure a custom ShippingLineAssignmentStrategy in order to know which OrderLines each
   * shipping method will apply to.
   */
  setOrderShippingMethod: SetOrderShippingMethodResult;
  settlePayment: Scalars['Boolean']['output'];
  toggleFavorite?: Maybe<ToggleFavoriteResult>;
  /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
  transitionOrderToState?: Maybe<TransitionOrderToStateResult>;
  /** Update an existing Customer */
  updateCustomer: Customer;
  /** Update an existing Address */
  updateCustomerAddress: Address;
  /**
   * Confirm the update of the emailAddress with the provided token, which has been generated by the
   * `requestUpdateCustomerEmailAddress` mutation.
   */
  updateCustomerEmailAddress: UpdateCustomerEmailAddressResult;
  /** Update the password of the active Customer */
  updateCustomerPassword: UpdateCustomerPasswordResult;
  /** Create a new help center helpful yes/no */
  updateHelpCenterHelpful: HelpCenter;
  updateProductReview?: Maybe<ProductReview>;
  /** Create a new Topic helpful yes/no */
  updateTopicHelpful: Topic;
  /**
   * Verify a Customer email address with the token sent to that address. Only applicable if `authOptions.requireVerification` is set to true.
   *
   * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the password _must_ be
   * provided here.
   */
  verifyCustomerAccount: VerifyCustomerAccountResult;
  voteOnReview: ProductReview;
};

export type MutationAddItemToOrderArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  customFields?: InputMaybe<OrderLineCustomFieldsInput>;
  productVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type MutationAddPaymentToOrderArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  input: PaymentInput;
};

export type MutationAddSubscriptionEmailArgs = {
  input: EmailAddInput;
};

export type MutationAddSubscriptionPhoneArgs = {
  input: PhoneAddInput;
};

export type MutationAdjustOrderLineArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  customFields?: InputMaybe<OrderLineCustomFieldsInput>;
  orderLineId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type MutationApplyCouponCodeArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  couponCode: Scalars['String']['input'];
};

export type MutationApplyForCouponCodeArgs = {
  code: Scalars['String']['input'];
  emailAddress: Scalars['String']['input'];
};

export type MutationAuthenticateArgs = {
  input: AuthenticationInput;
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput;
};

export type MutationCreateInvitedCustomerProductReviewArgs = {
  input: CreateInvitedCustomerProductReviewInput;
};

export type MutationCreateProductReviewArgs = {
  input: CreateProductReviewInput;
};

export type MutationCreateTicketArgs = {
  input: CreateTicketInput;
};

export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID']['input'];
};

export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
};

export type MutationRefreshCustomerVerificationArgs = {
  emailAddress: Scalars['String']['input'];
};

export type MutationRegisterCustomerAccountArgs = {
  input: RegisterCustomerInput;
};

export type MutationRemoveAllOrderLinesArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
};

export type MutationRemoveCouponCodeArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  couponCode: Scalars['String']['input'];
};

export type MutationRemoveOrderLineArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  orderLineId: Scalars['ID']['input'];
};

export type MutationRequestPasswordResetArgs = {
  emailAddress: Scalars['String']['input'];
};

export type MutationRequestUpdateCustomerEmailAddressArgs = {
  newEmailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type MutationSaveUserCustomOptionsOfStepArgs = {
  input: SaveUserCustomOptionStepInput;
};

export type MutationSetCustomerForOrderArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  input: CreateCustomerInput;
};

export type MutationSetOrderBillingAddressArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  input: CreateAddressInput;
};

export type MutationSetOrderCustomFieldsArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  input: UpdateOrderInput;
};

export type MutationSetOrderShippingAddressArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  input: CreateAddressInput;
};

export type MutationSetOrderShippingMethodArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  shippingMethodId: Array<Scalars['ID']['input']>;
};

export type MutationSettlePaymentArgs = {
  input: SettlePaymentInput;
};

export type MutationToggleFavoriteArgs = {
  productVariantId: Scalars['ID']['input'];
};

export type MutationTransitionOrderToStateArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
  state: Scalars['String']['input'];
};

export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};

export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput;
};

export type MutationUpdateCustomerEmailAddressArgs = {
  token: Scalars['String']['input'];
};

export type MutationUpdateCustomerPasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type MutationUpdateHelpCenterHelpfulArgs = {
  input: UpdateHelpCenterHelpfulInput;
};

export type MutationUpdateProductReviewArgs = {
  input: UpdateProductReviewInput;
};

export type MutationUpdateTopicHelpfulArgs = {
  input: UpdateTopicHelpfulInput;
};

export type MutationVerifyCustomerAccountArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type MutationVoteOnReviewArgs = {
  id: Scalars['ID']['input'];
  vote: Scalars['Boolean']['input'];
};

export type NativeAuthInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** Returned when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export type NativeAuthStrategyError = ErrorResult & {
  __typename?: 'NativeAuthStrategyError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type NativeAuthenticationResult =
  | CurrentUser
  | InvalidCredentialsError
  | NativeAuthStrategyError
  | NotVerifiedError;

/** Returned when attempting to set a negative OrderLine quantity. */
export type NegativeQuantityError = ErrorResult & {
  __typename?: 'NegativeQuantityError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export type NoActiveOrderError = ErrorResult & {
  __typename?: 'NoActiveOrderError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export type NotVerifiedError = ErrorResult & {
  __typename?: 'NotVerifiedError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Operators for filtering on a list of Number fields */
export type NumberListOperators = {
  inList: Scalars['Float']['input'];
};

/** Operators for filtering on a Int or Float field */
export type NumberOperators = {
  between?: InputMaybe<NumberRange>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
};

export type NumberRange = {
  end: Scalars['Float']['input'];
  start: Scalars['Float']['input'];
};

export type Order = Node & {
  __typename?: 'Order';
  /** An order is active as long as the payment process has not been completed */
  active: Scalars['Boolean']['output'];
  /** 当前激活订单可用的优惠券列表 */
  availableCoupons: Array<CampaignCoupon>;
  billingAddress?: Maybe<OrderAddress>;
  /** A unique code for the Order */
  code: Scalars['String']['output'];
  /** An array of all coupon codes applied to the Order */
  couponCodes: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<OrderCustomFields>;
  customer?: Maybe<Customer>;
  discounts: Array<Discount>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  history: HistoryEntryList;
  id: Scalars['ID']['output'];
  lines: Array<OrderLine>;
  /**
   * The date & time that the Order was placed, i.e. the Customer
   * completed the checkout and the Order is no longer "active"
   */
  orderPlacedAt?: Maybe<Scalars['DateTime']['output']>;
  payments?: Maybe<Array<Payment>>;
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  promotions: Array<Promotion>;
  shipping: Scalars['Money']['output'];
  shippingAddress?: Maybe<OrderAddress>;
  shippingLines: Array<ShippingLine>;
  shippingWithTax: Scalars['Money']['output'];
  state: Scalars['String']['output'];
  /**
   * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
   * discounts which have been prorated (proportionally distributed) amongst the items of each OrderLine.
   * To get a total of all OrderLines which does not account for prorated discounts, use the
   * sum of `OrderLine.discountedLinePrice` values.
   */
  subTotal: Scalars['Money']['output'];
  /** Same as subTotal, but inclusive of tax */
  subTotalWithTax: Scalars['Money']['output'];
  /**
   * Surcharges are arbitrary modifications to the Order total which are neither
   * ProductVariants nor discounts resulting from applied Promotions. For example,
   * one-off discounts based on customer interaction, or surcharges based on payment
   * methods.
   */
  surcharges: Array<Surcharge>;
  /** A summary of the taxes being applied to this Order */
  taxSummary: Array<OrderTaxSummary>;
  /** Equal to subTotal plus shipping */
  total: Scalars['Money']['output'];
  totalQuantity: Scalars['Int']['output'];
  /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
  totalWithTax: Scalars['Money']['output'];
  type: OrderType;
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderHistoryArgs = {
  options?: InputMaybe<HistoryEntryListOptions>;
};

export type OrderAddress = {
  __typename?: 'OrderAddress';
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  customFields?: Maybe<Scalars['JSON']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  streetLine1?: Maybe<Scalars['String']['output']>;
  streetLine2?: Maybe<Scalars['String']['output']>;
};

export type OrderCustomFields = {
  __typename?: 'OrderCustomFields';
  languageCode?: Maybe<Scalars['String']['output']>;
};

export type OrderFilterParameter = {
  active?: InputMaybe<BooleanOperators>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  orderPlacedAt?: InputMaybe<DateOperators>;
  shipping?: InputMaybe<NumberOperators>;
  shippingWithTax?: InputMaybe<NumberOperators>;
  state?: InputMaybe<StringOperators>;
  subTotal?: InputMaybe<NumberOperators>;
  subTotalWithTax?: InputMaybe<NumberOperators>;
  total?: InputMaybe<NumberOperators>;
  totalQuantity?: InputMaybe<NumberOperators>;
  totalWithTax?: InputMaybe<NumberOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

/** Returned when the maximum order size limit has been reached. */
export type OrderLimitError = ErrorResult & {
  __typename?: 'OrderLimitError';
  errorCode: ErrorCode;
  maxItems: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  createdAt: Scalars['DateTime']['output'];
  /** 扩展的订单礼服定制流程配置流程, 可能为null */
  customConfigs?: Maybe<OrderLineDressCustomConfigs>;
  customFields?: Maybe<OrderLineCustomFields>;
  /** The price of the line including discounts, excluding tax */
  discountedLinePrice: Scalars['Money']['output'];
  /** The price of the line including discounts and tax */
  discountedLinePriceWithTax: Scalars['Money']['output'];
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Money']['output'];
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Money']['output'];
  discounts: Array<Discount>;
  featuredAsset?: Maybe<Asset>;
  fulfillmentLines?: Maybe<Array<FulfillmentLine>>;
  id: Scalars['ID']['output'];
  /** The total price of the line excluding tax and discounts. */
  linePrice: Scalars['Money']['output'];
  /** The total price of the line including tax but excluding discounts. */
  linePriceWithTax: Scalars['Money']['output'];
  /** The total tax on this line */
  lineTax: Scalars['Money']['output'];
  order: Order;
  /** The quantity at the time the Order was placed */
  orderPlacedQuantity: Scalars['Int']['output'];
  productVariant: ProductVariant;
  /**
   * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
   * and refund calculations.
   */
  proratedLinePrice: Scalars['Money']['output'];
  /** The proratedLinePrice including tax */
  proratedLinePriceWithTax: Scalars['Money']['output'];
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Money']['output'];
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Money']['output'];
  /** The quantity of items purchased */
  quantity: Scalars['Int']['output'];
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float']['output'];
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Money']['output'];
  /** Non-zero if the unitPrice has changed since it was initially added to Order */
  unitPriceChangeSinceAdded: Scalars['Money']['output'];
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Money']['output'];
  /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
  unitPriceWithTaxChangeSinceAdded: Scalars['Money']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderLineCustomConfigCtx = {
  __typename?: 'OrderLineCustomConfigCtx';
  /** 产品来源的那一个分类或者专题页的集合ID */
  collectionId?: Maybe<Scalars['ID']['output']>;
  /** 设备信息 */
  deviceInfo?: Maybe<Scalars['JSON']['output']>;
  /** 定制产品ID */
  productId: Scalars['ID']['output'];
  /** 定制产品变量ID */
  productVariantId: Scalars['ID']['output'];
  /** 当前步骤 */
  step?: Maybe<DressCustomStepGroups>;
};

/** T1:用户选择的尺寸配置 */
export type OrderLineCustomConfigSize = {
  __typename?: 'OrderLineCustomConfigSize';
  /** 当前STEP选项下的选中的ID列表 */
  customOptionInputs: Array<UserConfigdCustomOptionOfStep>;
  /** 当前STEP存储的用户选择的选项列表数据(价格override之后), 显示在购物车 */
  customUserConfigItems: Array<OrderLineUserConfigdCustomItem>;
  /** 当前步骤 */
  step?: Maybe<DressCustomStepGroups>;
  /** T1用户输入的自定义尺寸数据内容 */
  t1UserSizeInputs?: Maybe<T1UserSizeInputs>;
};

/** T2+常规step的配置 */
export type OrderLineCustomConfigStep = {
  __typename?: 'OrderLineCustomConfigStep';
  /** 当前STEP选项下的选中的ID列表 */
  customOptionInputs: Array<UserConfigdCustomOptionOfStep>;
  /** 当前STEP存储的用户选择的选项列表数据(价格override之后), 显示在购物车 */
  customUserConfigItems: Array<OrderLineUserConfigdCustomItem>;
  /** 当前步骤 */
  step?: Maybe<DressCustomStepGroups>;
};

export type OrderLineCustomFields = {
  __typename?: 'OrderLineCustomFields';
  customConfigs?: Maybe<Scalars['String']['output']>;
};

export type OrderLineCustomFieldsInput = {
  customConfigs?: InputMaybe<Scalars['String']['input']>;
};

/** 定制流程保存到OrderLine下的数据 */
export type OrderLineDressCustomConfigs = {
  __typename?: 'OrderLineDressCustomConfigs';
  /** 商品上下文数据配置 */
  T0?: Maybe<OrderLineCustomConfigCtx>;
  /** 用户选择的尺寸配置 */
  T1?: Maybe<OrderLineCustomConfigSize>;
  /** 用户选择的加项配置 */
  T2?: Maybe<OrderLineCustomConfigStep>;
  /** 当前dress定制是否已经是配置完成状态. */
  customStepsDone?: Maybe<Scalars['Boolean']['output']>;
  /** 当前orderLine 定制部分的单价 */
  customUnitPrice?: Maybe<Scalars['Int']['output']>;
  /** 动态计算出来定制一件礼服的成本 */
  runtimeCostPrice?: Maybe<Array<DressCostPriceDetails>>;
};

export type OrderLineUserConfigdCustomItem = {
  __typename?: 'OrderLineUserConfigdCustomItem';
  /** 当前显示原价 */
  adjustOldPrice?: Maybe<Scalars['Int']['output']>;
  /** 当前价格 */
  adjustPrice: Scalars['Int']['output'];
  /** 选项 ID */
  customOptionId: Scalars['ID']['output'];
  /** 当前选项依赖的父选项 ID,方便前端进行tree层次处理 */
  customOptionParentId?: Maybe<Scalars['ID']['output']>;
  i18nName: Scalars['String']['output'];
  /** 功能介绍 */
  introduction?: Maybe<Array<Scalars['String']['output']>>;
  /** 是否有功能预览,通常图片展示 */
  preview?: Maybe<CustomOptionPreview>;
  /** 短描述 */
  shortDesc?: Maybe<Scalars['String']['output']>;
};

export type OrderList = PaginatedList & {
  __typename?: 'OrderList';
  items: Array<Order>;
  totalItems: Scalars['Int']['output'];
};

export type OrderListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<OrderFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<OrderSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export type OrderModificationError = ErrorResult & {
  __typename?: 'OrderModificationError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to add a Payment to an Order that is not in the `ArrangingPayment` state. */
export type OrderPaymentStateError = ErrorResult & {
  __typename?: 'OrderPaymentStateError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type OrderSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  languageCode?: InputMaybe<SortOrder>;
  orderPlacedAt?: InputMaybe<SortOrder>;
  shipping?: InputMaybe<SortOrder>;
  shippingWithTax?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  subTotal?: InputMaybe<SortOrder>;
  subTotalWithTax?: InputMaybe<SortOrder>;
  total?: InputMaybe<SortOrder>;
  totalQuantity?: InputMaybe<SortOrder>;
  totalWithTax?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

/** Returned if there is an error in transitioning the Order state */
export type OrderStateTransitionError = ErrorResult & {
  __typename?: 'OrderStateTransitionError';
  errorCode: ErrorCode;
  fromState: Scalars['String']['output'];
  message: Scalars['String']['output'];
  toState: Scalars['String']['output'];
  transitionError: Scalars['String']['output'];
};

/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export type OrderTaxSummary = {
  __typename?: 'OrderTaxSummary';
  /** A description of this tax */
  description: Scalars['String']['output'];
  /** The total net price of OrderLines to which this taxRate applies */
  taxBase: Scalars['Money']['output'];
  /** The taxRate as a percentage */
  taxRate: Scalars['Float']['output'];
  /** The total tax being applied to the Order at this taxRate */
  taxTotal: Scalars['Money']['output'];
};

export type OrderTokenActiveOrderInput = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderType {
  Aggregate = 'Aggregate',
  Regular = 'Regular',
  Seller = 'Seller',
}

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int']['output'];
};

/** Returned when attempting to verify a customer account with a password, when a password has already been set. */
export type PasswordAlreadySetError = ErrorResult & {
  __typename?: 'PasswordAlreadySetError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type PasswordResetTokenExpiredError = ErrorResult & {
  __typename?: 'PasswordResetTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export type PasswordResetTokenInvalidError = ErrorResult & {
  __typename?: 'PasswordResetTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to register or verify a customer account where the given password fails password validation. */
export type PasswordValidationError = ErrorResult & {
  __typename?: 'PasswordValidationError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
  validationErrorMessage: Scalars['String']['output'];
};

export type Payment = Node & {
  __typename?: 'Payment';
  amount: Scalars['Money']['output'];
  createdAt: Scalars['DateTime']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  method: Scalars['String']['output'];
  refunds: Array<Refund>;
  state: Scalars['String']['output'];
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

/** Returned when a Payment is declined by the payment provider. */
export type PaymentDeclinedError = ErrorResult & {
  __typename?: 'PaymentDeclinedError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
  paymentErrorMessage: Scalars['String']['output'];
};

/** Returned when a Payment fails due to an error. */
export type PaymentFailedError = ErrorResult & {
  __typename?: 'PaymentFailedError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
  paymentErrorMessage: Scalars['String']['output'];
};

/** Passed as input to the `addPaymentToOrder` mutation. */
export type PaymentInput = {
  /**
   * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
   * as the "metadata" argument. For example, it could contain an ID for the payment and other
   * data generated by the payment provider.
   */
  metadata: Scalars['JSON']['input'];
  /** This field should correspond to the `code` property of a PaymentMethod. */
  method: Scalars['String']['input'];
};

export type PaymentMethod = Node & {
  __typename?: 'PaymentMethod';
  checker?: Maybe<ConfigurableOperation>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<PaymentMethodCustomFields>;
  description: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  handler: ConfigurableOperation;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  translations: Array<PaymentMethodTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PaymentMethodCustomFields = {
  __typename?: 'PaymentMethodCustomFields';
  paypalClientConfig?: Maybe<Scalars['String']['output']>;
};

export type PaymentMethodPaypalClientConfig = {
  __typename?: 'PaymentMethodPaypalClientConfig';
  clientId: Scalars['String']['output'];
};

export type PaymentMethodQuote = {
  __typename?: 'PaymentMethodQuote';
  code: Scalars['String']['output'];
  customFields?: Maybe<PaymentMethodCustomFields>;
  description: Scalars['String']['output'];
  eligibilityMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEligible: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** 扩展一个字段配置为paypal客户端支付SDK集成 */
  paypalClientConfig?: Maybe<PaymentMethodPaypalClientConfig>;
};

export type PaymentMethodTranslation = {
  __typename?: 'PaymentMethodTranslation';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * ## Understanding Permission.Owner
 *
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 *
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 *
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 *
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 *
 *
 * @docsCategory common
 */
export enum Permission {
  /** Allow this user to enable sitemap generation */
  AllowSitemapPermission = 'AllowSitemapPermission',
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to create Asset */
  CreateAsset = 'CreateAsset',
  /** Grants permission to create Banner */
  CreateBanner = 'CreateBanner',
  /** Grants permission to create Campaign */
  CreateCampaign = 'CreateCampaign',
  /** Grants permission to create Products, Facets, Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to create Channel */
  CreateChannel = 'CreateChannel',
  /** Grants permission to create Collection */
  CreateCollection = 'CreateCollection',
  /** Grants permission to create Country */
  CreateCountry = 'CreateCountry',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to create CustomerGroup */
  CreateCustomerGroup = 'CreateCustomerGroup',
  /** Grants permission to create DressPluginConfig */
  CreateDressPluginConfig = 'CreateDressPluginConfig',
  /** Grants permission to create Facet */
  CreateFacet = 'CreateFacet',
  /** Grants permission to create HelpCenter */
  CreateHelpCenter = 'CreateHelpCenter',
  /** Grants permission to create Mailer */
  CreateMailer = 'CreateMailer',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to create PaymentMethod */
  CreatePaymentMethod = 'CreatePaymentMethod',
  /** Grants permission to create Product */
  CreateProduct = 'CreateProduct',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to create ReviewsPermission */
  CreateReviewsPermission = 'CreateReviewsPermission',
  /** Grants permission to create Seller */
  CreateSeller = 'CreateSeller',
  /** Grants permission to create Setting */
  CreateSetting = 'CreateSetting',
  /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to create ShippingMethod */
  CreateShippingMethod = 'CreateShippingMethod',
  /** Grants permission to create StockLocation */
  CreateStockLocation = 'CreateStockLocation',
  /** Grants permission to create Subscription */
  CreateSubscription = 'CreateSubscription',
  /** Grants permission to create System */
  CreateSystem = 'CreateSystem',
  /** Grants permission to create Tag */
  CreateTag = 'CreateTag',
  /** Grants permission to create TaxCategory */
  CreateTaxCategory = 'CreateTaxCategory',
  /** Grants permission to create TaxRate */
  CreateTaxRate = 'CreateTaxRate',
  /** Grants permission to create Topic */
  CreateTopic = 'CreateTopic',
  /** Grants permission to create Zone */
  CreateZone = 'CreateZone',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** Grants permission to delete Banner */
  DeleteBanner = 'DeleteBanner',
  /** Grants permission to delete Campaign */
  DeleteCampaign = 'DeleteCampaign',
  /** Grants permission to delete Products, Facets, Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to delete Channel */
  DeleteChannel = 'DeleteChannel',
  /** Grants permission to delete Collection */
  DeleteCollection = 'DeleteCollection',
  /** Grants permission to delete Country */
  DeleteCountry = 'DeleteCountry',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to delete CustomerGroup */
  DeleteCustomerGroup = 'DeleteCustomerGroup',
  /** Grants permission to delete DressPluginConfig */
  DeleteDressPluginConfig = 'DeleteDressPluginConfig',
  /** Grants permission to delete Facet */
  DeleteFacet = 'DeleteFacet',
  /** Grants permission to delete HelpCenter */
  DeleteHelpCenter = 'DeleteHelpCenter',
  /** Grants permission to delete Mailer */
  DeleteMailer = 'DeleteMailer',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to delete PaymentMethod */
  DeletePaymentMethod = 'DeletePaymentMethod',
  /** Grants permission to delete Product */
  DeleteProduct = 'DeleteProduct',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to delete ReviewsPermission */
  DeleteReviewsPermission = 'DeleteReviewsPermission',
  /** Grants permission to delete Seller */
  DeleteSeller = 'DeleteSeller',
  /** Grants permission to delete Setting */
  DeleteSetting = 'DeleteSetting',
  /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** Grants permission to delete ShippingMethod */
  DeleteShippingMethod = 'DeleteShippingMethod',
  /** Grants permission to delete StockLocation */
  DeleteStockLocation = 'DeleteStockLocation',
  /** Grants permission to delete Subscription */
  DeleteSubscription = 'DeleteSubscription',
  /** Grants permission to delete System */
  DeleteSystem = 'DeleteSystem',
  /** Grants permission to delete Tag */
  DeleteTag = 'DeleteTag',
  /** Grants permission to delete TaxCategory */
  DeleteTaxCategory = 'DeleteTaxCategory',
  /** Grants permission to delete TaxRate */
  DeleteTaxRate = 'DeleteTaxRate',
  /** Grants permission to delete Topic */
  DeleteTopic = 'DeleteTopic',
  /** Grants permission to delete Zone */
  DeleteZone = 'DeleteZone',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Grants permission to read Asset */
  ReadAsset = 'ReadAsset',
  /** Grants permission to read Banner */
  ReadBanner = 'ReadBanner',
  /** Grants permission to read Campaign */
  ReadCampaign = 'ReadCampaign',
  /** Grants permission to read Products, Facets, Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to read Channel */
  ReadChannel = 'ReadChannel',
  /** Grants permission to read Collection */
  ReadCollection = 'ReadCollection',
  /** Grants permission to read Country */
  ReadCountry = 'ReadCountry',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to read CustomerGroup */
  ReadCustomerGroup = 'ReadCustomerGroup',
  /** Grants permission to read DressPluginConfig */
  ReadDressPluginConfig = 'ReadDressPluginConfig',
  /** Grants permission to read Facet */
  ReadFacet = 'ReadFacet',
  /** Grants permission to read HelpCenter */
  ReadHelpCenter = 'ReadHelpCenter',
  /** Grants permission to read Mailer */
  ReadMailer = 'ReadMailer',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to read PaymentMethod */
  ReadPaymentMethod = 'ReadPaymentMethod',
  /** Grants permission to read Product */
  ReadProduct = 'ReadProduct',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Grants permission to read ReviewsPermission */
  ReadReviewsPermission = 'ReadReviewsPermission',
  /** Grants permission to read Seller */
  ReadSeller = 'ReadSeller',
  /** Grants permission to read Setting */
  ReadSetting = 'ReadSetting',
  /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to read ShippingMethod */
  ReadShippingMethod = 'ReadShippingMethod',
  /** Grants permission to read StockLocation */
  ReadStockLocation = 'ReadStockLocation',
  /** Grants permission to read Subscription */
  ReadSubscription = 'ReadSubscription',
  /** Grants permission to read System */
  ReadSystem = 'ReadSystem',
  /** Grants permission to read Tag */
  ReadTag = 'ReadTag',
  /** Grants permission to read TaxCategory */
  ReadTaxCategory = 'ReadTaxCategory',
  /** Grants permission to read TaxRate */
  ReadTaxRate = 'ReadTaxRate',
  /** Grants permission to read Topic */
  ReadTopic = 'ReadTopic',
  /** Grants permission to read Zone */
  ReadZone = 'ReadZone',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to update Asset */
  UpdateAsset = 'UpdateAsset',
  /** Grants permission to update Banner */
  UpdateBanner = 'UpdateBanner',
  /** Grants permission to update Campaign */
  UpdateCampaign = 'UpdateCampaign',
  /** Grants permission to update Products, Facets, Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to update Channel */
  UpdateChannel = 'UpdateChannel',
  /** Grants permission to update Collection */
  UpdateCollection = 'UpdateCollection',
  /** Grants permission to update Country */
  UpdateCountry = 'UpdateCountry',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to update CustomerGroup */
  UpdateCustomerGroup = 'UpdateCustomerGroup',
  /** Grants permission to update DressPluginConfig */
  UpdateDressPluginConfig = 'UpdateDressPluginConfig',
  /** Grants permission to update Facet */
  UpdateFacet = 'UpdateFacet',
  /** Grants permission to update GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** Grants permission to update HelpCenter */
  UpdateHelpCenter = 'UpdateHelpCenter',
  /** Grants permission to update Mailer */
  UpdateMailer = 'UpdateMailer',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to update PaymentMethod */
  UpdatePaymentMethod = 'UpdatePaymentMethod',
  /** Grants permission to update Product */
  UpdateProduct = 'UpdateProduct',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to update ReviewsPermission */
  UpdateReviewsPermission = 'UpdateReviewsPermission',
  /** Grants permission to update Seller */
  UpdateSeller = 'UpdateSeller',
  /** Grants permission to update Setting */
  UpdateSetting = 'UpdateSetting',
  /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to update ShippingMethod */
  UpdateShippingMethod = 'UpdateShippingMethod',
  /** Grants permission to update StockLocation */
  UpdateStockLocation = 'UpdateStockLocation',
  /** Grants permission to update Subscription */
  UpdateSubscription = 'UpdateSubscription',
  /** Grants permission to update System */
  UpdateSystem = 'UpdateSystem',
  /** Grants permission to update Tag */
  UpdateTag = 'UpdateTag',
  /** Grants permission to update TaxCategory */
  UpdateTaxCategory = 'UpdateTaxCategory',
  /** Grants permission to update TaxRate */
  UpdateTaxRate = 'UpdateTaxRate',
  /** Grants permission to update Topic */
  UpdateTopic = 'UpdateTopic',
  /** Grants permission to update Zone */
  UpdateZone = 'UpdateZone',
}

export type PhoneAddInput = {
  phone: Scalars['String']['input'];
};

/** The price range where the result has more than one price */
export type PriceRange = {
  __typename?: 'PriceRange';
  max: Scalars['Money']['output'];
  min: Scalars['Money']['output'];
};

export type Product = Node & {
  __typename?: 'Product';
  assets: Array<Asset>;
  collections: Array<Collection>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<ProductCustomFields>;
  description: Scalars['String']['output'];
  facetValues: Array<FacetValue>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  optionGroups: Array<ProductOptionGroup>;
  reviewAvg: Scalars['Float']['output'];
  reviews: ProductReviewList;
  reviewsHistogram: Array<ProductReviewHistogramItem>;
  slug: Scalars['String']['output'];
  translations: Array<ProductTranslation>;
  updatedAt: Scalars['DateTime']['output'];
  /** Returns a paginated, sortable, filterable list of ProductVariants */
  variantList: ProductVariantList;
  /** Returns all ProductVariants */
  variants: Array<ProductVariant>;
};

export type ProductReviewsArgs = {
  options?: InputMaybe<ProductReviewListOptions>;
};

export type ProductVariantListArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type ProductCustomFields = {
  __typename?: 'ProductCustomFields';
  isFinishProduct?: Maybe<Scalars['Boolean']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  reviewCount?: Maybe<Scalars['Int']['output']>;
  reviewRating?: Maybe<Scalars['Float']['output']>;
  showMoreCustomOptions?: Maybe<Scalars['Boolean']['output']>;
  sizeCustomizedLevel?: Maybe<Scalars['String']['output']>;
};

export type ProductFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  isFinishProduct?: InputMaybe<BooleanOperators>;
  languageCode?: InputMaybe<StringOperators>;
  metaDescription?: InputMaybe<StringOperators>;
  metaTitle?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  reviewAvg?: InputMaybe<NumberOperators>;
  reviewCount?: InputMaybe<NumberOperators>;
  reviewRating?: InputMaybe<NumberOperators>;
  showMoreCustomOptions?: InputMaybe<BooleanOperators>;
  sizeCustomizedLevel?: InputMaybe<StringOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int']['output'];
};

export type ProductListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductOption = Node & {
  __typename?: 'ProductOption';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  group: ProductOptionGroup;
  groupId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  translations: Array<ProductOptionTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductOptionGroup = Node & {
  __typename?: 'ProductOptionGroup';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  options: Array<ProductOption>;
  translations: Array<ProductOptionGroupTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductOptionGroupTranslation = {
  __typename?: 'ProductOptionGroupTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductOptionTranslation = {
  __typename?: 'ProductOptionTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductReview = Node & {
  __typename?: 'ProductReview';
  adminCreatedCustomerName?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<Customer>;
  customerId?: Maybe<Scalars['ID']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  customerNameIsPublic: Scalars['Boolean']['output'];
  downVotes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  /** mata title 180 characters */
  metaDescription?: Maybe<Scalars['String']['output']>;
  /** mata title 90 characters */
  metaTitle?: Maybe<Scalars['String']['output']>;
  /** current review of related orderLine */
  orderLineId?: Maybe<Scalars['ID']['output']>;
  product?: Maybe<Product>;
  productId: Scalars['ID']['output'];
  productVariant?: Maybe<ProductVariant>;
  productVariantId: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  /** extends new property relatedReviews */
  relatedReviews: Array<ProductReview>;
  reply?: Maybe<Scalars['String']['output']>;
  replyCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  reviewAsset?: Maybe<Asset>;
  showAsTestimonial?: Maybe<Scalars['Boolean']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  suggestions?: Maybe<Scalars['String']['output']>;
  /** If system auto created */
  systemAutoCreated: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
  upVotes: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductReviewFilterParameter = {
  adminCreatedCustomerName?: InputMaybe<StringOperators>;
  content?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  customerId?: InputMaybe<IdOperators>;
  customerName?: InputMaybe<StringOperators>;
  customerNameIsPublic?: InputMaybe<BooleanOperators>;
  downVotes?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  metaDescription?: InputMaybe<StringOperators>;
  metaTitle?: InputMaybe<StringOperators>;
  orderLineId?: InputMaybe<IdOperators>;
  productId?: InputMaybe<IdOperators>;
  productVariantId?: InputMaybe<IdOperators>;
  rating?: InputMaybe<NumberOperators>;
  reply?: InputMaybe<StringOperators>;
  replyCreatedAt?: InputMaybe<DateOperators>;
  showAsTestimonial?: InputMaybe<BooleanOperators>;
  slug?: InputMaybe<StringOperators>;
  state?: InputMaybe<StringOperators>;
  suggestions?: InputMaybe<StringOperators>;
  systemAutoCreated?: InputMaybe<BooleanOperators>;
  title?: InputMaybe<StringOperators>;
  upVotes?: InputMaybe<NumberOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductReviewHistogramItem = {
  __typename?: 'ProductReviewHistogramItem';
  bin: Scalars['Int']['output'];
  frequency: Scalars['Int']['output'];
};

export type ProductReviewList = PaginatedList & {
  __typename?: 'ProductReviewList';
  items: Array<ProductReview>;
  totalItems: Scalars['Int']['output'];
};

export type ProductReviewListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductReviewFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductReviewSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductReviewSortParameter = {
  adminCreatedCustomerName?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  customerId?: InputMaybe<SortOrder>;
  customerName?: InputMaybe<SortOrder>;
  downVotes?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  metaDescription?: InputMaybe<SortOrder>;
  metaTitle?: InputMaybe<SortOrder>;
  orderLineId?: InputMaybe<SortOrder>;
  productId?: InputMaybe<SortOrder>;
  productVariantId?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  reply?: InputMaybe<SortOrder>;
  replyCreatedAt?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  suggestions?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  upVotes?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProductSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isFinishProduct?: InputMaybe<SortOrder>;
  metaDescription?: InputMaybe<SortOrder>;
  metaTitle?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  reviewAvg?: InputMaybe<SortOrder>;
  reviewCount?: InputMaybe<SortOrder>;
  reviewRating?: InputMaybe<SortOrder>;
  showMoreCustomOptions?: InputMaybe<SortOrder>;
  sizeCustomizedLevel?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProductTranslation = {
  __typename?: 'ProductTranslation';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<ProductTranslationCustomFields>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductTranslationCustomFields = {
  __typename?: 'ProductTranslationCustomFields';
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
};

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  assets: Array<Asset>;
  /**
   * 1. 当前配置了直降活动扩展字段, 展示显示辅助, 并不参与实际价格折扣, 实际价格通过优惠券实现进行直降
   * 2. 依赖@semic/plugin-campaign自定义段campaignConfigData
   */
  campaignView?: Maybe<ProductVariantCampaignView>;
  /** Indicates product page if user can create a review, return reviewOrderLine/undefined */
  canReview?: Maybe<ReviewOrderLine>;
  createdAt: Scalars['DateTime']['output'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<ProductVariantCustomFields>;
  facetValues: Array<FacetValue>;
  /** Use this in your Storefront to show in product page if user favorite */
  favorite?: Maybe<Favorite>;
  /** Total favorite count of variant item */
  favoriteCount: Scalars['Int']['output'];
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  options: Array<ProductOption>;
  price: Scalars['Money']['output'];
  priceWithTax: Scalars['Money']['output'];
  product: Product;
  productId: Scalars['ID']['output'];
  sku: Scalars['String']['output'];
  stockLevel: Scalars['String']['output'];
  taxCategory: TaxCategory;
  taxRateApplied: TaxRate;
  translations: Array<ProductVariantTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

/** 依赖@semic/plugin-campaign自定义段campaignConfigData */
export type ProductVariantCampaignView = {
  __typename?: 'ProductVariantCampaignView';
  /** 促销时间 */
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  /** 促销价格 */
  price?: Maybe<Scalars['String']['output']>;
  /** 促销文案 */
  promotionText?: Maybe<Scalars['String']['output']>;
};

export type ProductVariantCustomFields = {
  __typename?: 'ProductVariantCustomFields';
  liveShowUrls?: Maybe<Scalars['String']['output']>;
  oldPrice?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  videoUrls?: Maybe<Scalars['String']['output']>;
};

export type ProductVariantFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  favoriteCount?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  liveShowUrls?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  oldPrice?: InputMaybe<NumberOperators>;
  position?: InputMaybe<NumberOperators>;
  price?: InputMaybe<NumberOperators>;
  priceWithTax?: InputMaybe<NumberOperators>;
  productId?: InputMaybe<IdOperators>;
  sku?: InputMaybe<StringOperators>;
  stockLevel?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
  videoUrls?: InputMaybe<StringOperators>;
};

export type ProductVariantList = PaginatedList & {
  __typename?: 'ProductVariantList';
  items: Array<ProductVariant>;
  totalItems: Scalars['Int']['output'];
};

export type ProductVariantListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductVariantFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductVariantSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductVariantSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  favoriteCount?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  liveShowUrls?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  oldPrice?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
  priceWithTax?: InputMaybe<SortOrder>;
  productId?: InputMaybe<SortOrder>;
  sku?: InputMaybe<SortOrder>;
  stockLevel?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  videoUrls?: InputMaybe<SortOrder>;
};

export type ProductVariantTranslation = {
  __typename?: 'ProductVariantTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Promotion = Node & {
  __typename?: 'Promotion';
  actions: Array<ConfigurableOperation>;
  conditions: Array<ConfigurableOperation>;
  couponCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  perCustomerUsageLimit?: Maybe<Scalars['Int']['output']>;
  startsAt?: Maybe<Scalars['DateTime']['output']>;
  translations: Array<PromotionTranslation>;
  updatedAt: Scalars['DateTime']['output'];
  usageLimit?: Maybe<Scalars['Int']['output']>;
};

export type PromotionList = PaginatedList & {
  __typename?: 'PromotionList';
  items: Array<Promotion>;
  totalItems: Scalars['Int']['output'];
};

export type PromotionTranslation = {
  __typename?: 'PromotionTranslation';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Province = Node &
  Region & {
    __typename?: 'Province';
    code: Scalars['String']['output'];
    createdAt: Scalars['DateTime']['output'];
    customFields?: Maybe<ProvinceCustomFields>;
    enabled: Scalars['Boolean']['output'];
    id: Scalars['ID']['output'];
    languageCode: LanguageCode;
    name: Scalars['String']['output'];
    parent?: Maybe<Region>;
    parentId?: Maybe<Scalars['ID']['output']>;
    translations: Array<RegionTranslation>;
    type: Scalars['String']['output'];
    updatedAt: Scalars['DateTime']['output'];
  };

export type ProvinceCustomFields = {
  __typename?: 'ProvinceCustomFields';
  displayOrder?: Maybe<Scalars['Int']['output']>;
};

export type ProvinceList = PaginatedList & {
  __typename?: 'ProvinceList';
  items: Array<Province>;
  totalItems: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** The active Channel */
  activeChannel: Channel;
  /** The active Customer */
  activeCustomer?: Maybe<Customer>;
  /**
   * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
   * state of `PaymentAuthorized` or `PaymentSettled`, then that Order is no longer considered "active" and this
   * query will once again return `null`.
   */
  activeOrder?: Maybe<Order>;
  /** An array of supported Countries */
  availableCountries: Array<Country>;
  /** A list of available order lines to user review */
  availableOrderLinesToReview: ReviewOrderLineList;
  /** Query detail of banner entity */
  banner?: Maybe<Banner>;
  /** Query all banner list */
  banners: BannerList;
  /** customer can review this product variant, return reviewOrderLine/undefined */
  canReviewProductVariant?: Maybe<ReviewOrderLine>;
  /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  collection?: Maybe<Collection>;
  /** A list of Collections available to the shop */
  collections: CollectionList;
  /** 根据当前step,查询下一个流程步骤的可用定制选项配置列表 */
  customOptionsOfStep: DressCustomOptionsOfStepQueryResult;
  /** Returns a list of payment methods and their eligibility based on the current active Order */
  eligiblePaymentMethods: Array<PaymentMethodQuote>;
  /** Returns a list of eligible shipping methods based on the current active Order */
  eligibleShippingMethods: Array<ShippingMethodQuote>;
  /** Returns a Facet by its id */
  facet?: Maybe<Facet>;
  /** A list of Facets available to the shop */
  facets: FacetList;
  favorite?: Maybe<Favorite>;
  favorites: FavoriteList;
  /** 根据活动标识获取特定的优惠信息 */
  getCampaignInfo?: Maybe<Campaign>;
  /** Query detail of help center entity */
  helpCenter?: Maybe<HelpCenter>;
  /** Query detail of help center collection entity */
  helpCenterCollection?: Maybe<HelpCenterCollection>;
  /** Query all help center collections */
  helpCenterCollections: HelpCenterCollectionList;
  /** Query all help center hot searches */
  helpCenterHotSearches: HelpCenterHotSearchList;
  /** Query detail of help center tag entity */
  helpCenterTag?: Maybe<HelpCenterTag>;
  /** Query all help center tags */
  helpCenterTags: HelpCenterTagList;
  /** Query all help centers */
  helpCenters: HelpCenterList;
  /** Help summarize */
  helpSummarize?: Maybe<HelpSummarize>;
  /** Query customer review order lines information, list order lines review information (if can review, editing, creating) */
  invitedCustomerReviewOrderLines?: Maybe<CustomerReviewOrderLines>;
  /** 获取定义的系统支持的尺寸table数据 */
  listSizeChartData: Array<DressSizeConfigItem>;
  /** 查询当前尺寸的配置表 */
  listSizeConfigs: Array<DressSizeConfigItem>;
  /** Returns information about the current authenticated User */
  me?: Maybe<CurrentUser>;
  /** query customer product review */
  myProductReview?: Maybe<ProductReview>;
  /** query customer all commented product review records */
  myProductReviews: ProductReviewList;
  /** Returns the possible next states that the activeOrder can transition to */
  nextOrderStates: Array<Scalars['String']['output']>;
  /**
   * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
   * currently-authenticated User may be queried.
   */
  order?: Maybe<Order>;
  /**
   * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
   * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
   * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
   * general anonymous access to Order data.
   */
  orderByCode?: Maybe<Order>;
  /** Get a Product either by id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  product?: Maybe<Product>;
  /** 查询当前产品配置的可用的steps步骤 */
  productConfiguredProcessSteps: Array<DressCustomStepGroups>;
  /** Get a ProductReview either by id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  productReview?: Maybe<ProductReview>;
  /** query all reviews of this product */
  productReviews: ProductReviewList;
  /** query product reviews witch contains images */
  productWithImageReviews: ProductReviewList;
  /** Get a list of Products */
  products: ProductList;
  /** Get related reviews of specificed product review */
  relatedReviews: Array<ProductReview>;
  /** Search Products based on the criteria set by the `SearchInput` */
  search: SearchResponse;
  /** Query detail of setting entity */
  setting?: Maybe<Setting>;
  /** Query all setting list */
  settings: SettingList;
  /** Get testimonials from reviews */
  testimonialReviews: Array<ProductReview>;
  ticket?: Maybe<Ticket>;
  tickets: TicketList;
  /** Query detail of topic entity */
  topic?: Maybe<Topic>;
  /** Query all topiclinks */
  topicLinks: TopicLinkList;
  /** Query all topics */
  topics: TopicList;
  unionMain: UnionMain;
};

export type QueryActiveOrderArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
};

export type QueryAvailableOrderLinesToReviewArgs = {
  options?: InputMaybe<ReviewOrderLineListOptions>;
};

export type QueryBannerArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

export type QueryBannersArgs = {
  options?: InputMaybe<BannerListOptions>;
};

export type QueryCanReviewProductVariantArgs = {
  orderLineId?: InputMaybe<Scalars['ID']['input']>;
  productVariantId: Scalars['ID']['input'];
};

export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCollectionsArgs = {
  options?: InputMaybe<CollectionListOptions>;
};

export type QueryCustomOptionsOfStepArgs = {
  input: DressUserCustomOptionsOfStepInput;
};

export type QueryEligiblePaymentMethodsArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
};

export type QueryEligibleShippingMethodsArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
};

export type QueryFacetArgs = {
  id: Scalars['ID']['input'];
};

export type QueryFacetsArgs = {
  options?: InputMaybe<FacetListOptions>;
};

export type QueryFavoriteArgs = {
  productVariantId: Scalars['ID']['input'];
};

export type QueryFavoritesArgs = {
  options?: InputMaybe<FavoriteListOptions>;
  productVariantSkuFilter?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCampaignInfoArgs = {
  code: Scalars['String']['input'];
};

export type QueryHelpCenterArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryHelpCenterCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryHelpCenterCollectionsArgs = {
  options?: InputMaybe<HelpCenterCollectionListOptions>;
};

export type QueryHelpCenterHotSearchesArgs = {
  options?: InputMaybe<HelpCenterHotSearchListOptions>;
};

export type QueryHelpCenterTagArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryHelpCenterTagsArgs = {
  options?: InputMaybe<HelpCenterTagListOptions>;
};

export type QueryHelpCentersArgs = {
  collectionIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  options?: InputMaybe<HelpCenterListOptions>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type QueryHelpSummarizeArgs = {
  options?: InputMaybe<HelpSummarizeOptions>;
};

export type QueryInvitedCustomerReviewOrderLinesArgs = {
  encryptedOrderId: Scalars['String']['input'];
};

export type QueryListSizeConfigsArgs = {
  input: ListDressSizeConfigsInput;
};

export type QueryMyProductReviewArgs = {
  id: Scalars['ID']['input'];
};

export type QueryMyProductReviewsArgs = {
  options?: InputMaybe<ProductReviewListOptions>;
};

export type QueryNextOrderStatesArgs = {
  activeOrderInput?: InputMaybe<ActiveOrderInput>;
};

export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};

export type QueryOrderByCodeArgs = {
  code: Scalars['String']['input'];
};

export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryProductConfiguredProcessStepsArgs = {
  T0: T0ProductCtxInput;
};

export type QueryProductReviewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryProductReviewsArgs = {
  options?: InputMaybe<ProductReviewListOptions>;
  productId: Scalars['ID']['input'];
};

export type QueryProductWithImageReviewsArgs = {
  options?: InputMaybe<ProductReviewListOptions>;
  productId: Scalars['ID']['input'];
};

export type QueryProductsArgs = {
  options?: InputMaybe<ProductListOptions>;
};

export type QueryRelatedReviewsArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};

export type QuerySearchArgs = {
  input: SearchInput;
};

export type QuerySettingArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

export type QuerySettingsArgs = {
  options?: InputMaybe<SettingListOptions>;
};

export type QueryTestimonialReviewsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryTicketArgs = {
  ticketId: Scalars['ID']['input'];
};

export type QueryTicketsArgs = {
  options?: InputMaybe<TicketListOptions>;
};

export type QueryTopicArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryTopicLinksArgs = {
  options?: InputMaybe<TopicLinkListOptions>;
};

export type QueryTopicsArgs = {
  options?: InputMaybe<TopicListOptions>;
};

/** DB存储的元数据 */
export type RawSizeDataOption = {
  __typename?: 'RawSizeDataOption';
  key: SizeConfigItemDataOptionKey;
  /** 原始数据配置 */
  value: RawSizeDataOptionValue;
};

export type RawSizeDataOptionValue = {
  __typename?: 'RawSizeDataOptionValue';
  data: Array<Scalars['String']['output']>;
  /** i18n输入框注解 */
  introduction: Scalars['String']['output'];
  /** i18n输入框label */
  label: Scalars['String']['output'];
  /** i18n输入框placeholder */
  placeHolder: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  /** i18n短描述 */
  shortDesc: Scalars['String']['output'];
  showRules: Array<Scalars['JSON']['output']>;
  uiType?: Maybe<CustomSizeDataOptionItemConfigUiType>;
  validateRules: Array<Scalars['JSON']['output']>;
};

export type RefreshCustomerVerificationResult =
  | NativeAuthStrategyError
  | Success;

export type Refund = Node & {
  __typename?: 'Refund';
  adjustment: Scalars['Money']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Scalars['Money']['output'];
  lines: Array<RefundLine>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  paymentId: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  shipping: Scalars['Money']['output'];
  state: Scalars['String']['output'];
  total: Scalars['Money']['output'];
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type RefundLine = {
  __typename?: 'RefundLine';
  orderLine: OrderLine;
  orderLineId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  refund: Refund;
  refundId: Scalars['ID']['output'];
};

export type Region = {
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  parent?: Maybe<Region>;
  parentId?: Maybe<Scalars['ID']['output']>;
  translations: Array<RegionTranslation>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RegionTranslation = {
  __typename?: 'RegionTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RegisterCustomerAccountResult =
  | MissingPasswordError
  | NativeAuthStrategyError
  | PasswordValidationError
  | Success;

export type RegisterCustomerCustomFieldsInput = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  languageCode?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterCustomerInput = {
  customFields?: InputMaybe<RegisterCustomerCustomFieldsInput>;
  emailAddress: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type RelationCustomFieldConfig = CustomField & {
  __typename?: 'RelationCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  entity: Scalars['String']['output'];
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  scalarFields: Array<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type RemoveOrderItemsResult = Order | OrderModificationError;

export type RequestPasswordResetResult = NativeAuthStrategyError | Success;

export type RequestUpdateCustomerEmailAddressResult =
  | EmailAddressConflictError
  | InvalidCredentialsError
  | NativeAuthStrategyError
  | Success;

export type ResetPasswordResult =
  | CurrentUser
  | NativeAuthStrategyError
  | NotVerifiedError
  | PasswordResetTokenExpiredError
  | PasswordResetTokenInvalidError
  | PasswordValidationError;

export type ReviewCropInput = {
  height: Scalars['Float']['input'];
  left: Scalars['Float']['input'];
  rotate: Scalars['Float']['input'];
  top: Scalars['Float']['input'];
  width: Scalars['Float']['input'];
};

export type ReviewOrderLine = Node & {
  __typename?: 'ReviewOrderLine';
  id: Scalars['ID']['output'];
  orderLineId: Scalars['ID']['output'];
  productId: Scalars['ID']['output'];
  productReview?: Maybe<ProductReview>;
  productSlug: Scalars['String']['output'];
  productVariantAsset?: Maybe<Asset>;
  productVariantId: Scalars['ID']['output'];
  productVariantName: Scalars['String']['output'];
  productVariantSku: Scalars['String']['output'];
};

export type ReviewOrderLineFilterParameter = {
  id?: InputMaybe<IdOperators>;
  orderLineId?: InputMaybe<IdOperators>;
  productId?: InputMaybe<IdOperators>;
  productSlug?: InputMaybe<StringOperators>;
  productVariantId?: InputMaybe<IdOperators>;
  productVariantName?: InputMaybe<StringOperators>;
  productVariantSku?: InputMaybe<StringOperators>;
};

export type ReviewOrderLineList = PaginatedList & {
  __typename?: 'ReviewOrderLineList';
  items: Array<ReviewOrderLine>;
  totalItems: Scalars['Int']['output'];
};

export type ReviewOrderLineListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ReviewOrderLineFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ReviewOrderLineSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ReviewOrderLineSortParameter = {
  id?: InputMaybe<SortOrder>;
  orderLineId?: InputMaybe<SortOrder>;
  productId?: InputMaybe<SortOrder>;
  productSlug?: InputMaybe<SortOrder>;
  productVariantId?: InputMaybe<SortOrder>;
  productVariantName?: InputMaybe<SortOrder>;
  productVariantSku?: InputMaybe<SortOrder>;
};

export enum ReviewStateEnum {
  Authorized = 'Authorized',
  Created = 'Created',
  Denied = 'Denied',
  Updated = 'Updated',
}

export type Role = Node & {
  __typename?: 'Role';
  channels: Array<Channel>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  permissions: Array<Permission>;
  updatedAt: Scalars['DateTime']['output'];
};

export type RoleList = PaginatedList & {
  __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int']['output'];
};

export type SaveUserCustomOptionStepInput = {
  /** 当前STEP选项下的选中的ID列表, T1,T2...都存在选项 */
  customOptionInputs: Array<UserOptionInput>;
  /** 订单line */
  orderLineId: Scalars['ID']['input'];
  /** 当前的数量 */
  quantity: Scalars['Int']['input'];
  /** 当前步骤 */
  step: DressCustomStepGroups;
  /** 特殊: T0进入流程用户上下文, 来源某一个分类等上下文信息, DressCustomStepGroups */
  t0ProductCtxInput?: InputMaybe<T0ProductCtxInput>;
  /** 特殊: T1用户选择的尺寸输入, 标准尺寸, 定制尺寸 */
  t1UserSizeInput?: InputMaybe<UserSizeInput>;
};

export type SearchInput = {
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  collectionSlug?: InputMaybe<Scalars['String']['input']>;
  facetValueFilters?: InputMaybe<Array<FacetValueFilterInput>>;
  /** @deprecated Use `facetValueFilters` instead */
  facetValueIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** @deprecated Use `facetValueFilters` instead */
  facetValueOperator?: InputMaybe<LogicalOperator>;
  groupByProduct?: InputMaybe<Scalars['Boolean']['input']>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SearchResultSortParameter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  term?: InputMaybe<Scalars['String']['input']>;
};

export type SearchReindexResponse = {
  __typename?: 'SearchReindexResponse';
  success: Scalars['Boolean']['output'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  collections: Array<CollectionResult>;
  facetValues: Array<FacetValueResult>;
  items: Array<SearchResult>;
  totalItems: Scalars['Int']['output'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  /** An array of ids of the Collections in which this result appears */
  collectionIds: Array<Scalars['ID']['output']>;
  currencyCode: CurrencyCode;
  description: Scalars['String']['output'];
  facetIds: Array<Scalars['ID']['output']>;
  facetValueIds: Array<Scalars['ID']['output']>;
  inStock: Scalars['Boolean']['output'];
  price: SearchResultPrice;
  priceWithTax: SearchResultPrice;
  productAsset?: Maybe<SearchResultAsset>;
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  productVariantAsset?: Maybe<SearchResultAsset>;
  productVariantId: Scalars['ID']['output'];
  productVariantName: Scalars['String']['output'];
  /** A relevance score for the result. Differs between database implementations */
  score: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type SearchResultAsset = {
  __typename?: 'SearchResultAsset';
  focalPoint?: Maybe<Coordinate>;
  id: Scalars['ID']['output'];
  preview: Scalars['String']['output'];
};

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  name?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
  variantCreatedAt?: InputMaybe<SortOrder>;
};

export type Seller = Node & {
  __typename?: 'Seller';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SetCustomerForOrderResult =
  | AlreadyLoggedInError
  | EmailAddressConflictError
  | GuestCheckoutError
  | NoActiveOrderError
  | Order;

export type SetOrderShippingMethodResult =
  | IneligibleShippingMethodError
  | NoActiveOrderError
  | Order
  | OrderModificationError;

export type Setting = Node & {
  __typename?: 'Setting';
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  languageCode: LanguageCode;
  translations: Array<SettingTranslation>;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['JSON']['output'];
};

export type SettingFilterParameter = {
  createdAt?: InputMaybe<DateOperators>;
  enabled?: InputMaybe<BooleanOperators>;
  id?: InputMaybe<IdOperators>;
  key?: InputMaybe<StringOperators>;
  languageCode?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type SettingList = PaginatedList & {
  __typename?: 'SettingList';
  items: Array<Setting>;
  totalItems: Scalars['Int']['output'];
};

export type SettingListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<SettingFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<SettingSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type SettingSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SettingTranslation = Node & {
  __typename?: 'SettingTranslation';
  id: Scalars['ID']['output'];
  /** 当前语言 */
  languageCode: LanguageCode;
  /** 当前配置的字典内容 */
  value: Scalars['JSON']['output'];
};

export type SettlePaymentInput = {
  orderId: Scalars['ID']['input'];
  transactionId: Scalars['String']['input'];
};

export type ShippingLine = {
  __typename?: 'ShippingLine';
  discountedPrice: Scalars['Money']['output'];
  discountedPriceWithTax: Scalars['Money']['output'];
  discounts: Array<Discount>;
  id: Scalars['ID']['output'];
  price: Scalars['Money']['output'];
  priceWithTax: Scalars['Money']['output'];
  shippingMethod: ShippingMethod;
};

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  calculator: ConfigurableOperation;
  checker: ConfigurableOperation;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  fulfillmentHandlerCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  translations: Array<ShippingMethodTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ShippingMethodList = PaginatedList & {
  __typename?: 'ShippingMethodList';
  items: Array<ShippingMethod>;
  totalItems: Scalars['Int']['output'];
};

export type ShippingMethodQuote = {
  __typename?: 'ShippingMethodQuote';
  code: Scalars['String']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Money']['output'];
  priceWithTax: Scalars['Money']['output'];
};

export type ShippingMethodTranslation = {
  __typename?: 'ShippingMethodTranslation';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** The price value where the result has a single price */
export type SinglePrice = {
  __typename?: 'SinglePrice';
  value: Scalars['Money']['output'];
};

export enum SizeConfigItemDataOptionKey {
  /** 婚纱:定制专用: 袖孔 */
  armHole = 'armHole',
  /** 礼服: 定制专用: 孕妇肚子, 可选 */
  aroundBelly = 'aroundBelly',
  /** 婚纱:定制专用: 肩宽, 可选 */
  backShoulderWidth = 'backShoulderWidth',
  /** bust胸围列表数据源配置 */
  bust = 'bust',
  /** 自定义尺寸特有: extraLength高跟鞋可能需要加长, 平底鞋+0 */
  extraLength = 'extraLength',
  /** height身高 */
  height = 'height',
  /** hips列表数据源配置 */
  hips = 'hips',
  /** hollowToFloor列表数据源配置 */
  hollowToFloor = 'hollowToFloor',
  /** 婚纱:定制专用: 肩到胸围点, 可选 */
  midShoulderToBustPoint = 'midShoulderToBustPoint',
  /** 聚会场合时间 */
  occasionDate = 'occasionDate',
  /** 婚纱:定制专用:修长 */
  sleeveLength = 'sleeveLength',
  /** 婚纱: 定制专用: 孕妇妈妈, 可选 */
  underBust = 'underBust',
  /** 婚纱:定制专用: 上臂围 */
  upperArmCircumference = 'upperArmCircumference',
  /** waist腰围列表数据源配置 */
  waist = 'waist',
  /** 婚纱:定制专用:手腕 */
  wrist = 'wrist',
}

/** 用户客户端定制尺寸的输入数据, 用于保存用户输入的尺寸数据 */
export type SizeCustomDataItemInput = {
  key: SizeConfigItemDataOptionKey;
  /** 单位inch, cm, 当用户选择自定义输入的时候需要 */
  unit: SizeUnit;
  value: Scalars['String']['input'];
};

export enum SizeCustomizedLevel {
  /** 既支持标准, 也支持定制 */
  Both = 'Both',
  /** 只支持定制, 没有标准size */
  CustomizedOnly = 'CustomizedOnly',
  /** 只支持标准尺寸 */
  StandardOnly = 'StandardOnly',
}

/** 当前的尺寸类型, 固定标准尺寸, 还是自定义输入的尺寸 */
export enum SizeDataOptionType {
  Customzing = 'Customzing',
  Standard = 'Standard',
  StandardPlus = 'StandardPlus',
}

export type SizeDataOptions = CustomSizeDataOptions | StandardSizeDataOptions;

export enum SizeItemName {
  CUSTOMIZE = 'CUSTOMIZE',
  US_2 = 'US_2',
  US_4 = 'US_4',
  US_6 = 'US_6',
  US_8 = 'US_8',
  US_10 = 'US_10',
  US_12 = 'US_12',
  US_14 = 'US_14',
  US_16 = 'US_16',
  US_16_W = 'US_16_W',
  US_18_W = 'US_18_W',
  US_20_W = 'US_20_W',
  US_22_W = 'US_22_W',
  US_24_W = 'US_24_W',
  US_26_W = 'US_26_W',
}

/** 尺寸类型 */
export enum SizeUnit {
  /** 厘米 */
  cm = 'cm',
  /** 英寸 */
  inch = 'inch',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type StandardSizeDataOptionItem = {
  __typename?: 'StandardSizeDataOptionItem';
  key: SizeConfigItemDataOptionKey;
  /** 标准尺寸每一个DataOptionKey对应的值 */
  value: Scalars['String']['output'];
};

/** 元数据单位厘米表示, inch程序自动转化 */
export type StandardSizeDataOptions = {
  __typename?: 'StandardSizeDataOptions';
  cm: Array<StandardSizeDataOptionItem>;
  inch: Array<StandardSizeDataOptionItem>;
  type: SizeDataOptionType;
};

export type StringCustomFieldConfig = CustomField & {
  __typename?: 'StringCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  length?: Maybe<Scalars['Int']['output']>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  options?: Maybe<Array<StringFieldOption>>;
  pattern?: Maybe<Scalars['String']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type StringFieldOption = {
  __typename?: 'StringFieldOption';
  label?: Maybe<Array<LocalizedString>>;
  value: Scalars['String']['output'];
};

/** Operators for filtering on a list of String fields */
export type StringListOperators = {
  inList: Scalars['String']['input'];
};

/** Operators for filtering on a String field */
export type StringOperators = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

export type SubscriptionFacet = Node & {
  __typename?: 'SubscriptionFacet';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  values: Array<SubscriptionFacetValue>;
};

export type SubscriptionFacetList = PaginatedList & {
  __typename?: 'SubscriptionFacetList';
  items: Array<SubscriptionFacet>;
  totalItems: Scalars['Int']['output'];
};

export type SubscriptionFacetValue = Node & {
  __typename?: 'SubscriptionFacetValue';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  facet: Facet;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SubscriptionFacetValueList = PaginatedList & {
  __typename?: 'SubscriptionFacetValueList';
  items: Array<SubscriptionFacetValue>;
  totalItems: Scalars['Int']['output'];
};

export enum SubscriptionType {
  email = 'email',
  phone = 'phone',
}

/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean']['output'];
};

export type Surcharge = Node & {
  __typename?: 'Surcharge';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Money']['output'];
  priceWithTax: Scalars['Money']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type T0ProductCtxInput = {
  /** 产品来源的那一个分类或者专题页的集合ID */
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  /** 当前用户的UA parser结果辅助判断用户群体 */
  deviceInfo?: InputMaybe<Scalars['JSON']['input']>;
  /** 产品ID */
  productId: Scalars['ID']['input'];
  /** 产品变量ID */
  productVariantId: Scalars['ID']['input'];
};

export type T1UserSizeInputs = {
  __typename?: 'T1UserSizeInputs';
  /** 当前显示原价 */
  adjustOldPrice?: Maybe<Scalars['Int']['output']>;
  /** 当前价格 */
  adjustPrice: Scalars['Int']['output'];
  /** 当前尺寸选择项目ID */
  sizeConfigId: Scalars['ID']['output'];
  /** 当前用户填充的尺寸数据, 固定尺寸自带数据, 或者自定义尺寸用户输入的数据 */
  sizeData: Array<UserFilledSizeData>;
  /** 当前的尺寸类型 */
  sizeType: SizeDataOptionType;
};

export type Tag = Node & {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type TagList = PaginatedList & {
  __typename?: 'TagList';
  items: Array<Tag>;
  totalItems: Scalars['Int']['output'];
};

export type TaxCategory = Node & {
  __typename?: 'TaxCategory';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaxLine = {
  __typename?: 'TaxLine';
  description: Scalars['String']['output'];
  taxRate: Scalars['Float']['output'];
};

export type TaxRate = Node & {
  __typename?: 'TaxRate';
  category: TaxCategory;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  customerGroup?: Maybe<CustomerGroup>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
  zone: Zone;
};

export type TaxRateList = PaginatedList & {
  __typename?: 'TaxRateList';
  items: Array<TaxRate>;
  totalItems: Scalars['Int']['output'];
};

export type TextCustomFieldConfig = CustomField & {
  __typename?: 'TextCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type Ticket = Node & {
  __typename?: 'Ticket';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  issue: Scalars['String']['output'];
  languageCode: LanguageCode;
  owner: Customer;
  subject: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TicketCollection = Node & {
  __typename?: 'TicketCollection';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  translations: Array<TicketCollectionTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TicketCollectionList = PaginatedList & {
  __typename?: 'TicketCollectionList';
  items: Array<TicketCollection>;
  totalItems: Scalars['Int']['output'];
};

export type TicketCollectionTranslation = Node & {
  __typename?: 'TicketCollectionTranslation';
  id: Scalars['ID']['output'];
  /** 当前语言 */
  languageCode: LanguageCode;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  /** 当前选项的名称 */
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type TicketComment = Node & {
  __typename?: 'TicketComment';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  owner: Customer;
  ticket: Ticket;
  updatedAt: Scalars['DateTime']['output'];
};

export type TicketFilterParameter = {
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  issue?: InputMaybe<StringOperators>;
  languageCode?: InputMaybe<StringOperators>;
  subject?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type TicketGroup = Node & {
  __typename?: 'TicketGroup';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  members: Array<Customer>;
  name: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  sendMailTo: Array<Customer>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TicketHistory = Node & {
  __typename?: 'TicketHistory';
  action: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  owner: Customer;
  ticket: Ticket;
  updatedAt: Scalars['DateTime']['output'];
};

export type TicketList = PaginatedList & {
  __typename?: 'TicketList';
  items: Array<Ticket>;
  totalItems: Scalars['Int']['output'];
};

export type TicketListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<TicketFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<TicketSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type TicketNote = Node & {
  __typename?: 'TicketNote';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
  owner: Customer;
  ticket: Ticket;
  updatedAt: Scalars['DateTime']['output'];
};

export type TicketPriority = Node & {
  __typename?: 'TicketPriority';
  createdAt: Scalars['DateTime']['output'];
  htmlColor: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  overdueIn: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TicketSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  issue?: InputMaybe<SortOrder>;
  subject?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TicketTag = Node & {
  __typename?: 'TicketTag';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TicketType = Node & {
  __typename?: 'TicketType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  priorities: Array<TicketPriority>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ToggleFavoriteResult = {
  __typename?: 'ToggleFavoriteResult';
  favorite?: Maybe<Favorite>;
  favoriteCount: Scalars['Int']['output'];
};

export type Topic = Node & {
  __typename?: 'Topic';
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  helpfulNo: Scalars['Int']['output'];
  helpfulYes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  name: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  translations: Array<TopicTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TopicFilterParameter = {
  body?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  helpfulNo?: InputMaybe<NumberOperators>;
  helpfulYes?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  metaDescription?: InputMaybe<StringOperators>;
  metaTitle?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  published?: InputMaybe<BooleanOperators>;
  slug?: InputMaybe<StringOperators>;
  title?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type TopicLink = Node & {
  __typename?: 'TopicLink';
  children?: Maybe<Array<TopicLink>>;
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  parent?: Maybe<TopicLink>;
  parentId?: Maybe<Scalars['Int']['output']>;
  position: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  redirectTo: Scalars['String']['output'];
  translations: Array<TopicLinkTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TopicLinkFilterParameter = {
  coverImage?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  displayOrder?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  parentId?: InputMaybe<NumberOperators>;
  position?: InputMaybe<StringOperators>;
  published?: InputMaybe<BooleanOperators>;
  redirectTo?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type TopicLinkList = PaginatedList & {
  __typename?: 'TopicLinkList';
  items: Array<TopicLink>;
  totalItems: Scalars['Int']['output'];
};

export type TopicLinkListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<TopicLinkFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<TopicLinkSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum TopicLinkPosition {
  SiteFooter = 'SiteFooter',
  SiteHelperCenter = 'SiteHelperCenter',
  SiteTopNav = 'SiteTopNav',
  SiteVideoGuide = 'SiteVideoGuide',
}

export type TopicLinkSortParameter = {
  coverImage?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  displayOrder?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parentId?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  redirectTo?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TopicLinkTranslation = {
  __typename?: 'TopicLinkTranslation';
  coverImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  redirectTo: Scalars['String']['output'];
};

export type TopicList = PaginatedList & {
  __typename?: 'TopicList';
  items: Array<Topic>;
  totalItems: Scalars['Int']['output'];
};

export type TopicListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<TopicFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<TopicSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type TopicSortParameter = {
  body?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  helpfulNo?: InputMaybe<SortOrder>;
  helpfulYes?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  metaDescription?: InputMaybe<SortOrder>;
  metaTitle?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TopicTranslation = {
  __typename?: 'TopicTranslation';
  body: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TransitionOrderToStateResult = Order | OrderStateTransitionError;

export type UnionMain = {
  __typename?: 'UnionMain';
  /** Available of currency codes of default channnel */
  availableCurrencyCodes: Array<CurrencyCode>;
  /** All settings from plugin-banner */
  banners: Array<Banner>;
  /** Best seller products of home page */
  bestSellerProducts: Array<SearchResult>;
  /** All collections */
  collections: Array<Collection>;
  /** All footer topic links */
  footerTopicLinks: Array<TopicLink>;
  /** New Arrivals products of home page */
  newArrivalsProducts: Array<SearchResult>;
  /** All settings from plugin-setting */
  settings: Array<Setting>;
  /** testimonial reviews of aboutus page */
  testimonialReviews: Array<ProductReview>;
  /** All video guide topic links */
  videoGuideTopicLinks: Array<TopicLink>;
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  customFields?: InputMaybe<Scalars['JSON']['input']>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  streetLine1?: InputMaybe<Scalars['String']['input']>;
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerCustomFieldsInput = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  languageCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerEmailAddressResult =
  | IdentifierChangeTokenExpiredError
  | IdentifierChangeTokenInvalidError
  | NativeAuthStrategyError
  | Success;

export type UpdateCustomerInput = {
  customFields?: InputMaybe<UpdateCustomerCustomFieldsInput>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerPasswordResult =
  | InvalidCredentialsError
  | NativeAuthStrategyError
  | PasswordValidationError
  | Success;

export type UpdateHelpCenterHelpfulInput = {
  helpfulNo?: InputMaybe<Scalars['Boolean']['input']>;
  helpfulYes?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateOrderCustomFieldsInput = {
  languageCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderInput = {
  customFields?: InputMaybe<UpdateOrderCustomFieldsInput>;
};

export type UpdateOrderItemsResult =
  | InsufficientStockError
  | NegativeQuantityError
  | Order
  | OrderLimitError
  | OrderModificationError;

export type UpdateProductReviewInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  customerNameIsPublic?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
  suggestions?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTopicHelpfulInput = {
  helpfulNo?: InputMaybe<Scalars['Boolean']['input']>;
  helpfulYes?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};

export type User = Node & {
  __typename?: 'User';
  authenticationMethods: Array<AuthenticationMethod>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  roles: Array<Role>;
  updatedAt: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
};

export type UserConfigdCustomOptionOfStep = {
  __typename?: 'UserConfigdCustomOptionOfStep';
  /** 用户选择的用途选项模块对应的ID */
  customOptionId: Scalars['ID']['output'];
  /** 用户选择的用户选项模块对应的选项Key */
  customOptionKey?: Maybe<DressCustomOptionKeys>;
};

/** 当前用户填充的尺寸数据, 固定尺寸自带数据, 或者自定义尺寸用户输入的数据 */
export type UserFilledSizeData = {
  __typename?: 'UserFilledSizeData';
  /** 当前选择的尺寸选项KEY */
  key: SizeConfigItemDataOptionKey;
  /** i18n当前尺寸选项的label, summary需要展示 */
  label: Scalars['String']['output'];
  /** 当前尺寸单位 */
  unit: SizeUnit;
  /** 选择的尺寸选项的值 */
  value: Scalars['String']['output'];
};

/** 用户流程选项输入 */
export type UserOptionInput = {
  /** 用户选择的用途选项模块对应的ID */
  customOptionId: Scalars['ID']['input'];
  /** 用户选择的用户选项模块对应的选项Key */
  customOptionKey?: InputMaybe<DressCustomOptionKeys>;
};

/** 用户定制尺寸输入 */
export type UserSizeInput = {
  /** 当前item的唯一ID */
  sizeConfigId: Scalars['ID']['input'];
  /** 当SizeItemName===CUSTOMIZE, 此值必选 */
  sizeCustomData: Array<SizeCustomDataItemInput>;
};

export type UserSubscription = Node & {
  __typename?: 'UserSubscription';
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  facetValues: Array<SubscriptionFacetValue>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  subscribeFrom: Scalars['String']['output'];
  type: SubscriptionType;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type UserSubscriptionList = PaginatedList & {
  __typename?: 'UserSubscriptionList';
  items: Array<UserSubscription>;
  totalItems: Scalars['Int']['output'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type VerificationTokenExpiredError = ErrorResult & {
  __typename?: 'VerificationTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export type VerificationTokenInvalidError = ErrorResult & {
  __typename?: 'VerificationTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type VerifyCustomerAccountResult =
  | CurrentUser
  | MissingPasswordError
  | NativeAuthStrategyError
  | PasswordAlreadySetError
  | PasswordValidationError
  | VerificationTokenExpiredError
  | VerificationTokenInvalidError;

export type Zone = Node & {
  __typename?: 'Zone';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  members: Array<Region>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AddressFragment = {
  __typename?: 'Address';
  id: string | number;
  createdAt: any;
  updatedAt: any;
  fullName?: string;
  company?: string;
  streetLine1: string;
  streetLine2?: string;
  province?: string;
  city?: string;
  phoneNumber?: string;
  customFields?: any;
  postalCode?: string;
  defaultBillingAddress?: boolean;
  defaultShippingAddress?: boolean;
  country: {
    __typename?: 'Country';
    id: string | number;
    code: string;
    name: string;
  };
};

export type AssetFragment = {
  __typename?: 'Asset';
  id: string | number;
  name: string;
  source: string;
  preview: string;
  width: number;
  height: number;
};

export type CustomerFragment = {
  __typename?: 'Customer';
  id: string | number;
  title?: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string;
  customFields?: { __typename?: 'CustomerCustomFields'; birthday?: string };
  addresses?: Array<{ __typename?: 'Address' } & AddressFragment>;
};

export type NextVerifyCustomerAccountMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
}>;

export type NextVerifyCustomerAccountMutation = {
  verifyCustomerAccount:
    | { __typename: 'CurrentUser'; id: string | number }
    | {
        __typename: 'MissingPasswordError';
        errorCode: ErrorCode;
        message: string;
      }
    | {
        __typename: 'NativeAuthStrategyError';
        errorCode: ErrorCode;
        message: string;
      }
    | {
        __typename: 'PasswordAlreadySetError';
        errorCode: ErrorCode;
        message: string;
      }
    | {
        __typename: 'PasswordValidationError';
        errorCode: ErrorCode;
        message: string;
      }
    | {
        __typename: 'VerificationTokenExpiredError';
        errorCode: ErrorCode;
        message: string;
      }
    | {
        __typename: 'VerificationTokenInvalidError';
        errorCode: ErrorCode;
        message: string;
      };
};

export type NextUpdateCustomerMutationVariables = Exact<{
  input: UpdateCustomerInput;
}>;

export type NextUpdateCustomerMutation = {
  updateCustomer: { __typename?: 'Customer' } & CustomerFragment;
};

export type NextUpdateCustomerPasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;

export type NextUpdateCustomerPasswordMutation = {
  updateCustomerPassword:
    | {
        __typename: 'InvalidCredentialsError';
        errorCode: ErrorCode;
        message: string;
      }
    | {
        __typename: 'NativeAuthStrategyError';
        errorCode: ErrorCode;
        message: string;
      }
    | {
        __typename: 'PasswordValidationError';
        errorCode: ErrorCode;
        message: string;
      }
    | { __typename: 'Success'; success: boolean };
};

export type NextRegisterCustomerAccountMutationVariables = Exact<{
  input: RegisterCustomerInput;
}>;

export type NextRegisterCustomerAccountMutation = {
  registerCustomerAccount:
    | {
        __typename: 'MissingPasswordError';
        errorCode: ErrorCode;
        message: string;
      }
    | {
        __typename: 'NativeAuthStrategyError';
        errorCode: ErrorCode;
        message: string;
      }
    | {
        __typename: 'PasswordValidationError';
        errorCode: ErrorCode;
        message: string;
      }
    | { __typename: 'Success'; success: boolean };
};

export type NextCreateCustomerAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;

export type NextCreateCustomerAddressMutation = {
  createCustomerAddress: { __typename?: 'Address' } & AddressFragment;
};

export type NextUpdateCustomerAddressMutationVariables = Exact<{
  input: UpdateAddressInput;
}>;

export type NextUpdateCustomerAddressMutation = {
  updateCustomerAddress: { __typename?: 'Address' } & AddressFragment;
};

export type NextDeleteCustomerAddressMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type NextDeleteCustomerAddressMutation = {
  deleteCustomerAddress: { __typename: 'Success'; success: boolean };
};

export type NextMeQueryVariables = Exact<{ [key: string]: never }>;

export type NextMeQuery = {
  me?: { __typename?: 'CurrentUser'; id: string | number; identifier: string };
};
