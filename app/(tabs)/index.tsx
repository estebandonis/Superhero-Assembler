import { useFetchHeroes } from '@/api';
import { SuperheroList } from '@/pages/SuperheroList';

export default function SuperHeroesScreen() {
  const { data: heroes, isLoading, isError } = useFetchHeroes();

  return (
    <SuperheroList title='Superheroes' heroes={heroes} isLoading={isLoading} isError={isError} />
  );
}
