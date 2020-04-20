import * as gracely from "gracely"
import { Context } from "./Context"
import { Response } from "./Response"
import { Request } from "./Request"
import { finish } from "./schedule"

export type Endpoint = (request: Omit<Partial<Request>, "body"> & { body?: Promise<any> | object | any }, context?: Partial<Context>) => Promise<Required<Response>>

export namespace Endpoint {
	export function create(endpoint: ((request: Request, context?: Context) => Promise<Response | any>)): Endpoint {
		return async (request, context) => {
			const input = Request.create(request)
			let output: Response | any
			try {
				output = await endpoint(input, Context.create(context))
			} catch (error) {
				console.log("servly catch", request, context, error)
				output = gracely.server.unknown()
			}
			const result = Response.create(output)
			await finish()
			return result
		}
	}
}
