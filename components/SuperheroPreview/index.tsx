import { HandFist } from 'lucide-react-native';

import { View, Text } from '@/components/Themed';
import { styles } from './style';

interface SuperheroPreviewProps {
    name: string;
    description: string;
}

export default function SuperheroPreview({ name, description }: SuperheroPreviewProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}
