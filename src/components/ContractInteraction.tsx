import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, User, Key, Eye } from 'lucide-react';
import { toast } from 'sonner';

// Contract ABI for ClearIdentity contract
const CLEAR_IDENTITY_ABI = [
  {
    "inputs": [
      { "name": "_publicName", "type": "string" },
      { "name": "_publicBio", "type": "string" },
      { "name": "_age", "type": "bytes" },
      { "name": "_ageProof", "type": "bytes" }
    ],
    "name": "createProfile",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_profileId", "type": "uint256" },
      { "name": "_attributeType", "type": "uint256" },
      { "name": "_publicLabel", "type": "string" },
      { "name": "_encryptedData", "type": "bytes" },
      { "name": "_dataProof", "type": "bytes" },
      { "name": "_isPrivate", "type": "bool" }
    ],
    "name": "addAttribute",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_profileId", "type": "uint256" },
      { "name": "_attributeId", "type": "uint256" },
      { "name": "_verificationData", "type": "bytes" },
      { "name": "_dataProof", "type": "bytes" }
    ],
    "name": "requestVerification",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "_profileId", "type": "uint256" },
      { "name": "_publicName", "type": "string" },
      { "name": "_publicBio", "type": "string" }
    ],
    "name": "updateProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

interface ContractInteractionProps {
  contractAddress?: string;
}

export function ContractInteraction({ contractAddress }: ContractInteractionProps) {
  const { address, isConnected } = useAccount();
  const [profileName, setProfileName] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [attributeLabel, setAttributeLabel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Mock FHE encryption function (in real implementation, this would use FHEVM)
  const mockFHEEncrypt = (data: string): string => {
    // This is a mock - in real implementation, use FHEVM to encrypt data
    return `0x${Buffer.from(data).toString('hex')}`;
  };

  const handleCreateProfile = async () => {
    if (!isConnected || !contractAddress) {
      toast.error('Please connect wallet and ensure contract is deployed');
      return;
    }

    if (!profileName.trim()) {
      toast.error('Profile name is required');
      return;
    }

    setIsLoading(true);
    try {
      // Mock encrypted age data (in real implementation, this would be properly encrypted)
      const encryptedAge = mockFHEEncrypt('25');
      const ageProof = mockFHEEncrypt('proof');

      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: CLEAR_IDENTITY_ABI,
        functionName: 'createProfile',
        args: [profileName, profileBio || '', encryptedAge, ageProof],
      });

      toast.success('Profile creation transaction submitted!');
    } catch (err) {
      console.error('Error creating profile:', err);
      toast.error('Failed to create profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAttribute = async () => {
    if (!isConnected || !contractAddress) {
      toast.error('Please connect wallet and ensure contract is deployed');
      return;
    }

    if (!attributeLabel.trim()) {
      toast.error('Attribute label is required');
      return;
    }

    setIsLoading(true);
    try {
      // Mock encrypted attribute data
      const encryptedData = mockFHEEncrypt('attribute_data');
      const dataProof = mockFHEEncrypt('proof');

      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: CLEAR_IDENTITY_ABI,
        functionName: 'addAttribute',
        args: [0, 1, attributeLabel, encryptedData, dataProof, true], // profileId: 0, attributeType: 1 (email)
      });

      toast.success('Attribute addition transaction submitted!');
    } catch (err) {
      console.error('Error adding attribute:', err);
      toast.error('Failed to add attribute');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!isConnected || !contractAddress) {
      toast.error('Please connect wallet and ensure contract is deployed');
      return;
    }

    setIsLoading(true);
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: CLEAR_IDENTITY_ABI,
        functionName: 'updateProfile',
        args: [0, profileName, profileBio], // profileId: 0
      });

      toast.success('Profile update transaction submitted!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Contract Interaction
          </CardTitle>
          <CardDescription>
            Connect your wallet to interact with the Clear Identity smart contract
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Please connect your wallet to continue</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Transaction Status */}
      {hash && (
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              {isConfirming ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span>Transaction pending...</span>
                </>
              ) : isConfirmed ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Transaction confirmed!</span>
                </>
              ) : (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span>Transaction submitted</span>
                </>
              )}
              <Badge variant="outline" className="ml-auto">
                {hash.slice(0, 10)}...
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span>Transaction failed: {error.message}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Create Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Create Identity Profile
            </CardTitle>
            <CardDescription>
              Create a new encrypted identity profile on-chain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="profileName">Profile Name *</Label>
              <Input
                id="profileName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your public name"
              />
            </div>
            <div>
              <Label htmlFor="profileBio">Profile Bio</Label>
              <Textarea
                id="profileBio"
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                placeholder="Enter your public bio"
                rows={3}
              />
            </div>
            <Button
              onClick={handleCreateProfile}
              disabled={isPending || isLoading || !profileName.trim()}
              className="w-full"
            >
              {isPending || isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                'Create Profile'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Add Attribute */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Add Identity Attribute
            </CardTitle>
            <CardDescription>
              Add encrypted attributes to your identity profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="attributeLabel">Attribute Label *</Label>
              <Input
                id="attributeLabel"
                value={attributeLabel}
                onChange={(e) => setAttributeLabel(e.target.value)}
                placeholder="e.g., Email, Phone, Address"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>• Data will be encrypted using FHE</p>
              <p>• Only you can decrypt your data</p>
              <p>• Verification can be requested later</p>
            </div>
            <Button
              onClick={handleAddAttribute}
              disabled={isPending || isLoading || !attributeLabel.trim()}
              className="w-full"
              variant="outline"
            >
              {isPending || isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Attribute...
                </>
              ) : (
                'Add Attribute'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Update Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Update Profile Information</CardTitle>
          <CardDescription>
            Update your public profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="updateName">Profile Name</Label>
              <Input
                id="updateName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your public name"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="updateBio">Profile Bio</Label>
              <Input
                id="updateBio"
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                placeholder="Enter your public bio"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleUpdateProfile}
                disabled={isPending || isLoading}
                variant="secondary"
              >
                {isPending || isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Update'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contract Info */}
      {contractAddress && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Contract Address</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {contractAddress}
                </p>
              </div>
              <Badge variant="secondary">Sepolia Testnet</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
