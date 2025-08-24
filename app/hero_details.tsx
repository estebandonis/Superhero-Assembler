import { useLocalSearchParams } from "expo-router";

import HeroDetail from "@/pages/HeroDetail";

export default function HeroDetailsPage() {
    const { id } = useLocalSearchParams();
    return <HeroDetail id={Number(id)} />;
}
