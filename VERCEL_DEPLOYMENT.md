# Vercel Deployment Guide for Clear Identity

This guide provides step-by-step instructions for deploying the Clear Identity application to Vercel.

## Prerequisites

- GitHub account with access to the `satoshi-club/clear-identity` repository
- Vercel account (free tier available)
- Deployed smart contract address (optional for initial deployment)

## Step-by-Step Deployment

### Step 1: Access Vercel Dashboard

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Sign in with your GitHub account
3. If this is your first time, authorize Vercel to access your GitHub repositories

### Step 2: Create New Project

1. Click the **"New Project"** button
2. In the "Import Git Repository" section, find and select `satoshi-club/clear-identity`
3. Click **"Import"**

### Step 3: Configure Project Settings

1. **Project Name**: `clear-identity` (or your preferred name)
2. **Framework Preset**: Select **"Vite"** from the dropdown
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 4: Environment Variables Configuration

Click **"Environment Variables"** and add the following variables:

#### Required Environment Variables

```
VITE_CHAIN_ID=11155111
```

```
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
```

```
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
```

#### Optional Environment Variables

```
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

```
VITE_RPC_URL=https://1rpc.io/sepolia
```

#### Contract Address (Set after deployment)

```
VITE_CONTRACT_ADDRESS=your_contract_address_here
```

**Note**: Replace `your_contract_address_here` with the actual deployed contract address after smart contract deployment.

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for the deployment to complete (usually 2-5 minutes)
3. Once deployed, you'll see a success message with your deployment URL

### Step 6: Verify Deployment

1. Click on the deployment URL to open your application
2. Test the following features:
   - Wallet connection
   - UI responsiveness
   - Navigation between pages
   - Error handling

## Post-Deployment Configuration

### Step 7: Smart Contract Deployment (Optional)

If you haven't deployed the smart contract yet:

1. **Local Setup**:
   ```bash
   git clone https://github.com/satoshi-club/clear-identity.git
   cd clear-identity
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp env.example .env.local
   # Add your PRIVATE_KEY to .env.local
   ```

3. **Deploy Contract**:
   ```bash
   npm run compile
   npm run deploy
   ```

4. **Update Vercel Environment Variables**:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS` with the deployed contract address
   - Redeploy the application

### Step 8: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **"Domains"** tab
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (up to 24 hours)

## Troubleshooting

### Common Issues

#### Build Failures

**Issue**: Build fails with dependency errors
**Solution**: 
- Check that all dependencies are properly installed
- Ensure Node.js version compatibility
- Review build logs in Vercel dashboard

#### Environment Variables Not Working

**Issue**: Environment variables not accessible in the app
**Solution**:
- Ensure variables are prefixed with `NEXT_PUBLIC_`
- Redeploy after adding new environment variables
- Check variable names for typos

#### Wallet Connection Issues

**Issue**: Wallet connection fails in production
**Solution**:
- Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is correct
- Check that the app is using HTTPS
- Ensure proper network configuration

#### Smart Contract Integration Issues

**Issue**: Contract calls fail
**Solution**:
- Verify contract address is correct
- Check network configuration (Sepolia)
- Ensure contract is deployed and verified

### Performance Optimization

1. **Enable Vercel Analytics**:
   - Go to project settings
   - Enable Vercel Analytics for performance monitoring

2. **Configure Caching**:
   - Add appropriate cache headers for static assets
   - Configure CDN settings for optimal performance

3. **Monitor Performance**:
   - Use Vercel's built-in performance monitoring
   - Set up alerts for performance issues

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to the repository
   - Use Vercel's environment variable management
   - Regularly rotate API keys and tokens

2. **Access Control**:
   - Limit access to Vercel dashboard
   - Use team collaboration features appropriately
   - Monitor deployment logs for suspicious activity

3. **Smart Contract Security**:
   - Verify contracts on Etherscan
   - Use multi-signature wallets for contract deployment
   - Regular security audits

## Monitoring and Maintenance

### Regular Tasks

1. **Monitor Deployments**:
   - Check deployment status regularly
   - Monitor error rates and performance metrics
   - Review user feedback and analytics

2. **Update Dependencies**:
   - Regularly update npm packages
   - Test updates in development before deploying
   - Monitor for security vulnerabilities

3. **Backup and Recovery**:
   - Keep local backups of important configurations
   - Document deployment procedures
   - Test recovery procedures

### Useful Vercel Features

1. **Preview Deployments**: Every pull request gets a preview deployment
2. **Analytics**: Built-in performance and usage analytics
3. **Edge Functions**: For serverless functions (if needed)
4. **Team Collaboration**: Share projects with team members

## Support and Resources

- **Vercel Documentation**: [https://vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [https://vitejs.dev/guide/](https://vitejs.dev/guide/)
- **RainbowKit Documentation**: [https://rainbowkit.com/docs/introduction](https://rainbowkit.com/docs/introduction)
- **Project Issues**: Create issues in the GitHub repository

---

**Deployment URL**: Your app will be available at `https://clear-identity-[random-string].vercel.app` or your custom domain.

**Success Indicators**:
- ✅ Application loads without errors
- ✅ Wallet connection works
- ✅ UI is responsive and functional
- ✅ Smart contract integration works (if deployed)
- ✅ Environment variables are properly configured
