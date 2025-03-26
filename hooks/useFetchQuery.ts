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
};

export function useFetchQuery<T extends keyof API>(path: T) {
	return useQuery({
		queryKey: [path],
		queryFn: () =>
			fetch(endpoint + path, {
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
		getNextPageParam: (lastPage) => lastPage?.next,
	});
}
