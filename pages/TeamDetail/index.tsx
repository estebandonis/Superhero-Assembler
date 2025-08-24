import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { useMemo, useState } from "react";

import { View, Text, RoundedButtonWithIcon, LoadingComponent, ItemList, SuperheroRenderComponent, AddHeroModal } from "@/components";
import { styles } from "./style";
import { useFetchHeroes, useFetchTeams } from "@/api";
import { FontAwesome6 } from "@expo/vector-icons";

export default function TeamDetail() {
    const { data: teams, isLoading, isError } = useFetchTeams();
    const { data: heroes, isLoading: isLoadingHeroes, isError: isErrorHeroes } = useFetchHeroes();

    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [isModalVisible, setIsModalVisible] = useState(false);
    
    if (isLoading) {
        return <LoadingComponent />;
    }

    const selectedTeamMembers = [1, 2, 3];

    const selectedTeam = useMemo(() => teams?.find((team) => team.id === Number(id)), [teams, id]);
    const selectedHeroes = useMemo(() => heroes?.filter((hero) => selectedTeamMembers.includes(hero.id)), [heroes, selectedTeamMembers]);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
                <RoundedButtonWithIcon icon={<FontAwesome6 name="arrow-left" size={14} color="white" />} onPress={() => router.back()} />
                <Text style={styles.title}>{selectedTeam?.name}</Text>
            </View>
            <RoundedButtonWithIcon icon={<FontAwesome6 name="plus" size={14} color="white" />} onPress={() => setIsModalVisible(true)} />
        </View>

        <ItemList items={selectedHeroes} RenderItem={SuperheroRenderComponent} />

        <AddHeroModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </SafeAreaView>
  );
}