import { urlDecode } from "./urlDecode"

describe("Request.urlDecode", () => {
	it("number", () => expect(urlDecode(42)).toBeUndefined())
	it("undefined", () => expect(urlDecode(undefined)).toBeUndefined())
	it("empty string", () => expect(urlDecode("")).toEqual({}))
	it("correct string", () => expect(urlDecode("alpha=0&beta=1&cesar=2")).toEqual({
		alpha: "0",
		beta: "1",
		cesar: "2",
	}))
	it("escaped characters", () => expect(urlDecode("alpha%26beta=alpha%20and%20beta&cesar=2")).toEqual({
		"alpha&beta": "alpha and beta",
		cesar: "2",
	}))
	it("no value", () => expect(urlDecode("alpha=&cesar=2")).toEqual({
		alpha: "",
		cesar: "2",
	}))
	it("no equal", () => expect(urlDecode("alpha&cesar=2")).toEqual({
		alpha: "",
		cesar: "2",
	}))
})
