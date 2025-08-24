import { FlatList } from 'react-native';
import { JSX } from 'react';

import { View, Text } from '../Themed';
import { ItemSeparator } from '../ItemSeparator';
import { styles } from './style';

interface ItemListProps<T extends { id: number | string }> {
    items: T[] | undefined;
    RenderItem: ({ item }: { item: T }) => JSX.Element;
}

export function ItemList<T extends { id: number | string }>({ items, RenderItem }: ItemListProps<T>) {
    if (!items || items.length === 0) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>No results found</Text>
            <Text style={{ color: 'white', fontSize: 16 }}>Try searching for another name</Text>
        </View>
        );
    }
      
    return (
    <FlatList
        style={styles.superheroesContainer}
        data={items}
        keyExtractor={(item: T) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RenderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
    />
    );
}