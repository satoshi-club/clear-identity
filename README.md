# Clear Identity

> **Next-Generation Digital Identity Platform**  
> Built with Fully Homomorphic Encryption (FHE) technology for privacy-first identity management

Clear Identity revolutionizes how we think about digital identity by enabling users to manage their personal data with complete privacy while maintaining verifiable credentials on-chain. Experience the future of identity verification where your data stays encrypted yet remains fully functional.

## ✨ Core Capabilities

- **🔐 FHE-Encrypted Data Management**: Store and process personal identity data without ever decrypting it
- **🔍 Zero-Knowledge Verification**: Prove identity attributes without revealing underlying information  
- **⛓️ Blockchain-Native**: Decentralized identity verification on Ethereum Sepolia testnet
- **💼 Enterprise-Grade Security**: Built for scale with compliance-ready architecture
- **🎨 Modern Web3 Experience**: Seamless wallet integration with RainbowKit
- **📱 Responsive Design**: Beautiful holographic UI that works on all devices

## 🏗️ Architecture Overview

### Frontend Layer
- **⚛️ React 18** - Modern component-based UI framework
- **⚡ Vite** - Lightning-fast build tool and dev server
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🧩 shadcn/ui** - High-quality accessible components
- **🌈 RainbowKit** - Multi-wallet connection interface
- **🔗 Wagmi** - Type-safe Ethereum interactions

### Smart Contract Layer
- **📜 Solidity 0.8.24** - FHE-enabled smart contract language
- **🔨 Hardhat** - Development environment and testing framework
- **🔒 FHEVM** - Fully homomorphic encryption virtual machine
- **🛡️ OpenZeppelin** - Battle-tested security standards

### Blockchain Infrastructure
- **🌐 Ethereum Sepolia** - Testnet for development and testing
- **🔐 FHE-Enabled Contracts** - Privacy-preserving smart contracts
- **📦 IPFS Integration** - Decentralized storage capabilities

## 🎯 Getting Started

### Prerequisites Checklist
- [ ] **Node.js 18+** and npm package manager
- [ ] **Git** for version control
- [ ] **Web3 Wallet** (MetaMask, WalletConnect, etc.)
- [ ] **Sepolia ETH** for transaction gas fees

### Quick Setup Guide

#### 1️⃣ Clone & Install
```bash
# Clone the repository
git clone https://github.com/satoshi-club/clear-identity.git
cd clear-identity

# Install dependencies
npm install
```

#### 2️⃣ Environment Configuration
```bash
# Copy environment template
cp env.example .env.local
```

Configure your environment variables in `.env.local`:

```env
# Network Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Integration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Contract Address (after deployment)
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
```

#### 3️⃣ Smart Contract Deployment
```bash
# Compile smart contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy
```

#### 4️⃣ Launch Application
```bash
# Start development server
npm run dev
```

🌐 **Access the application**: `http://localhost:5173`

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

## 🔧 Smart Contract Capabilities

The ClearIdentity smart contract delivers enterprise-grade privacy features:

- **🔐 Encrypted Profile Management**: Create and manage identity profiles with FHE encryption
- **✅ Attribute Verification**: Add and verify identity attributes privately
- **🔑 Access Control**: Granular permissions for identity data access
- **⭐ Reputation System**: Build trust through verified attributes
- **📊 Audit Trail**: Comprehensive logging of all activities

### Core Contract Functions

| Function | Purpose | Access Level |
|----------|---------|--------------|
| `createProfile()` | Initialize encrypted identity profile | Public |
| `addAttribute()` | Add encrypted identity attributes | Profile Owner |
| `requestVerification()` | Request attribute verification | Profile Owner |
| `processVerification()` | Process verification requests | Authorized Verifiers |
| `grantAccess()` | Grant data access permissions | Profile Owner |
| `decryptAge()` | Decrypt age information | Authorized Users |

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **⚙️ Configure Environment Variables**
   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
   VITE_CONTRACT_ADDRESS=your_deployed_contract_address
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
