import * as gracely from "gracely"
import { Response } from "./Response"
import { Request } from "./Request"
import { finish } from "./schedule"

export type Endpoint = (request: Omit<Partial<Request>, "body"> & { body?: Promise<any> | object | any }) => Promise<Required<Response>>

export namespace Endpoint {
	export function create(endpoint: (request: Request) => Promise<Response | any>): Endpoint {
		return async request => {
			const input = Request.create(request)
			let output: Response | any
			try {
				output = await endpoint(input)
			} catch (error) {
				console.log("servly catch", request, error)
				output = gracely.server.unknown()
			}
			const result = Response.create(output)
			await finish()
			return result
		}
	}
}
