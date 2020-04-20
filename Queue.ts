import { Context } from "./Context"
import { Response } from "./Response"
import { Request } from "./Request"
import { fetch } from "./fetch"
import { finish } from "./schedule"

export type Queue<T, S> = (item: T, context: Partial<Context>) => Promise<S | S[]>

export namespace Queue {
	export function create<T, S>(handler: (item: T, context: Context) => Promise<S | S[]>): Queue<T, S> {
		return async (item, context) => {
			let result: Response | any
			try {
				result = await handler(item, Context.create(context))
			} catch (error) {
				console.log("servly catch", item, context, error)
			}
			await finish()
			return result
		}
	}
	export function callback() {
		return create(async (request: Request, context: Context) => {
			let response: Response | undefined
			try {
				response = await fetch(request)
			} catch (errror) {
			} finally {
				context.log(request, response)
			}
		})
	}
}
