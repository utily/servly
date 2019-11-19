export type Query = { [key: string]: Query } | string

export namespace Query {
	export function parse(data: any | string): Query | undefined {
		return typeof(data) == "string" ?
			data.split("&").filter(p => !!p)
				.map<[string] | [string, string]>(p => p.split("=") as [string] | [string, string])
				.map<[string, string]>(p => [decodeURIComponent(p[0]), p[1] ? decodeURIComponent(p[1]) : ""])
				.map<[string[], string]>(p => [p[0].split("[").map(e => e.endsWith("]") ? e.substr(0, e.length - 1) : e), p[1]])
				.reduce<Query>((r: Query, p: [string[], string]) => reduce(r, p[0], p[1]) as Query, {})
			: undefined
	}
}
function reduce(previous: Query | string | undefined, property: string[], value: string): Query | string {
	const p = property.shift()
	let result: Query | string
	if (!p)
		result = value
	else {
		result = typeof(previous) == "string" ? { _: previous } : previous ? { ...previous } : {}
		result[p] = property.length > 0 ? reduce(result[p], property, value) : value
	}
	return result
}
