import { ethers } from "hardhat";

async function main() {
  console.log("Starting ClearIdentity contract deployment...");

  // Get the contract factory
  const ClearIdentity = await ethers.getContractFactory("ClearIdentity");

  // Deploy the contract with admin address (using deployer as admin for now)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const clearIdentity = await ClearIdentity.deploy(deployer.address);

  await clearIdentity.waitForDeployment();

  const contractAddress = await clearIdentity.getAddress();
  console.log("ClearIdentity deployed to:", contractAddress);

  // Verify deployment
  console.log("Verifying deployment...");
  const owner = await clearIdentity.owner();
  const admin = await clearIdentity.admin();
  
  console.log("Contract owner:", owner);
  console.log("Contract admin:", admin);
  console.log("Deployer address:", deployer.address);

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    owner,
    admin,
    deployer: deployer.address,
    network: "sepolia",
    timestamp: new Date().toISOString(),
  };

  console.log("\n=== Deployment Summary ===");
  console.log("Contract Address:", contractAddress);
  console.log("Owner:", owner);
  console.log("Admin:", admin);
  console.log("Deployer:", deployer.address);
  console.log("Network: Sepolia");
  console.log("Timestamp:", deploymentInfo.timestamp);

  console.log("\n=== Next Steps ===");
  console.log("1. Update your .env file with the contract address:");
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("2. Verify the contract on Etherscan (optional):");
  console.log(`   npx hardhat verify --network sepolia ${contractAddress} "${admin}"`);
  console.log("3. Test the contract functions");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
