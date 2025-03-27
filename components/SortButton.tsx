import {
	Dimensions,
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRef, useState } from "react";
import { ThemedText } from "./ThemedText";
import { Card } from "./Card";
import { Row } from "./Row";
import { Radio } from "./Radio";
import { Shadows } from "@/constants/Shadows";

type Props = {
	value: "id" | "name";
	onChange: (v: "id" | "name") => void;
};

const options = [
	{ label: "Number", value: "id" },
	{ label: "Name", value: "name" },
] as const;

export function SortButton({ value, onChange }: Props) {
	const colors = useThemeColors();
	const [isModalVisible, setModalVisibility] = useState(false);
	const buttonRef = useRef<View>(null);
	const [position, setPosition] = useState<null | {
		top: number;
		right: number;
	}>(null);

	const onButtonPress = () => {
		buttonRef.current?.measureInWindow((x, y, width, height) => {
			setPosition({
				top: y + height,
				right: Dimensions.get("window").width - x - width,
			});
			setModalVisibility(true);
		});
	};
	const onClose = () => setModalVisibility(false);

	return (
		<>
			<Pressable onPress={onButtonPress}>
				<View
					style={[styles.button, { backgroundColor: colors.grayWhite }]}
					ref={buttonRef}
				>
					<Image
						source={
							value === "id"
								? require("@/assets/images/sort-id.png")
								: require("@/assets/images/sort-name.png")
						}
						width={16}
						height={16}
					/>
				</View>
			</Pressable>
			<Modal
				transparent
				visible={isModalVisible}
				onRequestClose={onClose}
				animationType="fade"
			>
				<Pressable onPress={onClose} style={styles.backdrop} />
				<View
					style={[styles.popup, { backgroundColor: colors.tint, ...position }]}
				>
					<ThemedText
						style={styles.title}
						variant="subtitle2"
						color="grayWhite"
					>
						Sort by:
					</ThemedText>
					<Card style={styles.card}>
						{options.map((option) => (
							<Pressable
								key={option.value}
								onPress={() => onChange(option.value)}
							>
								<Row gap={8}>
									<Radio checked={option.value === value} />
									<ThemedText>{option.label}</ThemedText>
								</Row>
							</Pressable>
						))}
					</Card>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 32,
		height: 32,
		borderRadius: "100%",
		flex: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.3)",
	},
	popup: {
		padding: 4,
		paddingTop: 16,
		gap: 16,
		borderRadius: 12,
		position: "absolute",
		width: 113,
		...Shadows.dp2,
	},
	title: {
		paddingLeft: 20,
	},
	card: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		gap: 16,
	},
});
