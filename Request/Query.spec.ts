import { Query } from "./Query"

describe("Request.Query", () => {
	it("number", () => expect(Query.parse(42)).toBeUndefined())
	it("undefined", () => expect(Query.parse(undefined)).toBeUndefined())
	it("empty string", () => expect(Query.parse("")).toEqual({}))
	it("empty property", () => expect(Query.parse("empty=&next=2")).toEqual({ empty: "", next: "2" }))
	it("correct string", () => expect(Query.parse("alpha=0&beta=1&cesar=2")).toEqual({
		alpha: "0",
		beta: "1",
		cesar: "2",
	}))
	it("escaped characters", () => expect(Query.parse("alpha%26beta=alpha%20and%20beta&cesar=2")).toEqual({
		"alpha&beta": "alpha and beta",
		cesar: "2",
	}))
	it("space +", () => expect(Query.parse("alpha%26beta=alpha+and+beta&cesar=2")).toEqual({
		"alpha&beta": "alpha and beta",
		cesar: "2",
	}))
	it("no value", () => expect(Query.parse("alpha=&cesar=2")).toEqual({
		alpha: "",
		cesar: "2",
	}))
	it("no equal", () => expect(Query.parse("alpha&cesar=2")).toEqual({
		alpha: "",
		cesar: "2",
	}))
	it("nested", () => expect(Query.parse("alpha=0&beta[gamma]=1&beta[cesar]=2")).toEqual({
		alpha: "0",
		beta: {
			gamma: "1",
			cesar: "2",
		},
	}))
	it("array", () => expect(Query.parse("alpha=0&beta[]=1&beta[]=2")).toEqual({
		alpha: "0",
		beta: [
			"1",
			"2",
		],
	}))
	it("unescape", () => expect(Query.parse("alpha=%20%F5a")).toEqual({ alpha: " õa" }))
})
