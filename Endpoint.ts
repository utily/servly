import { Response } from "./Response"
import { Request } from "./Request"

export type Endpoint = (request: Omit<Partial<Request>, "body"> & { body?: Promise<any> | object | any }) => Promise<Required<Response>>

export namespace Endpoint {
	export function create(endpoint: (request: Request) => Promise<Response | any>): Endpoint {
		return async request => Response.create(await endpoint(Request.create(request)))
	}
	export type Ejector<T> = (endpoint: Endpoint) => T
}
