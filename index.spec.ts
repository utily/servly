import * as servly from "./index"

describe("servly", () => {
	const endpoint = servly.Endpoint.create(async request => {
		let result: string | any
		if (request.url == "error")
			result = { status: 400, type: "wrong url" }
		else if (request.header.accept)
			switch (request.header.accept) {
				default:
				case "text/html; charset=utf-8":
					result = "<!DocType HTML><html></html>"
					break
				case "application/jwt; charset=utf-8":
					result = "aaaaa.bbbbb.ccccc"
					break
			}
		else
			result = { url: request.url || undefined, message: !request.header.authorization ? "Nothing to hide." : `Hiding: ${ request.header.authorization }` }
		return result
	})
	it("url", async () => expect(await endpoint({
		url: "http://example.com/"
	})).toEqual({
		status: 200,
		header: {
			contentType: "application/json; charset=utf-8",
		},
		body: {
			url: "http://example.com/",
			message: "Nothing to hide.",
		},
	}))
	it("authorization", async () => expect(await endpoint({ header: { authorization: "secret"} })).toEqual({
		status: 200,
		header: {
			contentType: "application/json; charset=utf-8",
		},
		body: {
			message: "Hiding: secret",
		},
	}))
	it("wrong url", async () => expect(await endpoint({ url: "error"})).toEqual({
		status: 400,
		header: {
			contentType: "application/json; charset=utf-8",
		},
		body: {
			status: 400,
			type: "wrong url",
		},
	}))
	it("html", async () => expect(await endpoint({ header: { accept: "text/html; charset=utf-8" } })).toEqual({
		status: 200,
		header: { contentType: "text/html; charset=utf-8" },
		body: "<!DocType HTML><html></html>",
	}))
	it("jwt", async () => expect(await endpoint({ header: { accept: "application/jwt; charset=utf-8" } })).toEqual({
		status: 200,
		header: { contentType: "application/jwt; charset=utf-8" },
		body: "aaaaa.bbbbb.ccccc",
	}))
})
