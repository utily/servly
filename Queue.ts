import { Context } from "./Context"
import { fetch } from "./fetch"
import { Meta } from "./Meta"
import { Response } from "./Response"
import { finish } from "./schedule"

export type Queue<T, S> = (context: Partial<Context>, item: T) => Promise<S | S[]>

export namespace Queue {
	export function create<T, S>(handler: (context: Context, item: T) => Promise<S | S[]>): Queue<T, S> {
		return async (context, item) => {
			let result: Response | any
			try {
				result = await handler(Context.create(context), item)
			} catch (error) {
				console.log("servly.catch", item, context, error?.message ?? error)
			}
			await finish()
			return result
		}
	}
	export function callback() {
		return create(async (context: Context, request: fetch.Request & { meta: Meta }) => {
			context.meta = { ...context.meta, ...request.meta }
			try {
				const response = await fetch(request)
				context.log("servly.callback", "trace", { request, response })
			} catch (error) {
				context.log("servly.catch", "error", { request, error: error?.message ?? error })
			}
		})
	}
}
