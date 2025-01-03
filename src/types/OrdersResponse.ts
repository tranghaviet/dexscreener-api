export const OrderType = {
  tokenProfile: "tokenProfile",
  communityTakeover: "communityTakeover",
  tokenAd: "tokenAd",
  trendingBarAd: "trendingBarAd",
} as const;

export const OrderStatus = {
  processing: "processing",
  cancelled: "cancelled",
  "on-hold": "on-hold",
  approved: "approved",
  rejected: "rejected",
} as const;

export type Order = {
  type: (typeof OrderType)[keyof typeof OrderType];
  status: (typeof OrderStatus)[keyof typeof OrderStatus];
  paymentTimestamp: number;
};

export type OrdersResponse = Order[];
