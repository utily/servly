import { create as createResponse } from "./create"
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
	export const create = createResponse
	export type Header = ResponseHeader
	export namespace Header {
		export const fields = ResponseHeader.fields
		export const to = ResponseHeader.to
		export const from = ResponseHeader.from
	}
}
