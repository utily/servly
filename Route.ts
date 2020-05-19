import { Request } from "./Request"

export class Route {
	private constructor(readonly expression: RegExp, readonly methods: Request.Method[]) {
	}
	match(request: Request): Request | undefined {
		const match = request.url.substring(request.baseUrl.length).match(this.expression)
		return match && match.groups && { ...request, parameter: match.groups } || undefined
	}
	static create(method: Request.Method | Request.Method[], pattern: string): Route {
		return new Route(new RegExp(pattern.split("/").map(folder => folder.startsWith(":") ? `(?<${ folder.substr(1) }>[a-z][a-zA-Z0-9_\-]*)` : folder).join("/")), Array.isArray(method) ? method : [method])
	}
}
