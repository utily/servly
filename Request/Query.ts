export type Query =
	| QueryObject
	| QueryArray
	| string
interface QueryObject {
	[key: string]: Query
}
interface QueryArray extends Array<Query> {}

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

function reduce(previous: Query | undefined, property: string[], value: string): Query {
	const p = property.shift()
	let result: Query
	if (p == undefined)
		result = value
	else if (p == "") {
		result = Array.isArray(previous) ? [...previous] : previous ? [previous] : []
		result.push(reduce(undefined, property, value))
	} else {
		result = (typeof(previous) == "string" ? { _: previous } : previous ? { ...previous } : {}) as QueryObject
		result[p] = reduce(result[p], property, value)
	}
	return result
}
