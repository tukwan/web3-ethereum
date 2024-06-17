# Pokemon

Pokemon is a web application that allows users to view, list, and interact with Pokemon using Ethereum blockchain technology. This project is built using Next.js and leverages various technologies to provide a seamless experience.

## Live

- [https://pokemon-vert-ten.vercel.app](https://pokemon-vert-ten.vercel.app)

<img width="800" src="https://github.com/tukwan/pokemon/assets/7630720/51ae50ce-e109-4d07-a5c2-33dd52373cf5">

## Features

- **MetaMask Wallet Connection**: Connect to a user's MetaMask wallet for blockchain interactions.
- **Ethereum Transaction Signing**: Allow users to "Collect" a Pokemon by signing a simple Ethereum transaction.
- **Server-Side Rendering (SSR)**: Ensure enhanced performance and SEO.
- **Tooltip Preview with Web Scraping**: Display basic Pokemon info using server-side web scraping.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## Tech Stack

- **Next.js**: Framework for React applications with built-in support for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Ethers.js**: Library for interacting with the Ethereum blockchain.
- **Cheerio**: Library for web scraping and parsing HTML.
- **@usedapp/core**: Library for handling Ethereum wallet connection and interaction.

## Getting Started

- `yarn && yarn dev` (for development)
- `yarn build && yarn start` (for production)

## Environment Variables

Make sure to set up the following environment variables in a `.env` file:

```sh
NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU License. See the [LICENSE](LICENSE) file for details.
