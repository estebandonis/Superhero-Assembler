import { MaterialIcons, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { RoundedButtonWithIcon } from '../Buttons';
import { useSetHeroFavorite } from '@/api';
import { View, Text } from '../Themed';
import { styles } from './style';
import { hero } from '@/types';

interface SuperheroPreviewProps {
    hero: hero
}

export default function SuperheroPreview({ hero }: SuperheroPreviewProps) {

    const { mutate: setHeroFavorite } = useSetHeroFavorite();

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
                loadingIndicatorSource={require("@/assets/images/adaptive-icon.png")}
            />
            <RoundedButtonWithIcon
                style={styles.favoriteButton}
                icon={
                    <FontAwesome6
                        solid={hero.favorite ? true : false}
                        name="heart"
                        size={16}
                        color="white"
                    />
                }
                onPress={() => {
                    setHeroFavorite({ id: hero.id, favorite: !hero.favorite });
                }}
            />
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
