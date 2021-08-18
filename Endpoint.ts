import * as gracely from "gracely"
import { Context } from "./Context"
import { Converter } from "./Converter"
import { Request } from "./Request"
import { Response } from "./Response"
import { finish } from "./schedule"

export type Endpoint = (
	context: Partial<Context>,
	request: Omit<Partial<Request>, "body"> & { body?: Promise<any> | Record<string, unknown> | any }
) => Promise<Required<Response>>

export namespace Endpoint {
	export function create(
		endpoint: (context: Context, request: Request) => Promise<Response | any>,
		converter?: Converter
	): Endpoint {
		return async (context, request) => {
			const c = Context.create(context)
			const input = Request.create(request, converter?.request.body)
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
	export function customizeCreate(
		converter: Converter
	): (endpoint: (context: Context, request: Request) => Promise<Response | any>) => Endpoint {
		return (endpoint: (context: Context, request: Request) => Promise<Response | any>) =>
			Endpoint.create(endpoint, converter)
	}
}
