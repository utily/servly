
import { Content } from "./Content"
import { Level } from "./Level"

export interface Entry {
	id: string
	point: string
	step: string
	level: Level
	content: Content
}
export namespace Entry {
	export function is(value: any | Entry): value is Entry {
		return typeof value == "object" &&
			typeof value.id == "string" &&
			typeof value.point == "string" &&
			typeof value.step == "string" &&
			Level.is(value.level) &&
			Content.is(value.content)
	}
}
