import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, CheckCircle } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border holographic-border">
          <CheckCircle className="w-4 h-4 status-verified" />
          <span className="text-sm font-mono">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnect()}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      className="gap-2 holographic text-black font-semibold hover:scale-105 transition-transform"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  );
}