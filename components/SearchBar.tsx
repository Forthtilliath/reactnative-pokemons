import {
	Image,
	Platform,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { Row } from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
	value: string;
	onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
	const colors = useThemeColors();

	return (
		<Row
			gap={8}
			style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}
		>
			<Image
				source={require("@/assets/images/search.png")}
				width={16}
				height={16}
			/>
			{/* <TouchableOpacity style={{ height: 40 }}> */}
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChange}
				placeholder="Search"
				placeholderTextColor={colors.grayMedium}
			/>
			{/* </TouchableOpacity> */}
		</Row>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		borderRadius: 16,
		height: 32,
		paddingHorizontal: 12,
	},
	input: {
		flex: 1,
		height: 16,
		fontSize: 10,
		lineHeight: 16,
		minHeight: 40
		// ...Platform.select({
		// 	android: {
		// 		height: 40,
		// 	},
		// }),
	},
});
