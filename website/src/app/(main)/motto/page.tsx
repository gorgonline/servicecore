import { Metadata } from 'next';
import mottoData from '@/data/motto.json';
// import { MotionDiv, MotionH1, MotionSection } from '@/components/ui/motion-elements'; // Not used and file missing

export const metadata: Metadata = {
  title: 'ServiceCore Tasarım ve Uygulama Felsefesi | Manifestomuz',
  description: 'ServiceCore\'un ITSM mühendisliği, ITIL4 uyumu ve Kaizen ruhuyla şekillenen tasarım ve uygulama ilkelerini keşfedin. Sezgisel sadelik ve işlevsel estetik.',
};

// Using Client Component wrapper for animations inside the page
import MottoContent from './motto-content';

export default function MottoPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) text-white pt-24 pb-32">
      <MottoContent data={mottoData} />
    </main>
  );
}
