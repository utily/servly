import { Response } from "."

// tslint:disable-next-line: ban-types
export function create(response: Response | any): Required<Response> {
	if (typeof(response.status) == "number" && typeof(response.response) == "object" && response.response.status == response.status) // TODO: remove this once authly is changed to never include response property
		delete response.response
	const result: Required<Response> = Response.is(response) ?
		{ status: 200, header: {}, body: "", ...response } :
		{ status: typeof(response) == "object" && typeof(response.status) == "number" && response.status || 200, header: {}, body: response }
	if (!result.header.contentType)
		switch (typeof(result.body)) {
			default:
			case "object":
				result.header.contentType = "application/json; charset=utf-8"
				break
			case "string":
				result.header.contentType = result.body.slice(0, 9).toLowerCase() == "<!doctype" ? "text/html; charset=utf-8" :
					/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(result.body) ? "application/jwt; charset=utf-8" :
					"text/plain; charset=utf-8"
				break
		}
	return result
}
