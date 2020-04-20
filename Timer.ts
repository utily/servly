import { Context } from "./Context"
import { finish } from "./schedule"

export type Timer = (context?: Partial<Context>) => Promise<void>

export namespace Timer {
	export function create(handler: (context?: Context) => Promise<void>): Timer {
		return async (context?: Partial<Context>) => {
			try {
				await handler(Context.create(context))
			} catch (error) {
				console.log("servly timer catch", context, error)
			}
			await finish()
		}
	}
}
