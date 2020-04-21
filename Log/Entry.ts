
import * as isoly from "isoly"
import { Content } from "../Content"
import { Level } from "./Level"

export interface Entry {
	created: isoly.DateTime
	step: string
	level: Level
	content: Content
}
export namespace Entry {
	export function is(value: any | Entry): value is Entry {
		return typeof value == "object" &&
			typeof value.invocation == "string" &&
			typeof value.point == "string" &&
			typeof value.step == "string" &&
			Level.is(value.level) &&
			Content.is(value.content)
	}
}
