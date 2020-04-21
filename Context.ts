import { Log } from "./Log"
import { Meta } from "./Meta"
import { fetch } from "./fetch"

export interface Context {
	readonly id: string
	readonly function: {
		readonly name: string
		readonly path: string
	}
	meta: Meta
	readonly log: (step: string, level: Log.Level, content: any) => void
	readonly callback: (request: fetch.Request) => void
}
export namespace Context {
	export function create(context?: Partial<Context>): Context {
		return {
			id: "",
			function: {
				name: "",
				path: "",
			},
			meta: {},
			log: (step: string, level: Log.Level, content: any): void => {},
			callback: _ => {},
			...context,
		}
	}
}
