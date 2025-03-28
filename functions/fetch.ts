export async function fetchJson<T>(url: string) {
	// await sleep(1000);
	return fetch(url, {
		headers: { "Content-Type": "application/json" },
	}).then((res) => res.json() as Promise<T>);
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
