import * as servly from "../index"

describe("servly.Response.Header", () => {
	it("from", async () => expect(servly.Response.Header.from({ "Content-Type": "application/json; charset=utf-8", allow: ["GET", "PUT"] })).toEqual({
		contentType: "application/json; charset=utf-8",
		allow: ["GET", "PUT"],
	}))
})
