import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export class MugloarDragonApi {
  private client: AxiosInstance;

  private routes = {
    START_GAME: '/game/start',
    SHOP: (gameId: string) => `/${gameId}/shop`,
    GET_ADS: (gameId: string) => `/${gameId}/messages`,
    SOLVE_AD: (gameId: string, adId: string) => `/${gameId}/solve/${adId}`,
    PURCHASE_ITEM: (gameId: string, itemId: string) => `/${gameId}/shop/buy/${itemId}`
  };

  private handleRequest = async (request: Promise<AxiosResponse<any>>) =>
    request.then(this.handleResult).catch(this.handleError);

  private handleError(err: AxiosError) {
    //@ts-ignore
    throw new Error(err.response.data.message);
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

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL
    });
  }

  public startGame = async () => {
    return await this.handleMutationRequest(
      this.client.post(this.routes.START_GAME)
    );
  };

  public shop = async (gameId: string) => {
    return await this.handleRequest(this.client.get(this.routes.SHOP(gameId)));
  };

  public purchaseItem = async (gameId: string, itemId: string) => {
    return await this.handleMutationRequest(this.client.post(this.routes.PURCHASE_ITEM(gameId, itemId)));
  }

  public getAds = async (gameId: string) => {
    return await this.handleRequest(this.client.get(this.routes.GET_ADS(gameId)));
  }

  public solveAd = async (gameId: string, adId: string) => {
    return await this.handleMutationRequest(this.client.post(this.routes.SOLVE_AD(gameId, adId)));
  }
}
