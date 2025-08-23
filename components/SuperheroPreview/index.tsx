import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { View, Text } from '@/components/Themed';
import { styles } from './style';
import { Button, Image, Touchable, TouchableOpacity } from 'react-native';

interface SuperheroPreviewProps {
    heroName: string[];
    realName: string;
    powerRate: number;
}

export default function SuperheroPreview({ heroName, realName, powerRate }: SuperheroPreviewProps) {

    const TextName = (heroName: string[], name: string) => {
        if (heroName.length > 0) return <Text style={styles.name}>{heroName.slice(0, 1).join(', ')}</Text>;
        return <Text style={styles.name}>Unknown</Text>;
    };

    const TextRealName = (realName: string) => {
        if (realName) return <Text style={styles.realName}>{realName}</Text>;
        return <Text style={styles.realName}>Unknown</Text>;
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://www.cinemascomics.com/wp-content/uploads/2025/04/logo-superman-2025-imagenes.jpg' }}
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
