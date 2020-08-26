import { default as f, Response as FetchResponse } from "node-fetch"
import { Request as FetchRequest } from "./Request"
import { Request as R } from "../Request"
import { Response } from "../Response"

export async function fetch(request: FetchRequest): Promise<Response> {
	const result: FetchResponse = await f(request.url, {
		method: request.method ?? "GET",
		headers: R.Header.to(request.header ?? {}),
		body: request.body,
	})
	const header = Response.Header.from(result.headers.raw())
	return { status: result.status, header, body: await result.text() }
}
export namespace fetch {
	export type Request = FetchRequest
}
