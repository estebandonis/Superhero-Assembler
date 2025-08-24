import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, TouchableWithoutFeedback, View as RNView, KeyboardAvoidingView, Platform } from "react-native";

import SuperheroRenderComponent from "../SuperheroRenderComponent";
import { ItemList } from "../ItemList";
import { styles } from "./style";
import TitleAndInput from "../TitleAndInput";
import { View } from "../Themed";
import { useFetchHeroes } from "@/api";
import { filteredHeroes } from "@/utils";

export default function AddHeroModal({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { data: heroes, isLoading } = useFetchHeroes();

    const filtered = useMemo(() => filteredHeroes(heroes, searchTerm), [heroes, searchTerm]);

    return (
        <Modal
            visible={isVisible}
            onRequestClose={onClose}
            animationType="slide"
            transparent
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <RNView style={styles.overlay} />
            </TouchableWithoutFeedback>

            <View style={styles.sheetWrapper}>
                <SafeAreaView style={styles.sheetContainer}>
                    <TitleAndInput title="Add Hero" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </SafeAreaView>
            </View>

            <ItemList items={filtered} RenderItem={SuperheroRenderComponent} />
        </Modal>
    );
}