import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native";

type Props = {
	checked: boolean;
};

export function Radio({ checked }: Props) {
	const colors = useThemeColors();

	return (
		<View style={[styles.radio, { borderColor: colors.tint }]}>
			{checked && (
				<View style={[styles.radioInner, { backgroundColor: colors.tint }]} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	radio: {
		width: 14,
		height: 14,
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: "100%",
		flex: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	radioInner: {
		width: 6,
		height: 6,
		borderRadius: "100%",
	},
});
