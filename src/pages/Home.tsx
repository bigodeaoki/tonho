import { useEffect } from 'react';
import HeroDrop from '../components/home/HeroDrop';
import Lineup from '../components/home/Lineup';
import CollectionsScroll from '../components/home/CollectionsScroll';
import NewIn from '../components/home/NewIn';
import ZoomStory from '../components/home/ZoomStory';
import CalendarIndex from '../components/home/CalendarIndex';
import DropAlert from '../components/home/DropAlert';
import CollectionViewer from '../components/CollectionViewer';
import Marquee from '../components/Marquee';
import { useTheme } from '../context/ThemeContext';
import { useNow } from '../hooks/useNow';
import { countdown, nextDrop } from '../lib/calendar';

export default function Home() {
  const { worn } = useTheme();
  const now = useNow(60_000);
  const next = nextDrop(now);

  useEffect(() => {
    document.title = 'Tonho e Gabi | Roupa de rua em drops';
  }, []);

  return (
    <>
      <HeroDrop />
      <Marquee
        accent
        items={[
          `${worn.name} no ar`,
          next ? `${next.name} em ${countdown(next.launch, now).days} dias` : 'Próximo drop',
          'Frete grátis +R$299',
          'Tiragem curta',
        ]}
      />
      <Lineup />
      <CollectionsScroll />
      <Marquee reverse items={['Quando acaba, não volta', 'Feito no Brasil', 'Troca em 30 dias', 'Drop toda estação']} />
      <CollectionViewer key={worn.id} collection={worn} />
      <NewIn />
      <ZoomStory />
      <CalendarIndex />
      <DropAlert />
    </>
  );
}
