import { Request } from "./Request"
import { Response } from "./Response"

export interface Context {
	readonly request: Request
	response?: Response
}8
