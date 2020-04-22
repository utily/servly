import * as servly from "./index"

describe("servly.Content", () => {
	it("is null", () => expect(servly.Content.is({ property: null })).toEqual(true))
})
