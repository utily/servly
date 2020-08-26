import { Request as R } from "../Request"

export interface Request {
	url: string
	method?: R.Method
	header?: R.Header
	body?: any
}
export namespace Request {
	export function is(value: any | Request): value is Request {
		return (
			typeof value == "object" &&
			typeof value.url == "string" &&
			(value.method == undefined || R.Method.is(value.method)) &&
			(value.method == undefined || R.Header.is(value.header))
		)
	}
}
