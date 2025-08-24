import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useMemo } from "react"

import { Text, View, RoundedButtonWithIcon, LoadingComponent } from "@/components";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { useFetchHeroes, useSetHeroFavorite } from "@/api";
import { styles } from "./style";

interface HeroDetailProps {
    id: number;
}

export default function HeroDetail({ id }: HeroDetailProps) {
    const router = useRouter();
    const { data: heroes, isLoading } = useFetchHeroes();
    const { mutate: setHeroFavorite } = useSetHeroFavorite();

    if (isLoading) {
        return <LoadingComponent />;
    }

    const selecteHero = useMemo(() => 
        heroes?.find((hero) => hero.id === Number(id))
    , [heroes, id]);

    if (!selecteHero) {
        return <Text>Hero not found</Text>;
    }

    const Stat = ({ label, value }: { label: string; value: number }) => (
        <View style={styles.statContainer}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );

    const PowerStats = ({ powerStats }: { powerStats: { [key: string]: number } }) => {
        if (powerStats && Object.keys(powerStats).length > 0) {
            return (
                <View style={styles.statsContainer}>
                    <Text style={styles.statLabel}>Power Stats:</Text>
                    {Object.entries(powerStats).map(([key, value]) => (
                        <Stat key={key} label={key} value={value} />
                    ))}
                </View>
            );
        }
        return null;
    };

    const AlterEgos = ({ alterEgos }: { alterEgos: string[] }) => (
        <View style={styles.statsContainer}>
            <Text style={styles.statLabel}>Alter Egos:</Text>
            <Text style={styles.statValue}>{typeof alterEgos !== "string" && alterEgos.length > 0 ? alterEgos.join(", ") : "None"}</Text>
        </View>
    );

    const ImageSection = ({ uri }: { uri: string }) => (
        <View>
            <RoundedButtonWithIcon
                icon={
                    <FontAwesome6
                        name="arrow-left"
                        size={16}
                        color="white"
                    />
                }
                onPress={() => {
                    router.back();
                }}
                style={styles.backButton}
            />
            <RoundedButtonWithIcon
                icon={
                    <FontAwesome6
                        solid={selecteHero.favorite ? true : false}
                        name="heart"
                        size={16}
                        color="white"
                    />
                }
                onPress={() => {
                    setHeroFavorite({ id: selecteHero.id, favorite: !selecteHero.favorite });
                }}
                style={styles.favoriteButton}
            />
            <Image
                source={{ uri }}
                style={styles.image}
                loadingIndicatorSource={require("@/assets/images/adaptive-icon.png")}
            />
        </View>
    );

    return (
        <SafeAreaView edges={['left']} style={styles.mainContainer}>
            <ImageSection uri={selecteHero.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.mainText}>Alias: {selecteHero.alias}</Text>
                <View style={styles.subTextsContainer}>
                    <Text style={styles.secondaryText}>Real Name:
                        <Text style={{...styles.secondaryText, fontWeight: 'bold'}}>
                            {" "}{selecteHero.fullName}
                        </Text>
                    </Text>
                    <AlterEgos alterEgos={selecteHero.alterEgos} />
                </View>
                <PowerStats powerStats={selecteHero.powerStats} />
                <View style={styles.averageScoreContainer}>
                    <Ionicons name="star" size={12} color="gold" />
                    <Text style={styles.averageScoreText}>Avg.Score:
                        <Text style={{...styles.secondaryText, fontWeight: 'bold'}}>
                            {" "}{selecteHero.powerLevel}
                        </Text>
                        /100
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}