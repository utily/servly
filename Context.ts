import { Log } from "./Log"
import { Request } from "./Request"

export interface Context {
	id: string
	function: {
		name: string
		path: string
	}
	log: (step: string, level: Log.Level, content: Log.Content) => void
	callback: (request: Request) => void
}
export namespace Context {
	export function create(context?: Partial<Context>): Context {
		return {
			id: "",
			function: {
				name: "",
				path: "",
			},
			log: (step: string, level: Log.Level, content: Log.Content): void => {},
			callback: _ => {},
			...context,
		}
	}
}
