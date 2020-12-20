import { Meta } from "../Meta"
import { Entry as LogEntry } from "./Entry"
import { Level as LogLevel } from "./Level"

export interface Log extends Meta {
	invocation?: string
	point: string
	entries: LogEntry[]
}

export namespace Log {
	export function is(value: any | Log): value is Log {
		return (
			typeof value == "object" &&
			(value.invocation == undefined || typeof value.invocation == "string") &&
			typeof value.point == "string" &&
			Array.isArray(value.entries) &&
			value.entries.every(LogEntry.is) &&
			Meta.is(value)
		)
	}
	export type Entry = LogEntry
	export namespace Entry {
		export const is = LogEntry.is
		export type Creatable = LogEntry.Creatable
		export namespace Creatable {
			export const is = LogEntry.Creatable.is
		}
	}
	export type Level = LogLevel
	export namespace Level {
		export const is = LogLevel.is
	}
}
