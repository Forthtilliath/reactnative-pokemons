import { Card } from "@/components/Card";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import {
	formatHeight,
	formatWeight,
	getPokemonArtwork,
} from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Audio } from "expo-av";
import PagerView from "react-native-pager-view";
import type { DirectEventHandler } from "react-native/Libraries/Types/CodegenTypes";
import { useEffect, useRef, useState } from "react";

const STATS = {
	hp: "hp",
	attack: "atk",
	defense: "def",
	"special-attack": "satk",
	"special-defense": "sdef",
	speed: "spd",
};

type PagerViewHandler<T> = DirectEventHandler<Readonly<T>>;

export default function Pokemon() {
	const params = useLocalSearchParams<{ id: string }>();
	const [id, setId] = useState(Number.parseInt(params.id, 10));
	const offset = useRef(1);
	const pager = useRef<PagerView>(null);

	const onPageSelected: PagerViewHandler<{ position: number }> = (e) => {
		offset.current = e.nativeEvent.position - 1;
	};

	const onPageScrollStateChanged: PagerViewHandler<{
		pageScrollState: "idle" | "dragging" | "settling";
	}> = (e) => {
		if (e.nativeEvent.pageScrollState !== "idle") return;
		if (offset.current === 0) return;
		if (offset.current === -1 && id === 2) return;
		if (offset.current === 1 && id === 1024) return;

		setId(id + offset.current);
		offset.current = 0;
	};

	const onPrevious = () => pager.current?.setPage(0);
	const onNext = () => pager.current?.setPage(2);

	return (
		<PagerView
			ref={pager}
			initialPage={1}
			style={{ flex: 1 }}
			onPageSelected={onPageSelected}
			onPageScrollStateChanged={onPageScrollStateChanged}
		>
			<PokemonView
				onNext={onNext}
				onPrevious={onPrevious}
				key={id - 1}
				id={id - 1}
			/>
			<PokemonView onNext={onNext} onPrevious={onPrevious} key={id} id={id} />
			<PokemonView
				onNext={onNext}
				onPrevious={onPrevious}
				key={id + 1}
				id={id + 1}
			/>
		</PagerView>
	);
}

type Props = {
	id: number;
	onPrevious: () => void;
	onNext: () => void;
};
function PokemonView({ id, onPrevious, onNext }: Props) {
	const colors = useThemeColors();
	const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id });
	const { data: species } = useFetchQuery("/pokemon-species/[id]", { id });
	const mainType = pokemon?.types?.[0].type.name;
	const colorType = mainType ? Colors.type[mainType] : colors.tint;
	const types = pokemon?.types ?? [];
	const bio = species?.flavor_text_entries
		?.find((f) => f.version.name === "firered")
		?.flavor_text.replace("\n", " ");
	const stats =
		pokemon?.stats ??
		Object.keys(STATS).map((s) => ({ base_stat: 0, stat: { name: s } }));

	const onImagePress = async () => {
		const cry = pokemon?.cries?.latest;
		if (!cry) return;

		const { sound } = await Audio.Sound.createAsync(
			{ uri: cry },
			{ shouldPlay: true },
		);
		sound.playAsync();
	};

	return (
		<RootView backgroundColor={colorType}>
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
						&#35;{id.toString().padStart(3, "0")}
					</ThemedText>
				</Row>
				<Card style={styles.card}>
					<Row style={styles.imageRow}>
						{id > 1 ? (
							<Pressable onPress={onPrevious}>
								<Image
									source={require("@/assets/images/chevron-left.png")}
									width={24}
									height={24}
								/>
							</Pressable>
						) : (
							<View style={{ width: 24, height: 24 }} />
						)}
						<Pressable onPress={onImagePress}>
							<Image
								style={styles.artwork}
								source={{
									uri: getPokemonArtwork(id),
								}}
								width={200}
								height={200}
							/>
						</Pressable>
						<Pressable onPress={onNext}>
							<Image
								source={require("@/assets/images/chevron-right.png")}
								width={24}
								height={24}
							/>
						</Pressable>
					</Row>
					<Row gap={16} style={{ height: 20 }}>
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
							title={formatHeight(pokemon?.height)}
							description="Height"
							image={require("@/assets/images/straighten.png")}
						/>
						<PokemonSpec
							capitalizeTitle
							title={
								pokemon?.abilities
									?.slice(0, 2)
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
						{stats.map((stat) => (
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
	imageRow: {
		position: "absolute",
		top: -140,
		zIndex: 2,
		justifyContent: "space-between",
		left: 0,
		right: 0,
		paddingHorizontal: 20,
	},
	artwork: {},
	card: {
		marginTop: 144,
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 20,
		gap: 16,
		alignItems: "center",
		overflow: "visible",
	},
	spec: {
		borderStyle: "solid",
		borderRightWidth: 1,
	},
});
