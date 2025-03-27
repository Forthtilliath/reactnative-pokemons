import {
	Image,
	Pressable,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import { Card } from "../Card";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { getPokemonArtwork } from "@/functions/pokemon";

type Props = {
	style?: ViewStyle;
	id: number;
	name: string;
};

export function PokemonCard({ style, id, name }: Props) {
	const colors = useThemeColors();

	return (
		<Link href={{ pathname: "/pokemon/[id]", params: { id } }} asChild>
			<Pressable
				android_ripple={{ color: colors.tint, foreground: true, radius: 80 }}
				style={style}
			>
				<Card style={[styles.card]}>
					<View
						style={[styles.shadow, { backgroundColor: colors.grayBackground }]}
					/>
					<ThemedText variant="caption" color="grayMedium" style={styles.id}>
						#{id.toString().padStart(3, "0")}
					</ThemedText>
					<Image
						source={{
							uri: getPokemonArtwork(id),
						}}
						width={72}
						height={72}
					/>
					<ThemedText style={styles.name}>{name}</ThemedText>
				</Card>
			</Pressable>
		</Link>
	);
}

const styles = StyleSheet.create({
	card: {
		alignItems: "center",
		padding: 4,
		position: "relative",
	},
	id: {
		alignSelf: "flex-end",
	},
	name: {
		textTransform: "capitalize",
	},
	shadow: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 44,
		borderRadius: 7,
	},
});
