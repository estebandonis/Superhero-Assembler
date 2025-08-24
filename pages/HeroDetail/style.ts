import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const styles = StyleSheet.create({
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
