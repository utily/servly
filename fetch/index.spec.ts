import * as servly from "../index"

describe("servly.fetch", () => {
	it("ptsv2", async () =>
		expect(await servly.fetch({ url: "https://ptsv2.com/t/servly/post" })).toEqual({
			status: 200,
			header: {
				accessControlAllowOrigin: "*",
				cacheControl: "private",
				connection: "close",
				contentEncoding: "gzip",
				contentType: "text/plain; charset=utf-8",
				date: expect.stringContaining("GMT"),
				server: "Google Frontend",
				transferEncoding: "chunked",
				vary: "Accept-Encoding",
			},
			body: "Thank you for this dump. I hope you have a lovely day!",
		}))
})
