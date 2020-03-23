import { Endpoint } from "./Endpoint"
import { Request } from "./Request"
import { Response } from "./Response"
import { create } from "./Response/create"

const tasks: Promise<void>[] = []
async function finish(): Promise<void> {
	await Promise.all(tasks)
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
