import { Request as R } from "../Request"

export interface Request {
	url: string
	method?: R.Method
	header?: R.Header
	body: any
}
