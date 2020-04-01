let tasks: Promise<void>[] = []
export async function finish(): Promise<void> {
	const t = tasks
	tasks = []
	await Promise.all(t)
}
export function schedule(task: Promise<void>): void {
	tasks.push(task)
}
