import { Modal, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { useRouter } from "expo-router";

import { styles } from "./style";
import { ItemList } from "../ItemList";
import TitleAndInput from "../TitleAndInput";
import SuperheroPreview from "../SuperheroPreview";
import LoadingComponent from "../LoadingComponent";
import { RoundedButtonWithIcon } from "../Buttons";
import { View } from "../Themed";
import { hero } from "@/types/models";
import { filteredHeroes } from "@/utils";
import { useFetchHeroes, useAddHeroToTeam, useDeleteHeroFromTeam } from "@/api";
import { useQueryClient } from "@tanstack/react-query"

interface renderComponentProps {
    item: hero;
    onPressHero: (id: number) => void;
    onPressAdd: (id: number) => void;
    onPressRemove: (id: number) => void;
    alreadyIncluded: boolean;
}

const renderComponent = ({ item, onPressHero, onPressAdd, onPressRemove, alreadyIncluded }: renderComponentProps) => (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: 'transparent' }}>
        <SuperheroPreview hero={item} onPress={() => onPressHero(item.id)} showFavorite={false} />
        {
            alreadyIncluded ? (
                <RoundedButtonWithIcon icon={<FontAwesome6 name="trash" size={18} color="white" />} onPress={() => onPressRemove(item.id)} />
            ) : (
                <RoundedButtonWithIcon icon={<FontAwesome6 name="plus" size={18} color="white" />} onPress={() => onPressAdd(item.id)} />
            )
        }
    </View>
);

interface AddHeroModalProps {
    isVisible: boolean;
    onClose: () => void;
    teamId: number;
    teamMembers: number[];
}

export default function AddHeroModal({ isVisible, onClose, teamId, teamMembers }: AddHeroModalProps) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: heroes, isLoading } = useFetchHeroes();
    const { mutate: heroToTeam, isPending } = useAddHeroToTeam();
    const { mutate: heroFromTeam, isPending: isPendingRemove } = useDeleteHeroFromTeam();

    const filtered = useMemo(() => filteredHeroes(heroes, searchTerm), [heroes, searchTerm]);

    if (isLoading) {
        return (
            <LoadingComponent />
        )
    }

    const handleHeroPress = (id: number) => {
        onClose();
        router.push({
            pathname: '/hero_details',
            params: { id, }
        })
    };

    const handleAddPress = (teamId: number, heroId: number) => {
        heroToTeam({ teamId: teamId, heroId: heroId }, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['teams'],
                });
            }
        });
    };

    const handleDeletePress = (teamId: number, heroId: number) => {
        heroFromTeam({ teamId: teamId, heroId: heroId }, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['teams'],
                });
            }
        });
    };

    return (
        <Modal
            visible={isVisible}
            onRequestClose={onClose}
            animationType="slide"
            transparent
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            <View style={styles.sheetWrapper}>
                <SafeAreaView edges={["top"]} style={styles.sheetContainer}>
                    <TitleAndInput title="Add Hero" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <ItemList
                        items={filtered} RenderItem={({ item }) => renderComponent({ item, onPressHero: handleHeroPress, onPressAdd: (id) => handleAddPress(teamId, id), onPressRemove: (id) => handleDeletePress(teamId, id), alreadyIncluded: teamMembers.includes(item.id) })} />
                </SafeAreaView>
            </View>
        </Modal>
    );
}