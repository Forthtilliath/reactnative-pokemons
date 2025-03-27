import type { ViewStyle } from "react-native";

export const Shadows = {
	dp2: {
		// shadowOpacity: 0.2,
		// shadowColor: "#000",
		// shadowOffset: { width: 0, height: 1 },
		// shadowRadius: 3,
		boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
		elevation: 2,
	},
} satisfies Record<string, ViewStyle>;
