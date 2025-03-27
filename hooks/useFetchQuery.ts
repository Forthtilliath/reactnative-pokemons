import type { Colors } from "@/constants/Colors";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2";

type API = {
	"/pokemon?limit=21": {
		count: number;
		next: string | null;
		results: {
			name: string;
			url: string;
		}[];
	};
	"/pokemon/[id]": {
		id: number;
		name: string;
		url: string;
		weight: number;
		height: number;
		types: { type: { name: keyof (typeof Colors)["type"] } }[];
		stats: { base_stat: number; stat: { name: string } }[];
		moves: { move: { name: string } }[];
		cries: { latest: string };
	};
};

export function useFetchQuery<T extends keyof API>(
	path: T,
	params?: Record<string, string | number>,
) {
	const localUrl =
		endpoint +
		Object.entries(params || {}).reduce(
			(acc, [key, value]) => acc.replaceAll(`[${key}]`, value),
			path,
			// (acc, [key, value]) => `${acc}&${key}=${value}`,
		);

	return useQuery({
		queryKey: [localUrl],
		queryFn: () =>
			fetch(localUrl, {
				headers: {
					Accept: "application/json",
				},
			}).then((res) => res.json() as Promise<API[T]>),
	});
}

export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
	return useInfiniteQuery({
		queryKey: [path],
		initialPageParam: endpoint + path,
		queryFn: ({ pageParam }) =>
			fetch(pageParam, {
				headers: {
					Accept: "application/json",
				},
			}).then((res) => res.json() as Promise<API[T]>),
		getNextPageParam: (lastPage) =>
			"next" in lastPage ? lastPage.next : undefined,
	});
}
