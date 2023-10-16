import "isomorphic-fetch"
import { Request as ServlyRequest } from "../Request"
import { Response as ServlyResponse } from "../Response"
import { Request as FetchRequest } from "./Request"

export async function fetch(request: FetchRequest): Promise<ServlyResponse> {
	const result: Response = await globalThis.fetch(request.url, {
		method: request.method ?? "GET",
		headers: ServlyRequest.Header.to(request.header ?? {}),
		body: request.body,
	})
	const header = ServlyResponse.Header.from(Object.fromEntries(result.headers.entries()))
	return { status: result.status, header, body: await result.text() }
}
export namespace fetch {
	export type Request = FetchRequest
}
