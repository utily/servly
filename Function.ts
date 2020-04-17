import { Endpoint } from "./Endpoint"
import { Timer } from "./Timer"

export type Function = Endpoint | Timer

export namespace Function {
	// tslint:disable-next-line: ban-types
	export type Ejector<T> = (handler: Function) => T
}