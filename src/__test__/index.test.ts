import { DexScreenerApi } from "../index";

const CONSTANTS = {
  CHAIN_ID: "solana",
  PAIR: "dvwbpf4ragzgee2dk7rdlsuf6p7m2m9svc3yqfycs1jj",
  TOKEN: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
  QUERY: "SOL/USDC",
};

describe("DEX API", () => {
  const apiClient = new DexScreenerApi();
  it("should return pairs information by chain", async () => {
    const pairsResponse = await apiClient.getPairInformationByChain(
      CONSTANTS.CHAIN_ID,
      CONSTANTS.PAIR
    );
    expect(pairsResponse.schemaVersion).toBe("1.0.0");
    expect(pairsResponse.pair.chainId).toBe(CONSTANTS.CHAIN_ID);
    expect(pairsResponse.pair.pairAddress).toBe(CONSTANTS.PAIR);
  });

  it("should return pairs matching token address", async () => {
    const tokensResponse = await apiClient.getPairsMatchingBaseTokenAddress(
      CONSTANTS.TOKEN
    );
    expect(tokensResponse.schemaVersion).toBe("1.0.0");
    expect(tokensResponse.pairs.length).toBeGreaterThan(0);
  });

  it("should search for pairs a query", async () => {
    const searchResponse = await apiClient.searchPairsMatchingQuery(
      CONSTANTS.QUERY
    );
    expect(searchResponse.schemaVersion).toBe("1.0.0");
    expect(searchResponse.pairs.length).toBeGreaterThan(0);
  });
});
