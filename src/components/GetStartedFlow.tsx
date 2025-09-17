import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Upload, Shield, Key } from 'lucide-react';

interface GetStartedFlowProps {
  children: React.ReactNode;
}

export function GetStartedFlow({ children }: GetStartedFlowProps) {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Connect Your Wallet",
      description: "Connect your Web3 wallet to begin the identity verification process",
      icon: Key,
      action: "Connect Wallet"
    },
    {
      id: 2,
      title: "Upload KYC Documents",
      description: "Securely upload your identity documents for FHE encryption",
      icon: Upload,
      action: "Upload Documents"
    },
    {
      id: 3,
      title: "Generate Encrypted Proof",
      description: "Create your encrypted identity proof that can be verified without exposure",
      icon: Shield,
      action: "Generate Proof"
    }
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      setIsOpen(false);
      setStep(1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Get Started with FHE Identity</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress indicators */}
          <div className="flex justify-center space-x-2">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`w-3 h-3 rounded-full ${
                  s.id <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Current step */}
          <Card className="p-6 text-center space-y-4">
            <div className="flex justify-center">
              {step <= steps.length ? (
                (() => {
                  const IconComponent = steps[step - 1].icon;
                  return <IconComponent className="w-12 h-12 text-primary" />;
                })()
              ) : (
                <CheckCircle className="w-12 h-12 text-green-500" />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {step <= steps.length ? steps[step - 1].title : "Setup Complete!"}
              </h3>
              <p className="text-muted-foreground">
                {step <= steps.length 
                  ? steps[step - 1].description 
                  : "Your encrypted identity is ready for verification"
                }
              </p>
            </div>

            <Button onClick={handleNext} className="w-full">
              {step <= steps.length ? steps[step - 1].action : "Start Using FHE Identity"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}