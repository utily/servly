import { Endpoint } from "./Endpoint"
import { Request } from "./Request"
import { Response } from "./Response"
import { create } from "./Response/create"

let tasks: Promise<void>[] = []
async function finish(): Promise<void> {
	const t = tasks
	tasks = []
	await Promise.all(t)
}
function schedule(task: Promise<void>): void {
	tasks.push(task)
}

export {
	Endpoint,
	Request,
	Response,
	create,
	finish,
	schedule,
}
