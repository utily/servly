import { Request } from "./Request"
import { Response } from "./Response"

export type Converter = {
	request: {
		body?: Request.Parser
	}
	response: {
		body?: Response.Parser
	}
}
