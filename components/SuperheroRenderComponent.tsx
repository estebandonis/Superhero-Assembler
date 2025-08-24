import { hero } from "@/types";
import SuperheroPreview from "./SuperheroPreview";

export default function SuperheroRenderComponent ({ item, onPress }: { item: hero, onPress: () => void } ) {
    return (
        <SuperheroPreview
            hero={item}
            onPress={onPress}
        />
    );
}