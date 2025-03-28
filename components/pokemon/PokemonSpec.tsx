import { Colors } from "@/constants/Colors";
import {
	Image,
	type ImageSourcePropType,
	StyleSheet,
	View,
	type ViewProps,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { Row } from "../Row";

type Props = ViewProps & {
	title: string;
	description: string;
	image?: ImageSourcePropType;
	capitalizeTitle?: boolean;
};

export function PokemonSpec({
	style,
	title,
	description,
	image,
	capitalizeTitle,
	...rest
}: Props) {
	return (
		<View style={[style, styles.root]} {...rest}>
			<Row style={styles.row}>
				{image && <Image source={image} width={16} height={16} />}
				<ThemedText style={[capitalizeTitle && styles.capitalize]}>
					{title}
				</ThemedText>
			</Row>
			<ThemedText variant="caption" color="grayMedium">
				{description}
			</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		gap: 4,
		alignItems: "center",
	},
	row: {
		height: 32,
		alignItems: "center",
	},
	capitalize: {
		textTransform: "capitalize",
	},
});
