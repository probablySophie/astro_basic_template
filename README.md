
### Using this template set

Add this to your `tsconfig.json`
```json
{
	"include": [ "path/to/this/folder/types.d.ts" ],
	"compilerOptions": {
		"paths": {
			"@template/*": ["path/to/this/folder/*"]
		},
		// Or this maybe??
		"files": ["path/to/this/folder/types.d.ts"]
	}
}
```

### Useful Documentation

* [Content Collections](https://docs.astro.build/en/guides/content-collections/)  
* [Astro Components](https://docs.astro.build/en/basics/astro-components/)  

### Using the Base Layout

```astro
---
import Layout from "path/to/astro_template/layouts/Base.astro"
---

<Layout frontmatter={your_frontmatter}>
	<Fragment slot="header">
		<!-- Whatever -->
	</Fragment>

	<!-- Your main body contents -->

	<Fragment slot="footer">
		<!-- Whatever -->
	</Fragment>
</Layout>
```

### Useful Friends

* [PicoCSS](https://picocss.com/)  
