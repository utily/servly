import * as model from "../index"

describe("Log", () => {
	const log = {
		id: '7d53N4AvpsnqRdPa',
		system: 'payfunc/backend',
		invocation: '3cc5b64e-4b73-45de-b824-4e3b669e5de4',
		point: 'version',
		entries: [
			{
				created: '2020-04-21T21:48:50.901Z',
				step: 'initialized',
				level: 'trace',
				content: {
					url: 'http://localhost:7071/version',
					baseUrl: 'http://localhost:7071',
					query: {},
					parameter: {},
					header: {
						accept: '*/*',
						host: 'localhost:7071',
						'user-agent': 'insomnia/7.1.1'
					},
					backend: {
						method: 'GET',
						url: 'http://localhost:7071/version',
						originalUrl: 'http://localhost:7071/version',
						headers: {
							accept: '*/*',
							host: 'localhost:7071',
							'user-agent': 'insomnia/7.1.1'
						},
						query: {},
						params: {}
					},
					method: 'GET',
					raw: {},
					body: {}
				}
			}
		]
	}
	it("is", () => expect(model.Log.is(log)).toEqual(true))
	it("is parts", () => {
		expect((log.invocation == undefined || typeof log.invocation == "string")).toEqual(true)
		expect(typeof log.point == "string").toEqual(true)
		expect(Array.isArray(log.entries) && log.entries.every(model.Log.Entry.is)).toEqual(true)
		expect(model.Meta.is(log)).toEqual(true)
	})
})
