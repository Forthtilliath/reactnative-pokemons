import { Image, StyleSheet, TextInput, View } from "react-native";
import { Row } from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
	value: "id" | "name";
	onChange: (v: "id" | "name") => void;
};

export function SortButton({ value, onChange }: Props) {
	const colors = useThemeColors();

	return <View />;
}

const styles = StyleSheet.create({});
