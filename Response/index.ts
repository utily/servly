import { Header as ResponseHeader } from "./Header"
export interface Response {
	status?: number
	header?: ResponseHeader
	body?: any
}

export namespace Response {
	export function is(value: any | Response): value is Response {
		return (
			typeof value == "object" &&
			Object.keys(value).every(key => key == "status" || key == "header" || key == "body") &&
			(value.status == undefined || typeof value.status == "number") &&
			(value.header == undefined || typeof value.header == "object")
		)
	}
	export function create(response: Response | any, converter?: Parser): Required<Response> {
		if (
			typeof response.status == "number" &&
			typeof response.response == "object" &&
			response.response.status == response.status
		)
			// TODO: remove this once authly is changed to never include response property
			delete response.response
		const result: Required<Response> = Array.isArray(response)
			? { status: 200, header: {}, body: response }
			: Response.is(response)
			? { status: 200, header: {}, body: "", ...response }
			: {
					status: (typeof response == "object" && typeof response.status == "number" && response.status) || 200,
					header:
						(response.status == 301 || response.status == 302) && response.location
							? { location: response.location }
							: {},
					body: response,
			  }
		if (!result.header.contentType)
			switch (typeof result.body) {
				default:
				case "object":
					result.header.contentType = "application/json; charset=utf-8"
					break
				case "string":
					result.header.contentType =
						result.body.slice(0, 9).toLowerCase() == "<!doctype"
							? "text/html; charset=utf-8"
							: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(result.body)
							? "application/jwt; charset=utf-8"
							: "text/plain; charset=utf-8"
					break
			}
		if (converter)
			result.body = converter(result.header, result.body)
		return result
	}
	export type Header = ResponseHeader
	export namespace Header {
		export const fields = ResponseHeader.fields
		export const to = ResponseHeader.to
		export const from = ResponseHeader.from
	}
	export type Parser = (headers: ResponseHeader, body: unknown) => unknown
}
