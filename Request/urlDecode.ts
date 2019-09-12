export function urlDecode(data: any | string): { [key: string]: string } | undefined {
	return typeof(data) == "string" ? data.split("&").filter(p => !!p).map<[string] | [string, string]>(p => p.split("=") as [string] | [string, string]).map(p => [decodeURIComponent(p[0]), p[1] ? decodeURIComponent(p[1]) : ""]).reduce<{ [key: string]: string }>((r, p) => { r[p[0]] = p[1]; return r }, {}) : undefined
}
