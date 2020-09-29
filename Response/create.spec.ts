import * as servly from "../index"

describe("servly.Response.create", () => {
	it("array", async () => expect(servly.Response.create([]).header.contentType).toEqual("application/json; charset=utf-8"))
	it("array return", async () => expect(servly.Response.create([])).toEqual({"body": [], "header": {"contentType": "application/json; charset=utf-8"}, "status": 200}))
})
