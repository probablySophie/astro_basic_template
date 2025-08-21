
export declare type Frontmatter = {
	title?: string,
	date?: string,
	author?: string,
	summary?: string
	contentType?: "article" | "website" | "book" | "profile"
	permenant_url?: string
}

export declare type Config = {
	favicon?: string
	baseSiteName?: string
	webManifest?: string
}
