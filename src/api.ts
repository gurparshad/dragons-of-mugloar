import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
// import {
//   getExchangeRateRequestParams,
//   getTransactionsRequestParams,
// } from "./utils/types";

export class MugloarDragonApi {
  private client: AxiosInstance;

  private routes = {
    START_GAME: '/game/start',
    SHOP: '/:gameId/shop',
    GET_ADS: '/:gameId/messages',
    SOLVE_AD: '/:gameId/solve/:adId',
    PURCHASE_ITEM: '/:gameId/shop/buy/:itemId'
  };

  private handleRequest = async (request: Promise<AxiosResponse<any>>) =>
    request.then(this.handleResult).catch(this.handleError);

  private handleError(err: AxiosError) {
    //@ts-ignore
    throw new Error(err?.response?.data?.message);
  }

  private handleResult(res: AxiosResponse) {
    return res.data;
  }

  private handleMutationRequest = async (
    request: Promise<AxiosResponse<any>>
  ) =>
    request
      .then(({ data }) => data)
      .catch((err) => {
        this.handleError(err);
        return false;
      });

  constructor(apiToken?: string, apiBaseUrl?: string) {
    this.client = axios.create({
      baseURL: apiBaseUrl ?? process.env.API_BASE_URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  public startGame = async () => {
    return await this.handleMutationRequest(
      this.client.post(this.routes.START_GAME)
    );
  };

//   public startGame = async () => {
//     return await this.handleRequest(this.client.get(this.routes.CURRENT_USER));
//   };
}
