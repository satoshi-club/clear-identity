import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
}

export function FeatureCard({ icon: Icon, title, description, highlight }: FeatureCardProps) {
  return (
    <Card className={`p-6 h-full ${highlight ? 'holographic-border' : ''} id-card hover:scale-105 transition-transform duration-300`}>
      <div className="space-y-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          highlight ? 'holographic' : 'bg-secondary'
        }`}>
          <Icon className={`w-6 h-6 ${highlight ? 'text-black' : 'text-primary'}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}