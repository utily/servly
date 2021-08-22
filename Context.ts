/* eslint-disable @typescript-eslint/no-empty-function */
import { fetch } from "./fetch"
import { Log } from "./Log"
import { Meta } from "./Meta"

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
		return Object.assign(context, {
			id: "",
			function: {
				name: "",
				path: "",
			},
			meta: {},
			log: (step: string, level: Log.Level, content: any): void => {},
			callback: (_: fetch.Request) => {},
			...context,
		})
	}
}
