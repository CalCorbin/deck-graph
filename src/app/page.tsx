import { NavigationBar } from '@/app/components/layout/NavigationBar/NavigationBar';
import { NetworkGraph } from '@/app/components/ui/NetworkGraph/NetworkGraph';

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <NetworkGraph />
    </main>
  );
}
