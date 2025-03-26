import { useThemeColors } from "@/hooks/useThemeColors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
	const colors = useThemeColors();
	return (
		<QueryClientProvider client={queryClient}>
			<Stack
				screenOptions={{
					headerShown: false,
					statusBarBackgroundColor: colors.tint,
				}}
			/>
		</QueryClientProvider>
	);
}
