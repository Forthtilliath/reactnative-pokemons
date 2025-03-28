export function getPokemonId(url: string): number {
	const regex = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\//;
	const match = url.match(regex);
	if (!match) throw new Error(`Invalid URL: ${url}`);
	return Number.parseInt(match[1], 10);
}

export function getPokemonArtwork(id: number | string): string {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function formatWeight(weight?: number) {
	if (!weight) return "--";
	return `${weight / 10} kg`.replace(".", ",");
}

export function formatHeight(height?: number) {
	if (!height) return "--";
	return `${height / 10} m`.replace(".", ",");
}
