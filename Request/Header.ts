export interface Header {
	readonly aIM?: string | string[]
	readonly accept?: string | string[]
	readonly acceptCharset?: string | string[]
	readonly acceptDatetime?: string | string[]
	readonly acceptEncoding?: string | string[]
	readonly acceptLanguage?: string | string[]
	readonly accessControlRequestMethod?: string | string[]
	readonly accessControlRequestHeaders?: string | string[]
	readonly authorization?: string | string[]
	readonly cacheControl?: string | string[]
	readonly connection?: string | string[]
	readonly contentLength?: string | string[]
	readonly contentMD5?: string | string[]
	readonly contentType?: string
	readonly cookie?: string | string[]
	readonly date?: string | string[]
	readonly expect?: string | string[]
	readonly forwarded?: string | string[]
	readonly from?: string | string[]
	readonly host?: string | string[]
	readonly http2Settings?: string | string[]
	readonly ifMatch?: string | string[]
	readonly ifModifiedSince?: string | string[]
	readonly ifNoneMatch?: string | string[]
	readonly ifRange?: string | string[]
	readonly ifUnmodifiedSince?: string | string[]
	readonly maxForwards?: string | string[]
	readonly origin?: string | string[]
	readonly pragma?: string | string[]
	readonly proxyAuthorization?: string | string[]
	readonly range?: string | string[]
	readonly referer?: string | string[]
	readonly te?: string | string[]
	readonly trailer?: string | string[]
	readonly transferEncoding?: string | string[]
	readonly userAgent?: string | string[]
	readonly upgrade?: string | string[]
	readonly via?: string | string[]
	readonly warning?: string | string[]
	readonly upgradeInsecureRequests?: string | string[]
	readonly xRequestedWith?: string | string[]
	readonly dnt?: string | string[]
	readonly xForwardedFor?: string | string[]
	readonly xForwardedHost?: string | string[]
	readonly xForwardedProto?: string | string[]
	readonly frontEndHttps?: string | string[]
	readonly xHttpMethodOverride?: string | string[]
	readonly xAttDeviceId?: string | string[]
	readonly xWapProfile?: string | string[]
	readonly proxyConnection?: string | string[]
	readonly xCsrfToken?: string | string[]
	readonly xCorrelationID?: string | string[]
	readonly saveData	?: string | string[]
}
class HeaderDefault {
	get aIm(): undefined | string | string[] { return this.get("A-IM") }
	get accept(): undefined | string | string[] { return this.get("Accept") }
	get acceptCharset(): undefined | string | string[] { return this.get("Accept-Charset") }
	get acceptDatetime(): undefined | string | string[] { return this.get("Accept-Datetime") }
	get acceptEncoding(): undefined | string | string[] { return this.get("Accept-Encoding") }
	get acceptLanguage(): undefined | string | string[] { return this.get("Accept-Language") }
	get accessControlRequestMethod(): undefined | string | string[] { return this.get("Access-Control-Request-Method") }
	get accessControlRequestHeaders(): undefined | string | string[] { return this.get("Access-Control-Request-Headers") }
	get authorization(): undefined | string | string[] { return this.get("Authorization") }
	get cacheControl(): undefined | string | string[] { return this.get("Cache-Control") }
	get connection(): undefined | string | string[] { return this.get("Connection") }
	get contentLength(): undefined | string | string[] { return this.get("Content-Length") }
	get contentMd5(): undefined | string | string[] { return this.get("Content-MD5") }
	get contentType(): undefined | string { return this.get("Content-Type") as string }
	get cookie(): undefined | string | string[] { return this.get("Cookie") }
	get date(): undefined | string | string[] { return this.get("Date") }
	get expect(): undefined | string | string[] { return this.get("Expect") }
	get forwarded(): undefined | string | string[] { return this.get("Forwarded") }
	get from(): undefined | string | string[] { return this.get("From") }
	get host(): undefined | string | string[] { return this.get("Host") }
	get http2Settings(): undefined | string | string[] { return this.get("HTTP2-Settings") }
	get ifMatch(): undefined | string | string[] { return this.get("If-Match") }
	get ifModifiedSince(): undefined | string | string[] { return this.get("If-Modified-Since") }
	get ifNoneMatch(): undefined | string | string[] { return this.get("If-None-Match") }
	get ifRange(): undefined | string | string[] { return this.get("If-Range") }
	get ifUnmodifiedSince(): undefined | string | string[] { return this.get("If-Unmodified-Since") }
	get maxForwards(): undefined | string | string[] { return this.get("Max-Forwards") }
	get origin(): undefined | string | string[] { return this.get("Origin") }
	get pragma(): undefined | string | string[] { return this.get("Pragma") }
	get proxyAuthorization(): undefined | string | string[] { return this.get("Proxy-Authorization") }
	get range(): undefined | string | string[] { return this.get("Range") }
	get referer(): undefined | string | string[] { return this.get("Referer") }
	get te(): undefined | string | string[] { return this.get("TE") }
	get trailer(): undefined | string | string[] { return this.get("Trailer") }
	get transferEncoding(): undefined | string | string[] { return this.get("Transfer-Encoding") }
	get userAgent(): undefined | string | string[] { return this.get("User-Agent") }
	get upgrade(): undefined | string | string[] { return this.get("Upgrade") }
	get via(): undefined | string | string[] { return this.get("Via") }
	get warning(): undefined | string | string[] { return this.get("Warning") }
	get upgradeInsecureRequests(): undefined | string | string[] { return this.get("Upgrade-Insecure-Requests") }
	get xRequestedWith(): undefined | string | string[] { return this.get("X-Requested-With") }
	get dnt(): undefined | string | string[] { return this.get("DNT") }
	get xForwardedFor(): undefined | string | string[] { return this.get("X-Forwarded-For") }
	get xForwardedHost(): undefined | string | string[] { return this.get("X-Forwarded-Host") }
	get xForwardedProto(): undefined | string | string[] { return this.get("X-Forwarded-Proto") }
	get frontEndHttps(): undefined | string | string[] { return this.get("Front-End-Https") }
	get xHttpMethodOverride(): undefined | string | string[] { return this.get("X-Http-Method-Override") }
	get xAttDeviceId(): undefined | string | string[] { return this.get("X-ATT-DeviceId") }
	get xWapProfile(): undefined | string | string[] { return this.get("X-Wap-Profile") }
	get proxyConnection(): undefined | string | string[] { return this.get("Proxy-Connection") }
	get xCsrfToken(): undefined | string | string[] { return this.get("X-Csrf-Token") }
	get xCorrelationId(): undefined | string | string[] { return this.get("X-Correlation-ID") }
	get saveData(): undefined |  string | string[] { return this.get("Save-Data") }
	constructor(private readonly data: { [header: string]: string }) { }
	private get(field: string): undefined | string | string[] {
		return this.data[field] || this.data[field.toLowerCase()]
	}
}

export namespace Header {
	export function from(data: { [field: string]: string }): Header {
		return new HeaderDefault(data)
	}
}
