# Tsender UI

A Web3 frontend for batch ERC20 token distribution. Connect your wallet, paste a list of recipient addresses and amounts, and send tokens to hundreds of wallets in two transactions.

## How It Works

1. Connect your wallet via RainbowKit
2. Enter an ERC20 token address, recipient addresses, and amounts (comma or newline separated)
3. The app checks your current allowance for the Tsender contract
4. If allowance is insufficient, it prompts an `approve` transaction first
5. Then calls `airdropERC20` on the Tsender contract to distribute tokens in a single transaction

## Supported Networks

| Network | Chain ID |
|---|---|
| Ethereum Mainnet | 1 |
| Arbitrum One | 42161 |
| Optimism | 10 |
| Base | 8453 |
| zkSync Era | 324 |
| Sepolia (testnet) | 11155111 |
| Anvil (local) | 31337 |

## Tech Stack

- **Next.js 15** (App Router, static export)
- **wagmi v2** + **viem** — contract reads/writes
- **RainbowKit** — wallet connection UI
- **TanStack Query** — async state management
- **Tailwind CSS v4**

## Getting Started

```bash
cd ts-tsender-ui-cu
pnpm install
```

Create `ts-tsender-ui-cu/.env.local`:
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

```bash
pnpm dev      # start dev server at http://localhost:3000
pnpm build    # static export to ./out
pnpm lint     # run ESLint
```

## Testing

```bash
# Unit tests (Vitest)
cd ts-tsender-ui-cu
pnpm test:uint

# E2E tests (Playwright + Synpress — requires Anvil)
pnpm anvil    # start local blockchain (from repo root)
pnpm synpress # run MetaMask E2E tests
```