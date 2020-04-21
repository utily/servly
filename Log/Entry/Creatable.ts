import { Content } from "../../Content"
import { Level } from "../Level"

export interface Creatable {
	step: string
	level: Level
	content: Content
}
export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			typeof value.step == "string" &&
			Level.is(value.level) &&
			Content.is(value.content)
	}
}
