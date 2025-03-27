import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { SortButton } from "@/components/SortButton";
import { ThemedText } from "@/components/ThemedText";
import { getPokemonId } from "@/functions/pokemon";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

export default function Index() {
	const colors = useThemeColors();
	const { data, isFetching, fetchNextPage } =
		useInfiniteFetchQuery("/pokemon?limit=21");
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState<"id" | "name">("id");
	const pokemons =
		data?.pages.flatMap((page) =>
			page.results.map((p) => ({ name: p.name, id: getPokemonId(p.url) })),
		) ?? [];
	const filteredPokemons = pokemons
		.filter(
			(pokemon) =>
				pokemon.name.includes(search.toLowerCase()) ||
				pokemon.id.toString().includes(search),
		)
		.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));

	return (
		<RootView>
			<Row style={styles.header} gap={16}>
				<Image
					source={require("@/assets/images/pokeball.png")}
					width={24}
					height={24}
				/>
				<ThemedText variant="headline" color="grayWhite">
					Pokédex
				</ThemedText>
			</Row>
			<Row style={styles.search} gap={16}>
				<SearchBar value={search} onChange={setSearch} />
				<SortButton value={sortBy} onChange={setSortBy} />
			</Row>
			<Card style={styles.body}>
				<FlatList
					keyExtractor={(pkmn) => pkmn.id.toString()}
					data={filteredPokemons}
					numColumns={3}
					columnWrapperStyle={styles.gridGap}
					contentContainerStyle={styles.gridGap}
					style={styles.list}
					ListFooterComponent={
						isFetching ? <ActivityIndicator color={colors.tint} /> : null
					}
					onEndReached={search ? undefined : () => fetchNextPage()}
					renderItem={({ item: pkmn }) => (
						<PokemonCard
							id={pkmn.id}
							name={pkmn.name}
							style={{ flex: 1 / 3 }}
						/>
					)}
				/>
			</Card>
		</RootView>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 12,
		paddingBottom: 8,
	},
	search: {
		paddingHorizontal: 12,
	},
	body: {
		flex: 1,
		marginTop: 16,
	},
	gridGap: {
		gap: 8,
	},
	list: {
		padding: 12,
	},
});
