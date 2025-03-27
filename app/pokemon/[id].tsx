import { Card } from "@/components/Card";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { formatWeight, getPokemonArtwork } from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const STATS = {
	hp: "hp",
	attack: "atk",
	defense: "def",
	"special-attack": "satk",
	"special-defense": "sdef",
	speed: "spd",
};

export default function Pokemon() {
	const colors = useThemeColors();
	const params = useLocalSearchParams<{ id: string }>();
	const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
	const { data: species } = useFetchQuery("/pokemon-species/[id]", {
		id: params.id,
	});
	const mainType = pokemon?.types?.[0].type.name;
	const colorType = mainType ? Colors.type[mainType] : colors.tint;
	const types = pokemon?.types ?? [];
	const bio = species?.flavor_text_entries
		?.find((f) => f.version.name === "firered")
		?.flavor_text.replace("\n", " ");

	return (
		<RootView style={{ backgroundColor: colorType }}>
			<View>
				<Image
					style={styles.pokeball}
					source={require("@/assets/images/pokeball-big.png")}
					height={208}
					width={208}
				/>
				<Row style={styles.header}>
					<Pressable onPress={() => router.back()}>
						<Row gap={8}>
							<Image
								source={require("@/assets/images/back.png")}
								width={32}
								height={32}
							/>
							<ThemedText
								variant="headline"
								color="grayWhite"
								style={styles.name}
							>
								{pokemon?.name}
							</ThemedText>
						</Row>
					</Pressable>
					<ThemedText variant="headline" color="grayWhite">
						&#35;{params.id.padStart(3, "0")}
					</ThemedText>
				</Row>
				<View style={styles.body}>
					<Image
						style={styles.artwork}
						source={{
							uri: getPokemonArtwork(params.id),
						}}
						width={200}
						height={200}
					/>
					<Card style={styles.card}>
						<Row gap={16}>
							{types.map((type) => (
								<PokemonType key={type.type.name} name={type.type.name} />
							))}
						</Row>

						{/* About */}
						<ThemedText variant="subtitle1" style={{ color: colorType }}>
							About
						</ThemedText>
						<Row>
							<PokemonSpec
								style={[styles.spec, { borderColor: colors.grayLight }]}
								title={formatWeight(pokemon?.weight)}
								description="Weight"
								image={require("@/assets/images/weight.png")}
							/>
							<PokemonSpec
								style={[styles.spec, { borderColor: colors.grayLight }]}
								title={formatWeight(pokemon?.height)}
								description="Height"
								image={require("@/assets/images/straighten.png")}
							/>
							<PokemonSpec
								style={{}}
								title={
									pokemon?.abilities
										.slice(0, 2)
										.map((ability) => ability.ability.name)
										.join("\n") ?? ""
								}
								description="Moves"
							/>
						</Row>
						<ThemedText>{bio}</ThemedText>

						{/* Stats */}
						<ThemedText variant="subtitle1" style={{ color: colorType }}>
							Base Stats
						</ThemedText>
						<View style={{ alignSelf: "stretch" }}>
							{pokemon?.stats.map((stat) => (
								<PokemonStat
									key={stat.stat.name}
									name={STATS[stat.stat.name as keyof typeof STATS]}
									value={stat.base_stat}
									color={colorType}
								/>
							))}
						</View>
					</Card>
				</View>
				<Text>Pokemon {params.id}</Text>
			</View>
		</RootView>
	);
}

const styles = StyleSheet.create({
	header: {
		margin: 20,
		justifyContent: "space-between",
	},
	name: {
		textTransform: "capitalize",
	},
	pokeball: {
		opacity: 0.1,
		position: "absolute",
		right: 8,
		top: 8,
	},
	artwork: {
		position: "absolute",
		top: -140,
		alignSelf: "center",
		zIndex: 2,
	},
	body: {
		marginTop: 144,
	},
	card: {
		paddingHorizontal: 20,
		paddingTop: 60,
		gap: 16,
		alignItems: "center",
	},
	spec: {
		borderStyle: "solid",
		borderRightWidth: 1,
	},
});
