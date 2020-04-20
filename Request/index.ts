import { Header as RequestHeader } from "./Header"
import { Method as RequestMethod } from "./Method"
import { parse as parseBody } from "./parse"
import { getBaseUrl } from "./getBaseUrl"

export interface Request {
	readonly method?: RequestMethod
	readonly url: string
	readonly baseUrl: string
	readonly query: { [key: string]: string }
	readonly parameter: { [key: string]: string }
	readonly remote?: string
	readonly header: RequestHeader
	readonly body?: Promise<any>
	readonly raw?: Promise<any>
	log(message?: any, ...parameters: any[]): void
}

export namespace Request {
	export function create(request: Omit<Partial<Request>, "body"> & { body?: Promise<any> | object | any }): Request {
		let result: Request = { log: console.log, url: "", baseUrl: getBaseUrl(request.url) || "", query: {}, parameter: {}, header: {}, ...request, remote: request.remote }
		if (result.raw) {
			if (!result.body)
				result = { ...result, body: result.raw.then(data => parse(result.header, data)) }
		} else if (result.body && !result.body.then)
			result = { ...result, body: Promise.resolve(result.body) }
		return result
	}
	export type Header = RequestHeader
	export namespace Header {
		export const from = RequestHeader.from
		export const to = RequestHeader.to
	}
	export type Method = RequestMethod
	export const parse = parseBody
}
