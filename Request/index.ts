import { getBaseUrl } from "./getBaseUrl"
import { Header as RequestHeader } from "./Header"
import { Method as RequestMethod } from "./Method"
import { parse as parseBody } from "./parse"

export interface Request {
	readonly method?: RequestMethod
	readonly url: string
	readonly baseUrl: string
	readonly query: Record<string, string | undefined>
	readonly parameter: Record<string, string | undefined>
	readonly remote?: string
	readonly header: RequestHeader
	readonly body?: Promise<any>
	readonly raw?: Promise<any>
}

export namespace Request {
	// eslint-disable-next-line @typescript-eslint/ban-types
	export function create(request: Omit<Partial<Request>, "body"> & { body?: Promise<any> | object | any }): Request {
		let result: Request = {
			url: "",
			baseUrl: getBaseUrl(request.url) || "",
			query: {},
			parameter: {},
			header: {},
			...request,
			remote: request.remote,
		}
		if (result.raw) {
			if (!result.body)
				result = { ...result, body: result.raw.then(data => parse(result.header, data)) }
		} else if (result.body && !result.body.then)
			result = { ...result, body: Promise.resolve(result.body) }
		return result
	}
	export type Header = RequestHeader
	export namespace Header {
		export const is = RequestMethod.is
		export const from = RequestHeader.from
		export const to = RequestHeader.to
	}
	export type Method = RequestMethod
	export namespace Method {
		export const is = RequestMethod.is
	}
	export const parse = parseBody
}
