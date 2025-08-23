import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { Text, View, RoundedButtonWithIcon } from "@/components";
import Colors from "@/constants/Colors";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { useFetchHeroes } from "@/api";
import { use, useEffect, useMemo } from "react";

export default function HeroDetailsPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { data: heroes, isLoading } = useFetchHeroes();

    if (isLoading) {
        return <Text>Loading...</Text>;
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
                    // Handle favorite button press
                }}
                style={styles.favoriteButton}
            />
            <Image
                source={{ uri }}
                style={styles.image}
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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.dark.secondBackground,
    },
    image: {
        width: '100%',
        height: 400,
    },
    detailsContainer: {
        flex: 1,
        padding: 12,
        backgroundColor: 'transparent',
        gap: 16,
    },
    mainText: {
        color: Colors.dark.text,
        fontSize: 35,
        fontWeight: 'bold',
    },
    subTextsContainer: {
        gap: 4,
        backgroundColor: 'transparent',
    },
    secondaryText: {
        color: Colors.dark.text,
        fontSize: 12,
    },
    statsContainer: {
        gap: 10,
        backgroundColor: 'transparent',
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        borderBottomColor: "gray",
        paddingBottom: 6,
        borderBottomWidth: 0.5,
    },
    statLabel: {
        color: Colors.dark.text,
        fontSize: 12,
        width: 100,
    },
    statValue: {
        flex: 1,
        color: Colors.dark.text,
        fontSize: 12,
        fontWeight: 'bold',
    },
    averageScoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        gap: 4,
        width: 150,
    },
    averageScoreText: {
        color: Colors.dark.text,
        fontSize: 12,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 30,
        zIndex: 10,
    },
    favoriteButton: {
        position: 'absolute',
        top: 60,
        right: 30,
        zIndex: 10,
    }
});
