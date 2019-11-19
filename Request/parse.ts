import { Header } from "./Header"
import { Query } from "./Query"

export function parse(headers: Header, body: any): string | object | undefined {
	let result: string | object | undefined
	const contentType = headers.contentType && headers.contentType.split(";")
	switch (contentType && contentType[0]) {
		case "application/json": result = JSON.parse(body); break
		case "application/x-www-form-urlencoded": result = Query.parse(body); break
		default: result = body; break
	}
	return result
}
