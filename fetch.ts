import { default as f, Response as FetchResponse } from "node-fetch"
import { Request } from "./Request"
import { Response } from "./Response"

export async function fetch(request: Omit<Request, "body" | "log" | "raw"> & { body: any }): Promise<Response> {
	const result: FetchResponse = await f(request.url, { method: request.method, headers: Request.Header.to(request.header), body: request.body })
	const header = Response.Header.from(result.headers.raw())
	let body = result.body
	if (typeof header.contentType == "string") {
		const encoding = header.contentType.split("charset=", 2)
		if (encoding.length == 2)
			body = body.setEncoding(encoding[1])
	}
	return { status: result.status, header, body: body.read() }
}
