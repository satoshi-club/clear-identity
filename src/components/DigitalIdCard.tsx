import { useAccount } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, CheckCircle, Clock, Fingerprint } from 'lucide-react';

interface IdentityData {
  name: string;
  verified: boolean;
  encryptionLevel: string;
  issueDate: string;
  expiryDate: string;
}

export function DigitalIdCard() {
  const { address, isConnected } = useAccount();

  const mockIdentity: IdentityData = {
    name: "Alex Chen",
    verified: true,
    encryptionLevel: "FHE-256",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15"
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto p-8 text-center id-card">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Fingerprint className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Connect Wallet</h3>
          <p className="text-sm text-muted-foreground">
            Connect your wallet to view your encrypted identity proof
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto id-card holographic-border shimmer overflow-hidden">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 status-encrypted" />
            <span className="text-sm font-semibold holographic-text">
              ENCRYPTED ID
            </span>
          </div>
          <Badge className="holographic text-black font-semibold">
            {mockIdentity.encryptionLevel}
          </Badge>
        </div>

        {/* Avatar Section */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-black">
            {mockIdentity.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-xl font-bold">{mockIdentity.name}</h3>
            <div className="flex items-center justify-center gap-2 mt-1">
              <CheckCircle className="w-4 h-4 status-verified" />
              <span className="text-sm status-verified font-semibold">
                Identity Verified
              </span>
            </div>
          </div>
        </div>

        {/* Verification Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Wallet Address</span>
            <span className="font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Encryption</span>
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 status-encrypted" />
              <span className="status-encrypted font-semibold">FHE Secured</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Issue Date</span>
            <span>{mockIdentity.issueDate}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Valid Until</span>
            <span>{mockIdentity.expiryDate}</span>
          </div>
        </div>

        {/* Security Level */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Security Level</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-4 rounded-sm ${
                    level <= 5 ? 'holographic' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Maximum encryption with zero-knowledge proofs
          </p>
        </div>
      </div>
    </Card>
  );
}