import { Content } from "./Content"
export type Meta = { [property: string]: Content }

export namespace Meta {
	export function is(value: Meta | any): value is Meta {
		return typeof value == "object" && Object.values(value).every(Content.is)
	}
	export function freeze(value: Meta): Meta {
		return JSON.parse(JSON.stringify(value))
	}
}
