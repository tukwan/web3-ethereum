# Pokemon

Pokemon is a web application that allows users to view, list, and interact with Pokemon using Ethereum blockchain technology.

## Live

- [https://pokemon-vert-ten.vercel.app](https://pokemon-vert-ten.vercel.app)

<img width="800" src="https://github.com/user-attachments/assets/2cced527-f23b-46c7-b849-a5c3af0fc614">

## Features

- **JWT Tokens & SIWE**: Authorization, session management, and authentication using JSON Web Tokens (JWT) and Sign-In with Ethereum (SIWE).
- **Basic Authorization**: Implemented basic authorization for user access control (Premium Pokemons).
- **Wallet Connection Interface**: User-friendly wallet connection interface using RainbowKit.
- **Ethereum Transaction Signing**: Allow users to "Collect" a Pokemon by signing a simple Ethereum transaction.
- **Tooltip Preview with Web Scraping**: Display basic Pokemon info using server-side web scraping.
- **Server-Side Rendering (SSR)**: Ensure enhanced performance and SEO.
- **Data Fetching and State Management**: Efficient data-fetching and state management with React Query.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## Tech Stack

- **next.js**: Framework for React applications with built-in support for server-side rendering and static site generation.
- **react**: JavaScript library for building user interfaces.
- **tailwind css**: Utility-first CSS framework for styling.
- **rainbowkit**: Library for building a wallet connection interface.
- **siwe**: Sign-In with Ethereum (SIWE) for Ethereum authentication.
- **viem**: Ethereum library for building decentralized applications.
- **wagmi**: React Hooks library for Ethereum.
- **ethers.js**: Library for interacting with the Ethereum blockchain.
- **jose**: Library for JSON Web Tokens (JWT) and other security features.
- **react-query**: Powerful data-fetching and state management for React.
- **cheerio**: Library for web scraping and parsing HTML.

## Getting Started

- `pnpm i && pnpm dev` (for development)
- `pnpm build && pnpm start` (for production)

## Environment Variables

Make sure to set up the following environment variables in a `.env` file:

```sh
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_SIGNIN_MESSAGE=
AUTH_SECRET_KEY=

```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU License. See the [LICENSE](LICENSE) file for details.
