import * as servly from "../index"

describe("servly.Request.Header", () => {
	it("toJSON", async () => expect(JSON.stringify(servly.Request.Header.from({ "Content-Type": "application/json; charset=utf-8" }))).toEqual('{"Content-Type":"application/json; charset=utf-8"}'))
})
