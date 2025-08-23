import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Text, View } from "@/components";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function HeroDetailsPage() {
    const router = useRouter();

    const powerStats = {
        intelligence: 75,
        strength: 100,
        speed: 60,
        durability: 90,
        power: 80,
        combat: 85
    }

    const Stat = ({ label, value }: { label: string; value: number }) => (
        <View style={styles.statContainer}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );

    return (
        <SafeAreaView edges={['left']} style={styles.mainContainer}>
            <View>
                <Image
                    source={{ uri: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg" }}
                    style={styles.imagePreview}
                />
            </View>
            <Button title="Go Back" onPress={() => router.back()} />

            <View style={styles.detailsContainer}>
                <Text style={styles.mainText}>Alias: A-Bomb</Text>
                <View style={styles.subTextsContainer}>
                    <Text style={styles.secondaryText}>Real Name:
                        <Text style={{...styles.secondaryText, fontWeight: 'bold'}}>
                            {" "}Richard Milhouse Jones
                        </Text>
                    </Text>
                    <Text style={styles.secondaryText}>Alter Egos:
                        <Text style={{...styles.secondaryText, fontWeight: 'bold'}}>
                            {" "}The Hulk
                        </Text>
                    </Text>
                </View>
                <View style={styles.statsContainer}>
                    {Object.entries(powerStats).map(([key, value]) => (
                        <Stat key={key} label={key} value={value} />
                    ))}
                </View>
                <View style={styles.averageScoreContainer}>
                    <Ionicons name="star" size={12} color="gold" />
                    <Text style={styles.averageScoreText}>Avg.Score:
                        <Text style={{...styles.secondaryText, fontWeight: 'bold'}}>
                            {" "}78
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
    imagePreview: {
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
    },
    averageScoreText: {
        color: Colors.dark.text,
        fontSize: 12,
        width: 100,
    },
});
