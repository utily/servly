import * as servly from "./index"

describe("Router", () => {
	const router = new servly.Router()
	router.add("GET", "/folder/:name", servly.Endpoint.create(async (context, request) => `Hello, ${ request.parameter.name }!`))
	it("GET", async () => {
		const response = await router.handle(servly.Context.create({}), servly.Request.create({
			method: "GET",
			url: "http://localhost/folder/world",
		}))
		expect(response.status).toEqual(200)
		expect(response.body).toEqual("Hello, world!")
	})
	it("wrong method", async () => {
		const response = await router.handle(servly.Context.create({}), servly.Request.create({
			method: "POST",
			url: "http://localhost/folder/world",
		}))
		expect(response.status).toEqual(405)
		expect(response.header?.allow).toEqual(["GET"])
	})
	it("missing", async () => {
		const response = await router.handle(servly.Context.create({}), servly.Request.create({
			method: "GET",
			url: "http://localhost/other/world",
		}))
		expect(response).toEqual({ status: 404, type: "not found"})
	})
	it("OPTIONS", async () => {
		const response = await router.handle(servly.Context.create({}), servly.Request.create({
			method: "OPTIONS",
			url: "http://localhost/folder/world",
		}))
		expect(response.status).toEqual(204)
		expect(response.header).toEqual({
			accessControlAllowOrigin: ["*"],
			accessControlAllowMethods: ["GET"],
			accessControlAllowHeaders: "Content-Type",
		})
	})
})
