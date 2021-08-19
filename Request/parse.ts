import { Header } from "./Header"
import { Query } from "./Query"

// eslint-disable-next-line @typescript-eslint/ban-types
export function parse(headers: Header, body: any): string | Record<string, unknown> | Array<unknown> | undefined {
	// eslint-disable-next-line @typescript-eslint/ban-types
	let result: string | Record<string, unknown> | Array<unknown> | undefined
	const contentType = headers.contentType && headers.contentType.split(";")
	switch (contentType && contentType[0]) {
		case "application/json":
			result = JSON.parse(body)
			break
		case "application/x-www-form-urlencoded":
			result = Query.parse(body)
			break
		default:
			result = body
			break
	}
	return result
}
