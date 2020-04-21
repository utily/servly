import * as isoly from "isoly"
import { Creatable as EntryCreatable } from "./Creatable"

export interface Entry extends EntryCreatable {
	created: isoly.DateTime
}
// tslint:disable: no-shadowed-variable
export namespace Entry {
	export function is(value: any | Entry): value is Entry {
		return typeof value == "object" &&
			isoly.DateTime.is(value.created) &&
			EntryCreatable.is(value)
	}
	export type Creatable = EntryCreatable
	export namespace Creatable {
		export const is = EntryCreatable.is
	}
}
