import * as servly from "../index"

describe("servly.fetch", () => {
	it("fetch test", async () => {
		const response = await servly.fetch({ url: "http://www.example.com" })
		expect(response).toEqual({
			status: 200,
			header: expect.any(Object),
			body: expect.stringContaining("<html>"),
		})
		expect(response.header?.contentType).toEqual("text/html; charset=UTF-8")
	})
})
