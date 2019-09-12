import { Endpoint } from "./Endpoint"

export type Processor = (next: Endpoint) => Endpoint
