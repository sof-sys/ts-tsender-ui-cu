================================
TS-TSENDER-UI-CU (Terminal README)
================================

This repository contains a Next.js + TypeScript frontend for interacting with the TSender ERC20 airdrop smart contract. The application enables users to input token addresses, recipient addresses, and amounts, and then automatically handle approvals and airdrops using the TSender contract.

The project uses Wagmi, RainbowKit, React Query, and custom utility functions to execute blockchain interactions in a user-friendly UI.

PROJECT SUMMARY

This application provides a clean user interface for executing ERC20 airdrops across multiple networks.
Key features include:

ERC20 approval detection

Automatic approval transactions when needed

Airdrop execution using the TSender contract

Dynamic chain support using a configuration map

React-based UI with reusable components

Wallet connection through RainbowKit

Responsive form inputs with validation and error states

Loading indicators on transactions

Calculation utility for computing total amounts

FEATURES

Wallet Connection

Uses RainbowKit and Wagmi

Automatically detects connected chain and account

Airdrop Form

Inputs for token address, recipients, and amounts

Handles comma or newline separated lists

Calculates total amount with calculateTotal()

Detects whether approval is required

Executes approval transaction if needed

Executes TSender airdrop transaction otherwise

Chain-Aware Contract Routing

chainsToTSender config maps chain IDs to deployed TSender addresses

Supports networks such as Ethereum Mainnet, Arbitrum, Optimism, Base, ZkSync, and others as defined in constants.ts

Contract Interaction

Uses Wagmi (useWriteContract, readContract, etc.)

Uses ABI definitions for ERC20 tokens and the TSender contract

Tracks transaction status with waitForTransactionReceipt

App Layout

Global layout includes Providers (WagmiProvider, QueryClientProvider, RainbowKitProvider)

Header component includes GitHub link and ConnectButton

Developer Experience

TypeScript throughout

Path aliasing via tsconfig.json

React Query for UI responsiveness

Vitest for frontend tests (configured)

PROJECT STRUCTURE

(Extracted directly from retrieved repository contents)

/
├── readme.md
├── vitest.config.mts
├── postcss.config.mjs
├── tsconfig.json
├── ts-tsender-ui-cu/
│ ├── src/
│ │ ├── app/
│ │ │ ├── layout.tsx
│ │ │ ├── page.tsx
│ │ │ └── providers.tsx
│ │ ├── components/
│ │ │ ├── Header.tsx
│ │ │ ├── AirdropForm.tsx
│ │ │ ├── constants.ts
│ │ │ ├── ui/
│ │ │ │ └── InputField.tsx (implied but not shown in search results)
│ │ ├── Utils/
│ │ │ └── calculateTotal/calculateTotal.ts (referenced)
│ │ └── r.md
│ └── public/
└── package.json (implied)

COMPONENT / MODULE OVERVIEW
layout.tsx

Provides the root layout structure for the Next.js app.
Wraps all pages with Providers and renders the Header.

Header.tsx

Navigation header component containing:

Application title

Link to GitHub

Wallet connection button

AirdropForm.tsx

Main user interaction form for airdropping ERC20 tokens.

Key responsibilities:

Reads user input

Parses recipients and amounts

Calculates total amounts

Checks allowance for the TSender contract

Sends approval transaction if needed

Executes TSender airdrop transaction

constants.ts

Holds:

chainId -> TSender address mapping

Full ERC20 ABI

Full TSender ABI

providers.tsx

Initializes Wagmi, RainbowKit, and React Query providers.

page.tsx

Home page that renders either:

Airdrop UI if wallet connected

Prompt to connect if wallet disconnected

calculateTotal

Utility for computing the sum of provided ERC20 token amounts.

r.md

Developer notes and quality-of-life feature ideas.

TESTING

The repo includes a Vitest configuration file (vitest.config.mts) which:

Uses jsdom as the testing environment for React components

Applies TypeScript path aliasing using vite-tsconfig-paths

Inlines Wagmi for compatibility

Tests themselves are not included in the retrieved files.

To run tests:
vitest

(Or add appropriate npm scripts.)

DEVELOPMENT AND BUILDING

Development server:
npm run dev

Build for production:
npm run build

Start production server:
npm start

SECURITY CONSIDERATIONS

AirdropForm handles approval and airdrop operations directly from the connected wallet

No backend; operations are performed client-side

User must ensure token address correctness

Ensure chainId is supported by chainsToTSender

Malformed inputs may affect results; input validation recommended

FUTURE IMPROVEMENTS

Based on r.md and code references:

Add loading spinner for transaction + MetaMask signing (partial implementation exists)

Save form inputs to local storage for persistence

Add token details preview (name, symbol, decimals)

Improve input parsing and error reporting

Add full test suite for components and utilities

Add multi-chain gas estimation

Add support for batch simulation of airdrops

Add improved styling and UX flow

ACKNOWLEDGEMENTS
This project was created while following the Cyfrin Updraft curriculum, I am new to solidity programing and so I would like to thank Patrick Collins for these amazing free resources.
