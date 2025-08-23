import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { View, Text } from '@/components/Themed';
import { styles } from './style';
import { Button, Image, Touchable, TouchableOpacity } from 'react-native';

interface SuperheroPreviewProps {
    heroName: string;
    realName: string;
    imageUrl: string;
    powerRate: number;
}

export default function SuperheroPreview({ heroName, realName, imageUrl, powerRate }: SuperheroPreviewProps) {

    const TextName = (heroName: string, name: string) => {
        if (heroName) return <Text style={styles.name}>{heroName}</Text>;
        return <Text style={styles.name}>Unknown</Text>;
    };

    const TextRealName = (realName: string) => {
        if (realName) return <Text style={styles.realName}>{realName}</Text>;
        return <Text style={styles.realName}>Unknown</Text>;
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.imagePreview}
            />
            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => {
                    // handle heart press here
                }}
            >
                <MaterialIcons name="favorite" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.informationContainer}>
                {TextName(heroName, realName)}
                {TextRealName(realName)}
                <View style={styles.powerRateContainer}>
                    <Ionicons name="hand-left" size={16} />
                    <Text style={styles.powerRate}>{powerRate}</Text>
                    <Text style={styles.percentage}>/100</Text>
                </View>
            </View>
        </View>
    );
}
