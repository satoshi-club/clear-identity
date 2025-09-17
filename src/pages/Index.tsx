import { WalletConnect } from '@/components/WalletConnect';
import { DigitalIdCard } from '@/components/DigitalIdCard';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye, Zap, Globe, Users } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold holographic-text">FHE Identity</span>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Holographic background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Identity Secured by{' '}
              <span className="holographic-text">FHE</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Prove your identity without exposing sensitive data. Our Fully Homomorphic 
              Encryption ensures your KYC information remains private while being verifiable on-chain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="holographic text-black font-semibold hover:scale-105 transition-transform">
                Get Started
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital ID Card Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Your Digital Identity,{' '}
                <span className="holographic-text">Encrypted</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Experience the future of identity verification with holographic security 
                features and zero-knowledge proofs. Your data stays encrypted while 
                remaining fully verifiable.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 status-encrypted" />
                  <span>End-to-end FHE encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 status-verified" />
                  <span>Zero-knowledge verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Compliance without exposure</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <DigitalIdCard />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Why Choose <span className="holographic-text">FHE Identity</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Revolutionary encryption technology meets seamless user experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Lock}
              title="Fully Homomorphic Encryption"
              description="Compute on encrypted data without ever decrypting it. Your sensitive information remains protected at all times."
              highlight
            />
            <FeatureCard
              icon={Zap}
              title="Instant Verification"
              description="Verify identity proofs in milliseconds while maintaining complete privacy and regulatory compliance."
            />
            <FeatureCard
              icon={Globe}
              title="Cross-Chain Compatible"
              description="Works across multiple blockchain networks, ensuring your identity is portable and universally verifiable."
            />
            <FeatureCard
              icon={Users}
              title="Enterprise Ready"
              description="Built for scale with enterprise-grade security features and compliance with global regulations."
            />
            <FeatureCard
              icon={Shield}
              title="Zero-Knowledge Proofs"
              description="Prove statements about your data without revealing the underlying information."
            />
            <FeatureCard
              icon={Eye}
              title="Privacy First"
              description="Your data never leaves your control. Verification happens without data exposure."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold holographic-text">FHE Identity</span>
            </div>
            <p className="text-muted-foreground">
              Securing digital identities with the power of Fully Homomorphic Encryption
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
