export type Link = {
  type: string;
  label: string;
  url: string;
};

export type TokenResponse = {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header: string | null;
  description: string | null;
  links: Link[] | null;
};

export type LatestTokenResponse = TokenResponse[];

export type BoostedTokenResponse = TokenResponse & {
  amount: number;
  totalAmount: number;
};

export type MostActiveBoostsTokenResponse = BoostedTokenResponse;
