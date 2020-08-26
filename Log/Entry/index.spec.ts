import * as isoly from "isoly"
import * as model from "../../index"

describe("Log", () => {
	const entry = {
		created: "2020-04-21T21:48:50.901Z",
		step: "initialized",
		level: "trace",
		content: {
			url: "http://localhost:7071/version",
			baseUrl: "http://localhost:7071",
			query: {},
			parameter: {},
			header: {
				accept: "*/*",
				host: "localhost:7071",
				"user-agent": "insomnia/7.1.1",
			},
			backend: {
				method: "GET",
				url: "http://localhost:7071/version",
				originalUrl: "http://localhost:7071/version",
				headers: {
					accept: "*/*",
					host: "localhost:7071",
					"user-agent": "insomnia/7.1.1",
				},
				query: {},
				params: {},
			},
			method: "GET",
			raw: {},
			body: {},
		},
	}
	it("is", () => expect(model.Log.Entry.is(entry)).toEqual(true))
	it("is parts", () => {
		expect(isoly.DateTime.is(entry.created)).toEqual(true)
		expect(model.Log.Entry.Creatable.is(entry)).toEqual(true)
	})
})
