# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Web3 ERC20 token airdrop UI built with Next.js 15 (App Router, static export), wagmi, and RainbowKit. Users connect a wallet and distribute tokens to multiple recipients via a Tsender smart contract.

## Repository Layout

The Next.js application lives in `ts-tsender-ui-cu/`. Most development work happens there. The root directory contains Playwright E2E test configuration and CI workflows.

## Commands

Run all commands from `ts-tsender-ui-cu/` unless otherwise noted.

```bash
# Development
pnpm dev          # Next.js dev server with Turbopack (http://localhost:3000)
pnpm build        # Static export build (outputs to ./out)
pnpm lint         # ESLint via Next.js

# Unit tests (Vitest) - run from ts-tsender-ui-cu/
pnpm test:uint    # Run all unit tests (note: intentional typo in package.json)
pnpm test:uint -- --run src/Utils/calculateTotal/calculateTotal.test.ts  # Single test file

# E2E tests (Playwright + Synpress) - run from repo root
pnpm anvil        # Start local Anvil blockchain (required for E2E)
pnpm synpress     # Run E2E tests with MetaMask simulation
```

Environment variable needed: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in `ts-tsender-ui-cu/.env.local`.

## Architecture

**Static export**: `next.config.ts` sets `output: "export"`, so there is no server-side rendering. All pages are client components or must handle hydration carefully.

**Web3 stack**:
- `wagmi` + `viem` for contract reads/writes and wallet state
- `@tanstack/react-query` for async data management
- `RainbowKit` for the wallet connection UI

**Provider chain** (`app/providers.tsx`): `WagmiProvider` → `QueryClientProvider` → `RainbowKitProvider`

**Core airdrop flow** (`components/AirdropForm.tsx`):
1. User inputs token address, recipient addresses (comma/newline separated), and amounts
2. `useReadContract` checks the current ERC20 allowance for the Tsender contract
3. If allowance < total needed → call `approve` on the ERC20 token
4. Once approved → call `airdropERC20(token, recipients[], amounts[], totalAmount)` on Tsender contract
5. Transaction state is managed with `useWriteContract`

**Chain/contract config** (`components/constants.ts`): `chainsToTSender` maps chain IDs to deployed Tsender contract addresses. Supported chains: Anvil (31337), zkSync (324), Mainnet (1), Arbitrum (42161), Optimism (10), Base (8453), Sepolia (11155111).

**Utility** (`src/Utils/calculateTotal/`): Parses comma/newline-separated number strings and returns their sum as a bigint. This is the only unit-tested utility.

**Path alias**: `@/*` resolves to `ts-tsender-ui-cu/src/*`.

## Testing Notes

- Unit tests use Vitest with jsdom environment. wagmi and @wagmi/core are inlined by Vitest.
- E2E tests use Playwright + Synpress (MetaMask automation). Requires Anvil running with `tsender-deployed.json` state loaded.
- The `test/` directory at the repo root previously contained Playwright specs that were deleted; new E2E tests should go there.