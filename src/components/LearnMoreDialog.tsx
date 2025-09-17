import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Eye, Shield, Zap, Globe, Users } from 'lucide-react';

interface LearnMoreDialogProps {
  children: React.ReactNode;
}

export function LearnMoreDialog({ children }: LearnMoreDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Learn More About FHE Identity</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">What is FHE Identity?</h3>
              <p className="text-muted-foreground mb-4">
                FHE Identity is a revolutionary identity verification system that uses Fully Homomorphic Encryption (FHE) 
                to enable compliance verification without exposing sensitive personal data.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <span>Complete privacy protection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <span>Zero-knowledge verification</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span>Cross-chain compatibility</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span>Instant verification</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="technology" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">How FHE Works</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Fully Homomorphic Encryption</h4>
                  <p className="text-muted-foreground">
                    Allows computations on encrypted data without decrypting it, ensuring your sensitive 
                    information never leaves your control.
                  </p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-semibold">Zero-Knowledge Proofs</h4>
                  <p className="text-muted-foreground">
                    Mathematical proofs that verify statements about your data without revealing the 
                    underlying information.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold">Blockchain Integration</h4>
                  <p className="text-muted-foreground">
                    Immutable verification records stored on-chain while maintaining complete privacy 
                    of personal data.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <Lock className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2">Unbreakable Privacy</h4>
                <p className="text-muted-foreground text-sm">
                  Your personal data remains encrypted at all times, even during verification processes.
                </p>
              </Card>
              <Card className="p-4">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2">Regulatory Compliance</h4>
                <p className="text-muted-foreground text-sm">
                  Meet KYC/AML requirements without compromising user privacy or data security.
                </p>
              </Card>
              <Card className="p-4">
                <Zap className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2">Instant Verification</h4>
                <p className="text-muted-foreground text-sm">
                  Verify identity proofs in milliseconds without complex data processing delays.
                </p>
              </Card>
              <Card className="p-4">
                <Globe className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2">Universal Portability</h4>
                <p className="text-muted-foreground text-sm">
                  Use your encrypted identity across multiple platforms and blockchain networks.
                </p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="use-cases" className="space-y-4">
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">DeFi Protocols</h4>
                <p className="text-muted-foreground">
                  Enable compliant access to decentralized finance while maintaining user anonymity.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">NFT Marketplaces</h4>
                <p className="text-muted-foreground">
                  Verify creator authenticity and buyer eligibility without exposing personal information.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Enterprise Solutions</h4>
                <p className="text-muted-foreground">
                  Corporate identity verification for employee access and partner validation.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Gaming & Metaverse</h4>
                <p className="text-muted-foreground">
                  Age verification and region compliance for virtual worlds and gaming platforms.
                </p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}