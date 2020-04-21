import { Content as LogContent } from "./Content"
import { Entry as LogEntry } from "./Entry"
import { Level as LogLevel } from "./Level"

export interface Log {
	invocation: string
	point: string
	entries: LogEntry[]
}

// tslint:disable: no-shadowed-variable
export namespace Log {
	export function is(value: any | Log): value is Log {
		return typeof value == "object" &&
			typeof value.invocation == "string" &&
			typeof value.point == "string" &&
			Array.isArray(value.entries) && value.entries.every(LogEntry.is)
	}
	export type Content = LogContent
	export namespace Content {
		export const is = LogContent.is
		export const freeze = LogContent.freeze
	}
	export type Entry = LogEntry
	export namespace Entry {
		export const is = LogEntry.is
	}
	export type Level = LogLevel
	export namespace Level {
		export const is = LogLevel.is
	}
}
