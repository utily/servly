import { Context } from "./Context"
import { Response } from "./Response"
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
				console.log("servly.catch", item, context, error)
			}
			await finish()
			return result
		}
	}
	export function callback() {
		return create(async (request: fetch.Request, context: Context) => {
			try {
				const response = await fetch(request)
				context.log("servly.callback", "trace", { request, response })
			} catch (error) {
				context.log("servly.catch", "error", { request, error })
			}
		})
	}
}
