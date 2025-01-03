import axios, { AxiosRequestConfig } from "axios";
import PairsResponse from "./types/PairsResponse";
import PairNotFoundError from "./errors/PairNotFoundError";
import {
  LatestTokenResponse,
  MostActiveBoostsTokenResponse,
  TokenResponse,
} from "./types/TokenResponse";
import { OrdersResponse } from "./types/OrdersResponse";
import TokensResponse from "./types/TokensResponse";
import SearchResponse from "./types/SearchResponse";

export const baseUri = "https://api.dexscreener.com";

/**
 * Ref: https://docs.dexscreener.com/api/reference
 */
export class DexScreenerApi {
  private endpoint: string;

  constructor(endpoint: string = baseUri) {
    this.endpoint = endpoint;
  }

  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  async _get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.get<T>(url, config);
    return response.data;
  }

  getLatestTokenProfiles(): Promise<LatestTokenResponse> {
    return this._get(`${this.endpoint}/token-profiles/latest/v1`);
  }

  getLatestBoostedTokens(): Promise<TokenResponse> {
    return this._get(`${this.endpoint}/token-boosts/latest/v1`);
  }

  getMostActiveBoostsTokens(): Promise<MostActiveBoostsTokenResponse> {
    return this._get(`${this.endpoint}/token-boosts/top/v1`);
  }

  getTokenOrdersPaid(
    chainId: string,
    tokenAddress: string
  ): Promise<OrdersResponse> {
    return this._get(`${this.endpoint}/orders/v1/${chainId}/${tokenAddress}`);
  }

  async getPairInformationByChain(
    chainId: string,
    pairId: string
  ): Promise<PairsResponse> {
    const pairsResponse = await this._get<PairsResponse>(
      `${baseUri}/latest/dex/pairs/${chainId}/${pairId}`
    );
    if (!pairsResponse.pairs) {
      throw new PairNotFoundError(pairId);
    }
    return pairsResponse;
  }

  async getPairsMatchingBaseTokenAddress(
    tokenAddress: string
  ): Promise<TokensResponse> {
    const tokensResponse = await this._get<TokensResponse>(
      `${baseUri}/latest/dex/tokens/${tokenAddress}`
    );
    if (!tokensResponse.pairs) {
      tokensResponse.pairs = [];
    }
    return tokensResponse;
  }

  searchPairsMatchingQuery(query: string): Promise<SearchResponse> {
    return this._get(`${baseUri}/latest/dex/search?q=${query}`);
  }
}
