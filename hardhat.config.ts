import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-dependency-compiler";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const privateKey =
  process.env.PRIVATE_KEY ||
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const infuraKey = process.env.INFURA_API_KEY || "";
const etherscanApi = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: "none",
      },
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      blockGasLimit: 40_000_000,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    arbitrumRinkeby: {
      url: `https://arbitrum-rinkeby.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    bnb: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [privateKey],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    optimismKovan: {
      url: `https://optimism-kovan.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    viction: {
      url: `https://rpc.viction.xyz`,
      accounts: [privateKey],
    },
    victionTestnet: {
      url: `https://rpc-testnet.viction.xyz`,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: etherscanApi,
  },
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    tests: "./tests",
  },
  dependencyCompiler: {
    paths: [],
  },
  gasReporter: {
    currency: "USD",
    enabled: true,
    gasPrice: 0.25,
    token: "ETH",
  },
  mocha: {
    timeout: 6000000,
  },
};

export default config;
