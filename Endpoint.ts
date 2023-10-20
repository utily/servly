import * as gracely from "gracely"
import { Context } from "./Context"
import { Converter } from "./Converter"
import { Request } from "./Request"
import { Response } from "./Response"
import { finish } from "./schedule"

export type Endpoint = (
	request: Omit<Partial<Request>, "body"> & { body?: Promise<any> | Record<string, unknown> | any },
	context: Partial<Context>
) => Promise<Required<Response>>

export namespace Endpoint {
	export function create(
		endpoint: (request: Request, context?: Context) => Promise<Response | any>,
		converter?: Converter
	): Endpoint {
		return async (request, context) => {
			const c = Context.create(context)
			const input = Request.create(request, converter?.request.body)
			let output: Response | any
			try {
				output = await endpoint(input, c)
			} catch (error) {
				c.log("servly.catch", "error", error)
				output = gracely.server.unknown()
			}
			const result = Response.create(output, input.header, converter?.response.body)
			await finish()
			return result
		}
	}
	export function customizeCreate(
		converter: Converter
	): (endpoint: (request: Request, context: Context) => Promise<Response | any>) => Endpoint {
		return (endpoint: (request: Request, context: Context) => Promise<Response | any>) =>
			Endpoint.create(endpoint, converter)
	}
}
