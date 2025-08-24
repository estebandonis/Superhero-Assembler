import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';

import { 
  ItemList,
  SuperheroRenderComponent,
  LoadingComponent,
  TitleAndInput
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
    
    const filtered = useMemo(() => filteredHeroes(heroes, searchTerm), [heroes, searchTerm]);
    
    if (!heroes || isLoading) {
      return (
        <LoadingComponent />
      );
    }

    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <TitleAndInput title={title} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ItemList items={filtered} RenderItem={SuperheroRenderComponent} />
      </SafeAreaView>
    );
}
