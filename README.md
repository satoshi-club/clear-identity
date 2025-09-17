# Clear Identity

A privacy-preserving digital identity management platform built with Fully Homomorphic Encryption (FHE) technology. Clear Identity allows users to manage their digital identity while keeping sensitive personal data encrypted and private, yet verifiable on-chain.

## 🚀 Features

- **FHE-Encrypted Identity Management**: Store and manage personal identity data with full homomorphic encryption
- **Privacy-Preserving Verification**: Verify identity attributes without exposing sensitive information
- **Blockchain Integration**: Secure, decentralized identity verification on Ethereum Sepolia
- **Modern Web3 Wallet Support**: Connect with RainbowKit and multiple wallet providers
- **Responsive Design**: Beautiful, modern UI with holographic design elements
- **Smart Contract Integration**: Deploy and interact with FHE-enabled smart contracts

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **RainbowKit** for Web3 wallet integration
- **Wagmi** for Ethereum interactions

### Smart Contracts
- **Solidity 0.8.24** with FHE support
- **Hardhat** for development and deployment
- **FHEVM** for fully homomorphic encryption
- **OpenZeppelin** for secure contract standards

### Blockchain
- **Ethereum Sepolia** testnet
- **FHE-enabled** smart contracts
- **IPFS** for decentralized storage (optional)

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- MetaMask or compatible Web3 wallet
- Sepolia ETH for gas fees

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/satoshi-club/clear-identity.git
cd clear-identity
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment example file and configure your settings:

```bash
cp env.example .env.local
```

Update the following variables in `.env.local`:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Contract Address (set after deployment)
VITE_CONTRACT_ADDRESS=your_contract_address_here
```

### 4. Deploy Smart Contracts

```bash
# Compile contracts
npm run compile

# Deploy to Sepolia (requires PRIVATE_KEY in .env.local)
npm run deploy
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📁 Project Structure

```
clear-identity/
├── contracts/           # Smart contracts
│   └── ClearIdentity.sol
├── scripts/            # Deployment scripts
│   └── deploy.ts
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── lib/           # Utilities and configurations
│   └── assets/        # Static assets
├── public/            # Public assets
└── hardhat.config.ts  # Hardhat configuration
```

## 🔐 Smart Contract Features

The ClearIdentity smart contract provides:

- **Encrypted Profile Management**: Create and manage identity profiles with FHE encryption
- **Attribute Verification**: Add and verify identity attributes privately
- **Access Control**: Grant and revoke access to identity data
- **Reputation System**: Build reputation through verified attributes
- **Audit Trail**: Track all access and verification activities

### Key Functions

- `createProfile()`: Create a new encrypted identity profile
- `addAttribute()`: Add encrypted identity attributes
- `requestVerification()`: Request verification for attributes
- `processVerification()`: Process verification requests (verifiers only)
- `grantAccess()`: Grant access to specific identity data
- `decryptAge()`: Decrypt age information (authorized users only)

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at the provided URL

### Manual Deployment Steps

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npx vercel --prod
   ```

3. **Configure Domain** (Optional)
   - Add custom domain in Vercel dashboard
   - Update DNS settings as instructed

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run compile` - Compile smart contracts
- `npm run test` - Run contract tests
- `npm run deploy` - Deploy contracts to Sepolia

### Smart Contract Development

```bash
# Start local Hardhat node
npx hardhat node

# Deploy to local network
npm run deploy -- --network localhost

# Run tests
npm run test
```

## 🔒 Security Considerations

- **Private Key Management**: Never commit private keys to version control
- **Environment Variables**: Use secure environment variable management
- **FHE Implementation**: Ensure proper FHE key management
- **Access Control**: Implement proper access controls for sensitive functions
- **Audit Trail**: Maintain comprehensive logs of all operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Zama](https://zama.ai/) for FHE technology
- [RainbowKit](https://rainbowkit.com/) for wallet integration
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Hardhat](https://hardhat.org/) for smart contract development

## 📞 Support

For support and questions:
- Create an issue in this repository
- Join our community discussions
- Contact the development team

---

**Built with ❤️ using FHE technology for a more private and secure digital future.**
