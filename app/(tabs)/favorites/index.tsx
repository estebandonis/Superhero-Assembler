
import { Text, View } from '@/components/Themed';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SuperheroList } from '@/pages/SuperheroList';
import { useFetchHeroes } from '@/api/superheroes';
import { useMemo } from 'react';

export default function FavoritesScreen() {
  const { data: heroes, isLoading, isError } = useFetchHeroes();

  const favoriteHeroes = useMemo(() => heroes?.filter(hero => hero.favorite), [heroes]);

  return (
    <SuperheroList title='Favorites' heroes={favoriteHeroes} isLoading={isLoading} isError={isError} />
  );
}
