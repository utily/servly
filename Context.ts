import { Request } from "./Request"

export interface Context {
	id: string
	function: {
		name: string
		path: string
	}
	log: (...argument: any[]) => void
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
			log: (...argument: any[]): void => {},
			callback: _ => {},
			...context,
		}
	}
}
