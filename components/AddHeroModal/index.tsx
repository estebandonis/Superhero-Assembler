import { Modal, TouchableWithoutFeedback } from "react-native";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import SuperheroRenderComponent from "../SuperheroRenderComponent";
import { ItemList } from "../ItemList";
import { styles } from "./style";
import TitleAndInput from "../TitleAndInput";
import { View } from "../Themed";
import { useFetchHeroes } from "@/api";
import { filteredHeroes } from "@/utils";
import { hero } from "@/types/models";
import { RoundedButtonWithIcon } from "../Buttons";
import { FontAwesome6 } from "@expo/vector-icons";
import SuperheroPreview from "../SuperheroPreview";
import LoadingComponent from "../LoadingComponent";

const renderComponent = ({ item, onPressHero, onPressAdd }: { item: hero, onPressHero: (id: number) => void, onPressAdd: (id: number) => void }) => (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: 'transparent' }}>
        <SuperheroPreview hero={item} onPress={() => onPressHero(item.id)} showFavorite={false} />
        <RoundedButtonWithIcon icon={<FontAwesome6 name="plus" color="white" />} onPress={() => onPressAdd(item.id)} />
    </View>
);

export default function AddHeroModal({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();

    const { data: heroes, isLoading } = useFetchHeroes();

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

    const handleAddPress = (id: number) => {
        console.log(`Add hero with id: ${id}`);
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
                    <ItemList items={filtered} RenderItem={({ item }) => renderComponent({ item, onPressHero: handleHeroPress, onPressAdd: handleAddPress })} />
                </SafeAreaView>
            </View>
        </Modal>
    );
}