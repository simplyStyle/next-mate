declare type PageProps<
  Param = {
    //
  },
> = {
  params: { locale: string } & Param;
  searchParams: { [key: string]: string | string[] | undefined };
};
