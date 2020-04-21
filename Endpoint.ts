import * as gracely from "gracely"
import { Context } from "./Context"
import { Response } from "./Response"
import { Request } from "./Request"
import { finish } from "./schedule"

export type Endpoint = (context: Partial<Context>, request: Omit<Partial<Request>, "body"> & { body?: Promise<any> | object | any }) => Promise<Required<Response>>

export namespace Endpoint {
	export function create(endpoint: (context: Context, request: Request) => Promise<Response | any>): Endpoint {
		return async (context, request) => {
			const c = Context.create(context)
			const input = Request.create(request)
			let output: Response | any
			try {
				output = await endpoint(c, input)
			} catch (error) {
				c.log("servly.catch", "error", error)
				output = gracely.server.unknown()
			}
			const result = Response.create(output)
			await finish()
			return result
		}
	}
}
