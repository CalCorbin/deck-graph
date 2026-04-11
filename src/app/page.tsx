import { NavigationBar } from '@/app/components/NavigationBar/NavigationBar';
import { NetworkGraph } from '@/app/components/NetworkGraph/NetworkGraph';

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <NetworkGraph />
    </main>
  );
}
