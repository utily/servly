import { Endpoint } from "./Endpoint"
import { Timer } from "./Timer"
import { Queue } from "./Queue"

export type Function = Endpoint | Timer | Queue<any, any>

export namespace Function {
	// tslint:disable-next-line: ban-types
	export type Ejector<T> = (handler: Function) => T
}
