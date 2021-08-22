import * as gracely from "gracely"
import { Context } from "./Context"
import { Endpoint } from "./Endpoint"
import { Request } from "./Request"
import { Response } from "./Response"
import { Route } from "./Route"

export class Router {
	private readonly routes: [Route, Endpoint][] = []
	origin: string[] = ["*"]
	constructor() {}
	add(method: Request.Method | Request.Method[], pattern: string, endpoint: Endpoint) {
		this.routes.push([Route.create(method, pattern), endpoint])
	}
	async handle(context: Context, request: Request): Promise<Response> {
		let result: Response | undefined
		let allowedMethods: Request.Method[] = []
		for (const route of this.routes) {
			const r = route[0].match(request)
			if (r)
				if (route[0].methods.some(m => m == request.method)) {
					result = await route[1](context, r)
					break
				} else
					allowedMethods = allowedMethods.concat(...route[0].methods)
		}
		return (
			result ??
			(allowedMethods.length == 0
				? gracely.client.notFound()
				: request.method == "OPTIONS"
				? {
						...gracely.success.noContent(),
						header: {
							accessControlAllowOrigin: this.origin,
							accessControlAllowMethods: allowedMethods,
							accessControlAllowHeaders: "Content-Type",
						},
				  }
				: gracely.client.methodNotAllowed(...allowedMethods))
		)
	}
}
