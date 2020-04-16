import { finish } from "./schedule"
export type Timer = () => Promise<void>

export namespace Timer {
	export function create(handler: () => Promise<void>): Timer {
		return async () => {
			try {
				await handler()
			} catch (error) {
				console.log("servly timer catch", error)
			}
			await finish()
		}
	}
}
