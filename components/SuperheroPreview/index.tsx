import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { View, Text } from '@/components/Themed';
import { styles } from './style';
import { hero } from '@/types';

interface SuperheroPreviewProps {
    hero: hero
}

export default function SuperheroPreview({ hero }: SuperheroPreviewProps) {

    const router = useRouter();

    const TextName = (heroName: string, name: string) => {
        if (heroName) return <Text style={styles.name}>{heroName}</Text>;
        return <Text style={styles.name}>Unknown</Text>;
    };

    const TextRealName = (realName: string) => {
        if (realName) return <Text style={styles.realName}>{realName}</Text>;
        return <Text style={styles.realName}>Unknown</Text>;
    };

    return (
        <TouchableOpacity onPress={() => {
            router.push({
                pathname: '/hero_details',
                params: { id: hero.id, }
            })
        }} style={styles.container}
        >
            <Image
                source={{ uri: hero.imagePreview }}
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
                {TextName(hero.alias, hero.fullName)}
                {TextRealName(hero.fullName)}
                <View style={styles.powerLevelContainer}>
                    <Ionicons name="hand-left" size={16} />
                    <Text style={styles.powerLevel}>{hero.powerLevel}</Text>
                    <Text style={styles.percentage}>/100</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
