import { Context } from "./Context"
import { finish } from "./schedule"

export type Timer = (context?: Partial<Context>) => Promise<void>

export namespace Timer {
	export function create(handler: (context: Context) => Promise<void>): Timer {
		return async (context: Partial<Context>) => {
			const c = Context.create(context)
			try {
				await handler(c)
			} catch (error) {
				c.log("servly.catch", "error", { error })
			}
			await finish()
		}
	}
}
