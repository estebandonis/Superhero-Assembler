import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';

import { 
  ItemList,
  LoadingComponent,
  TitleAndInput,
  SuperheroPreview
} from '@/components';
import { hero } from '@/types';
import { styles } from './style';
import { filteredHeroes } from '@/utils';

interface SuperheroListProps {
    title: string;
    heroes: hero[] | undefined;
    isLoading: boolean;
    isError: boolean;
}

export function SuperheroList({ title, heroes, isLoading, isError }: SuperheroListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const filtered = useMemo(() => filteredHeroes(heroes, searchTerm), [heroes, searchTerm]);
    
    if (!heroes || isLoading) {
      return (
        <LoadingComponent />
      );
    }

    const handleSuperHeroPress = (hero: hero) => {
      router.push({
          pathname: '/hero_details',
          params: { id: hero.id, }
      })
    };

    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <TitleAndInput title={title} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ItemList items={filtered} RenderItem={({ item }) => <SuperheroPreview hero={item} onPress={() => handleSuperHeroPress(item)} />} />
      </SafeAreaView>
    );
}
