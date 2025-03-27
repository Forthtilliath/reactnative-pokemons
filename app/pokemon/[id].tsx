import { Card } from "@/components/Card";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getPokemonArtwork } from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Pokemon() {
	const colors = useThemeColors();
	const params = useLocalSearchParams<{ id: string }>();
	const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
	const mainType = pokemon?.types?.[0].type.name;
	const colorType = mainType ? Colors.type[mainType] : colors.tint;

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
					<Card>
						<Text>Pokemon {params.id}</Text>
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
		zIndex: 2
	},
	body: {
		marginTop: 144,
	},
});
