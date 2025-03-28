import { StyleSheet, View, type ViewProps } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = ViewProps & {
	name: string;
	value: number;
	color: string;
};

export function PokemonStat({ style, name, value, color, ...rest }: Props) {
	const colors = useThemeColors();

	return (
		<Row style={[style, styles.root]} {...rest} gap={8}>
			<View style={[styles.name, { borderColor: colors.grayLight }]}>
				<ThemedText
					variant="subtitle3"
					style={[styles.nameText, { color }]}
				>
					{name}
				</ThemedText>
			</View>
			<View style={styles.value}>
				<ThemedText>{value.toString().padStart(3, "0")}</ThemedText>
			</View>
			<Row style={styles.bar}>
				<View
					style={[styles.barInner, { flex: value, backgroundColor: color }]}
				/>
				<View
					style={[
						styles.barBackground,
						{ flex: 255 - value, backgroundColor: color },
					]}
				/>
			</Row>
		</Row>
	);
}

const styles = StyleSheet.create({
	root: {},
	name: {
		width: 40,
		paddingRight: 12,
		borderRightWidth: 1,
		borderStyle: "solid",
	},
	nameText: {
		textTransform: "uppercase",
		alignSelf: "flex-end"
	},
	value: {
		width: 23,
	},
	bar: {
		flex: 1,
		borderRadius: 20,
		height: 4,
		overflow: "hidden",
	},
	barInner: {
		height: 4,
	},
	barBackground: {
		height: 4,
		opacity: 0.24,
	},
});
