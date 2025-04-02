import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";

type Props = ViewProps & {
	name: string;
	value: number;
	color: string;
};

export function PokemonStat({ style, name, value, color, ...rest }: Props) {
	const colors = useThemeColors();
	const sharedValue = useSharedValue(0);
	const barInnerStyle = useAnimatedStyle(() => ({
		flex: sharedValue.value,
	}));
	const barBackgroundStyle = useAnimatedStyle(() => ({
		flex: 255 - sharedValue.value,
	}));

	// biome-ignore lint/correctness/useExhaustiveDependencies: no need to add sharedValue
	useEffect(() => {
		sharedValue.value = withSpring(value);
	}, [value]);

	return (
		<Row style={[style, styles.root]} {...rest} gap={8}>
			<View style={[styles.name, { borderColor: colors.grayLight }]}>
				<ThemedText variant="subtitle3" style={[styles.nameText, { color }]}>
					{name}
				</ThemedText>
			</View>
			<View style={styles.value}>
				<ThemedText>{value.toString().padStart(3, "0")}</ThemedText>
			</View>
			<Row style={styles.bar}>
				<Animated.View
					style={[styles.barInner, { backgroundColor: color }, barInnerStyle]}
				/>
				<Animated.View
					style={[
						styles.barBackground,
						{ backgroundColor: color },
						barBackgroundStyle,
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
		alignSelf: "flex-end",
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
