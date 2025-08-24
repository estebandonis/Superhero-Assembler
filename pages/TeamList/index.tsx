import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';

import { View, Text, RoundedButtonWithIcon, ItemList, TeamPreview, CreateTeamModal, LoadingComponent } from '@/components';
import { useAddTeam, useFetchTeams } from '@/api';
import { styles } from './style';
import { team } from '@/types';
import { useState } from 'react';

const renderItem = ({ item }: { item: team }) => (
  <TeamPreview id={item.id} title={item.name} membersCount={0} />
);

export default function TeamList() {
  const { data: teams, isLoading, isError } = useFetchTeams();
  const { mutate: createTeam, isPending } = useAddTeam();

  const [isModalVisible, setModalVisible] = useState(false);

  if (isLoading) {
    return (
      <LoadingComponent />
    );
  }

  const handleCreateTeam = (teamName: string) => {
    createTeam({ name: teamName, members: [] });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Team</Text>
          <RoundedButtonWithIcon 
            icon={
                <FontAwesome6 name="plus" size={14} color="white" />
            } 
            onPress={() => {
                setModalVisible(true);
            }}
          />
        </View>
        <ItemList items={teams} RenderItem={renderItem} />
        <CreateTeamModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onCreate={handleCreateTeam}
          isLoading={isPending}
        />
    </SafeAreaView>
  );
}
