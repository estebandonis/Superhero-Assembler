import { hero } from "@/types";
import SuperheroPreview from "./SuperheroPreview";

export default function SuperheroRenderComponent ({ item }: { item: hero }) {
    return (
        <SuperheroPreview
            hero={item}
        />
    );
}