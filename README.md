# Web3 Ethereum

This application allows users to interact with Pokemons using Ethereum blockchain technologies. It has been developed as an **Interview Assignment Project**.

## Live

- [https://pokemon-vert-ten.vercel.app](https://pokemon-vert-ten.vercel.app)

<img width="600" src="https://github.com/user-attachments/assets/cd8492eb-e570-4d20-a820-82081ec2b917">

## Design

Custom Figma design files have been provided for this project.

<img width="600" src="https://github.com/user-attachments/assets/65ab28cb-0c62-4d96-849c-edb84106fd51">

## Features

- **Wallet Connection**: Seamless wallet connection via RainbowKit for Ethereum transactions.
- **Transaction Signing**: Users can "Collect" a Pokemon by signing a simple Ethereum transaction.
- **Authorization**: Basic user access control, including premium Pokemon, using JWT and SIWE for authentication.
- **Web Scraping**: Display basic Pokemon info using server-side web scraping.
- **Responsive**: Optimized for both desktop and mobile viewing.
- **Performance Budget**: Lighthouse CI integration to maintain speed, accessibility, best practices, and SEO standards, with automatic checks on every code push.

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
- **lighthouse CI**: Tool for automated performance, accessibility, and SEO checks.

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
