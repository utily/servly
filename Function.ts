import { Endpoint } from "./Endpoint"
import { Timer } from "./Timer"
import { Queue } from "./Queue"

export type Function = Endpoint | Timer | Queue<any, any>

export namespace Function {
	// eslint-disable-next-line @typescript-eslint/ban-types
	export type Ejector<T> = (handler: Function) => T
}
