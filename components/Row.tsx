import { View, type ViewProps, type ViewStyle } from "react-native";

type Props = ViewProps & {
	gap?: number;
};

export function Row({ style, gap = 0, ...rest }: Props) {
	return <View style={[rowStyle, { gap }, style]} {...rest} />;
}

const rowStyle = {
	flex: 0,
	flexDirection: "row",
	alignItems: "center",
} satisfies ViewStyle;
