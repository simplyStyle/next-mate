export class ShopApiError extends Error {
  res: Response;
  status: number;
  code?: string;
  constructor(
    res: Response,
    message?: string,
    code?: string,
    statusCode = 400
  ) {
    super(message);
    this.name = 'ShopApiError';
    this.res = res;
    this.code = code;
    this.status = this.isOk(res) ? statusCode : res.status;
  }
  /**
   * Make sure that ShopApiError always should have error statusCode to client.
   * if isOk(), always return 400, otherwise keep source error status code. e.g. 401, 500.
   * @param res
   * @returns
   */
  private isOk(res: Response) {
    return res.status >= 200 && res.status < 300;
  }
}
